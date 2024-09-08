'use server';

import { signOut } from '@/auth';
import { Routes } from '@/lib/constants';

export const signOutAction = async () => {
  await signOut({ redirectTo: Routes.HOME });
};
