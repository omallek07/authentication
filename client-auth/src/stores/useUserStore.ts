import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SetUser = {
  user: IUser;
  isAuthenticated: boolean;
  accessToken: string;
};

type UserStoreState = {
  user: IUser | null;
  isAuthenticated: boolean;
  accessToken: string;
  setUser: (data: SetUser) => void;
  resetUser: () => void;
};

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken: '',
};

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: ({ user, isAuthenticated, accessToken }: SetUser) =>
        set({ user, isAuthenticated, accessToken }),
      resetUser: () =>
        set({
          ...initialState,
        }),
    }),
    {
      name: 'user',
    },
  ),
);
