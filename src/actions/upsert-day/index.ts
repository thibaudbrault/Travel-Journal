'use server';

import { authActionClient } from '@/lib/safe-actions';

import { db } from '@/db';
import { days } from '@/db/schema';
import { upsertDaySchema } from './schema';
import { revalidatePath } from 'next/cache';
import { Routes } from '@/lib/constants';
import { sql } from 'drizzle-orm';

export const upsertDay = authActionClient
  .metadata({ actionName: 'upsertDay' })
  .schema(upsertDaySchema)
  .action(
    async ({
      parsedInput: {
        date,
        breakfast,
        morning,
        lunch,
        afternoon,
        diner,
        link,
        travelId,
      },
    }) => {
      const values = {
        date,
        breakfast,
        morning,
        lunch,
        afternoon,
        diner,
        link,
        travelId,
      };
      await db
        .insert(days)
        .values(values)
        .onConflictDoUpdate({
          target: [days.date, days.travelId],
          set: {
            breakfast: sql`excluded.breakfast`,
            morning: sql`excluded.morning`,
            lunch: sql`excluded.lunch`,
            afternoon: sql`excluded.afternoon`,
            diner: sql`excluded.diner`,
            link: sql`excluded.link`,
          },
        });
      revalidatePath(`${Routes.TRAVEL}/?id=${travelId}`);
    },
  );
