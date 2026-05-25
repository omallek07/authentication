/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APU_URL: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  roles: IRole[];
}
interface IUserSignInPayload {
  email: string;
  password: string;
}

interface ISignInResponse {
  data: {
    accessToken: string;
    user: IUser;
  };
}

interface IRefreshTokenResponse {
  data: {
    accessToken: string;
    user: IUser;
  };
}

interface IUserSignUpPayload {
  email: string;
  password: string;
}

interface IResetPasswordPayload {
  email: string;
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface IUpdateUserProfileResponse {
  data: Pick<IUser, 'name'>;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface IPermission {
  _id: string;
  name: string;
  description: string;
  method: Method;
  path: string;
}
interface IRole {
  _id: string;
  name: string;
  description: string;
  permissions?: IPermission[];
}
interface IUsersResponse {
  data: IUser[];
}

interface IRolesResponse {
  data: IRole[];
}

interface IRoleResponse {
  data: IRole;
}

interface IPermissionsResponse {
  data: IPermission[];
}
