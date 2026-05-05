import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStoreState = {
  user: IUser | null;
  isAuthenticated: boolean;
  accessToken: string;
};

type UserStoreActions = {
  setUser: (data: UserStoreState) => void;
  resetUser: () => void;
};

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken: '',
};

export const useUserStore = create<UserStoreState & UserStoreActions>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: ({ user, isAuthenticated, accessToken }: UserStoreState) =>
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
