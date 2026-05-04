/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APU_URL: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
}
interface IAuth {
  accessToken: string;
  isAuthenticated: boolean;
}
