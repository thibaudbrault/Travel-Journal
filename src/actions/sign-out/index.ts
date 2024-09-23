'use server';

import { signOut } from '@/auth';
import { ROUTES } from '@/lib/constants';

export const signOutAction = async () => {
  await signOut({ redirectTo: ROUTES.HOME });
};
