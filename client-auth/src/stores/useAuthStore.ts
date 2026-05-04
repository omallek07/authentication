import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStoreState = {
  auth: IAuth | null;
  setAuth: (auth: IAuth) => void;
  resetAuth: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (auth: IAuth) => set({ auth }),
      resetAuth: () =>
        set({
          auth: null,
        }),
    }),
    {
      name: 'access',
      partialize: (state) => ({
        access: state?.auth || null,
      }),
    },
  ),
);
