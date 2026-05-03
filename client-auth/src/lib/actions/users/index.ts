import axios from 'axios';

import type { SignIn } from '../../types/users';

const API_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;
const baseUrl = `${API_URL}/${API_VERSION}`;

export async function signInAction({ email, password }: SignIn): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await axios.post(`${baseUrl}/auth/sign-in`, {
      email,
      password,
    });

    return {
      message: 'User signed in successfully',
      success: true,
    };
  } catch (error) {
    return {
      message: typeof error === 'string' ? error : 'Something went wrong',
      success: false,
    };
  }
}
