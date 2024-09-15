import { cache } from 'react';

import { db } from '@/db';
import { Travel, travels } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getTravels = cache(
  async (userId: string): Promise<Travel[] | null> => {
    try {
      if (!userId) {
        throw new Error('User not found');
      }
      const travelArr = await db.query.travels.findMany({
        where: eq(travels.userId, userId),
        with: {
          days: true,
        },
      });
      return travelArr;
    } catch {
      throw new Error('Error fetching travel');
    }
  },
);
