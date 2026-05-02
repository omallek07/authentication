import { BadRequestException } from '~/globals/cores/error.core';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { jwtProvider } from '~/globals/providers/jwt.providers';

import { SignupReq, SigninReq } from '../types';
class AuthService {
  public async signUp(requestBody: SignupReq) {
    const { name, email, password } = requestBody;

    // Check if email already exists
    const userByEmail = await UserModel.findOne({ email });
    if (userByEmail) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const jwtPayload = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email
    };

    const accessToken = await jwtProvider.generateJWT(jwtPayload);

    return {
      accessToken,
      user: jwtPayload
    };
  }

  public async signIn(requestBody: SigninReq) {
    const { email, password } = requestBody;

    const userByEmail = await UserModel.findOne({
      email
    });

    if (!userByEmail) {
      throw new BadRequestException('Email or password is incorrect');
    }

    // Check password in userByEmail.password and requested password
    const isMatchPassword = bcrypt.compare(password, userByEmail.password);

    if (!isMatchPassword) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const jwtPayload = {
      _id: userByEmail._id.toString(),
      name: userByEmail.name,
      email: userByEmail.email
    };

    const accessToken = await jwtProvider.generateJWT(jwtPayload);

    return {
      accessToken,
      user: jwtPayload
    };
  }
}

export const authService: AuthService = new AuthService();
