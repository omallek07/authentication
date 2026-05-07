import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStoreState = {
  user: IUser | null;
  isAuthenticated: boolean;
  accessToken: string;
};

type UserStoreActions = {
  setUser: (userState: UserStoreState) => void;
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
      setUser: (userState: UserStoreState) => set({ ...userState }),
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
