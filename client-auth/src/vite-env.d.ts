/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APU_URL: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
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

interface IUserSignUpPayload {
  email: string;
  password: string;
}
