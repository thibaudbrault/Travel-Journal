'use server';

import { authActionClient } from '@/lib/safe-actions';

import { db } from '@/db';
import { days } from '@/db/schema';
import { upsertDaySchema } from './schema';

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
          target: days.id,
          set: { ...values },
        });
    },
  );
