'use server';

import { signIn } from '@/auth';
import { ROUTES } from '@/lib/constants';

export const signInAction = async () => {
  await signIn('google', { redirectTo: ROUTES.HOME });
};
