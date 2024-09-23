'use server';

import { cache } from 'react';

import { eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';
import { User, users } from '@/db/schema';

import type { Session } from 'next-auth';

export const getUser = cache(async (): Promise<User | null> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (!user) {
    return null;
  }
  return user;
});

export const getUserId = cache(
  async (session: Session): Promise<string | null> => {
    const id = session?.user?.id;
    if (!id) {
      return null;
    }
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) {
      return null;
    }
    const userId = user.id;
    return userId;
  },
);
