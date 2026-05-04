import { StateCreator } from 'zustand';

const initialState = {
  user: {
    _id: '',
    name: '',
    email: '',
  },
};

type User = {
  _id: string;
  name: string;
  email: string;
};

type UserState = typeof initialState;

type UserActions = {
  setUser: (user: User) => void;
  resetUser: () => void;
};

export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  ...initialState,
  setUser: (user: User) => set({ user }),
  resetUser: () => set(initialState),
});
