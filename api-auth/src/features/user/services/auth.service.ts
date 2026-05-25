import { BadRequestException, NotFoundException } from '~/globals/cores/error.core';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { jwtProvider } from '~/globals/providers/jwt.provider';
import crypto from 'crypto';
import { IUser } from '../models/user.model';
import { SignupReq, SigninReq } from '../types';
import { mailProvider } from '~/globals/providers/mail.provider';
import { RoleModel } from '~/features/role/models/role.model';
class AuthService {
  public async signUp(requestBody: SignupReq) {
    const { name, email, password } = requestBody;

    // Check if email already exists
    const userByEmail = await UserModel.findOne({ email });
    if (userByEmail) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacherRole = await RoleModel.findOne({
      name: 'teacher'
    });

    if (!teacherRole) {
      throw new NotFoundException('Role does not exist');
    }

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      roles: [teacherRole]
    });

    const userRoles = user.roles?.map((role) => role.name) ?? [];

    await user.save();

    const jwtPayload = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      roles: userRoles
    };

    const accessToken = await jwtProvider.generateJWT(jwtPayload);
    // crypto => save RT into databse (redis) => revoke
    // IP, User Agent
    const refreshToken = await jwtProvider.generateRefreshToken(jwtPayload);

    return {
      accessToken,
      refreshToken,
      user: jwtPayload
    };
  }

  public async signIn(requestBody: SigninReq) {
    const { email, password } = requestBody;

    const userByEmail = await UserModel.findOne({
      email
    }).populate('roles');

    if (!userByEmail) {
      throw new BadRequestException('Email or password is incorrect');
    }

    // Check password in userByEmail.password and requested password
    const isMatchPassword = await bcrypt.compare(password, userByEmail.password);

    if (!isMatchPassword) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const jwtPayload = {
      _id: userByEmail._id.toString(),
      name: userByEmail.name,
      email: userByEmail.email,
      roles: userByEmail.roles?.map((role) => role.name) ?? []
    };

    const accessToken = await jwtProvider.generateJWT(jwtPayload);
    const refreshToken = await jwtProvider.generateRefreshToken(jwtPayload);

    return {
      accessToken,
      refreshToken,
      user: jwtPayload
    };
  }

  public async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('Please provide refresh token');
    }

    const userDecoded = await jwtProvider.verifyRefreshToken(refreshToken);
    console.log('userDecoded', userDecoded);

    const user = await UserModel.findById(userDecoded._id).populate('roles');

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // Generate new access token
    const jwtPayload = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      roles: user.roles?.map((role) => role.name) ?? []
    };

    const accessToken = await jwtProvider.generateJWT(jwtPayload);

    return {
      accessToken,
      user: jwtPayload
    };
  }

  public async sendForgotPasswordToEmail(requestBody: any) {
    const { email } = requestBody;
    // Make userByEmail exist
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    // Create a resetPasswordToken
    const resetPasswordToken = crypto.randomBytes(10).toString('hex');
    // Store resetPasswordExpired (10m)
    const resetPasswordExpired = Date.now() + 10 * 1000 * 60;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpired = resetPasswordExpired;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password?email=${user.email}&resetToken=${user.resetPasswordToken}`;

    const html = `
      <h1>Your Reset Password Request</h1>
      <p>Please click into this link to reset the password: <a href=${resetLink}>Click Here</a>
    `;

    // Send email
    mailProvider.sendEmail({
      to: user.email,
      subject: 'Your Reset Password Request',
      html
    });
  }

  public async resetPassword(requestBody: any) {
    const { email, resetToken, newPassword, confirmNewPassword } = requestBody;

    if (newPassword != confirmNewPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await UserModel.findOne({
      email,
      resetPasswordToken: resetToken
    });

    if (!user?.resetPasswordToken || !user?.resetPasswordToken) {
      throw new BadRequestException('Please reset password again!');
    }

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    if (Date.now() > user.resetPasswordExpired!) {
      throw new BadRequestException('Your reset password request already expired. Please try again.');
    }

    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  }
  public async updateProfile(requestBody: any, currentUser: UserPayload): Promise<IUser> {
    const { name } = requestBody;

    const user = await UserModel.findById(currentUser._id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.name = name;
    await user.save();
    return user;
  }
}

export const authService: AuthService = new AuthService();
