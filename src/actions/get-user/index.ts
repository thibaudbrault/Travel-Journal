'use server';

import { cache } from 'react';

import { eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';
import { User, users } from '@/db/schema';

import type { Session } from 'next-auth';

export const getUser = cache(async (): Promise<User | null> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error('ID not found');
    }
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    if (!user) {
      return null;
    }
    return user;
  } catch {
    throw new Error('Error fetching user');
  }
});

export const getUserId = cache(
  async (session: Session): Promise<string | null> => {
    try {
      const id = session?.user?.id;
      if (!id) {
        throw new Error('ID not found');
      }
      const user = await db.query.users.findFirst({
        where: eq(users.id, id),
      });
      if (!user) {
        throw new Error('User not found');
      }
      const userId = user.id;
      return userId;
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching user');
    }
  },
);
