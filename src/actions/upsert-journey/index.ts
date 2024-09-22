'use server';

import { authActionClient } from '@/lib/safe-actions';

import { db } from '@/db';
import { days } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { ROUTES } from '@/lib/constants';
import { sql } from 'drizzle-orm';
import { upsertJourneySchema } from './schema';

export const upsertJourney = authActionClient
  .metadata({ actionName: 'upsertDay' })
  .schema(upsertJourneySchema)
  .action(
    async ({
      parsedInput: { date, depart, arrival, transportation, travelId },
    }) => {
      const values = {
        date,
        depart,
        arrival,
        transportation,
        travelId,
      };
      await db
        .insert(days)
        .values(values)
        .onConflictDoUpdate({
          target: [days.date, days.travelId],
          set: {
            depart: sql`excluded.depart`,
            arrival: sql`excluded.arrival`,
            transportation: sql`excluded.transportation`,
          },
        });
      revalidatePath(`${ROUTES.TRAVEL}/?id=${travelId}`);
    },
  );
