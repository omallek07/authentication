import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStoreState = {
  user: IUser | null;
  setUser: (user: IUser) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IUser) => set({ user }),
      resetUser: () =>
        set({
          user: null,
        }),
    }),
    {
      name: 'user',
      partialize: (state) => ({
        user: state?.user || null,
      }),
    },
  ),
);
