import { cache } from 'react';

import { db } from '@/db';
import { Travel, travels } from '@/db/schema';
import { Routes } from '@/lib/constants';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export const getTravel = cache(
  async (userId: string, travelId: string): Promise<Travel> => {
    try {
      if (!userId) {
        throw new Error('User not found');
      }
      const travel = await db.query.travels.findFirst({
        where: and(eq(travels.id, travelId), eq(travels.userId, userId)),
      });
      if (!travel) redirect(Routes.HOME);
      return travel;
    } catch {
      throw new Error('Error fetching travel');
    }
  },
);
