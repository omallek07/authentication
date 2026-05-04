import { StateCreator } from 'zustand';

const initialState = {
  isAuthenticated: '',
  accessToken: '',
};
type AuthState = typeof initialState;

type AuthActions = {
  setAccessToken: (accessToken: string) => void;
};

export type AuthSlice = AuthState & AuthActions;

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setAccessToken: (accessToken: string) =>
    set({
      accessToken,
    }),
});
