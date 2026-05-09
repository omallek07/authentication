import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UpdateUserData = {
  name: string;
};

type UserStoreState = {
  user: IUser | null;
  isAuthenticated: boolean;
  accessToken: string;
};

type UserStoreActions = {
  setUserStore: (userStoreState: UserStoreState) => void;
  resetUserStore: () => void;
  updateUserData: (userData: UpdateUserData) => void;
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
      setUserStore: (userStoreState: UserStoreState) =>
        set({ ...userStoreState }),
      updateUserData: ({ name }) =>
        set((state) => ({
          user: !state.user
            ? null
            : {
                ...state.user,
                name,
              },
        })),
      resetUserStore: () =>
        set({
          ...initialState,
        }),
    }),
    {
      name: 'user',
    },
  ),
);
