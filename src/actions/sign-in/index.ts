'use server';

import { signIn } from '@/auth';
import { Routes } from '@/lib/constants';

export const signInAction = async () => {
  await signIn('google', { redirectTo: Routes.HOME });
};
