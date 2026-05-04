import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './authSlice';
import { UserSlice, createUserSlice } from './userSlice';

// Combine all slices into a single store
export const useBoundStore = create<UserSlice & AuthSlice>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createUserSlice(...args),
  })),
);
