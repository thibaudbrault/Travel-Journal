'use server';

import { authActionClient } from '@/lib/safe-actions';

import { createTravelSchema } from './schema';

import { db } from '@/db';
import { travels } from '@/db/schema';
import { redirect } from 'next/navigation';
import { Routes } from '@/lib/constants';

export const createTravel = authActionClient
  .metadata({ actionName: 'createTravel' })
  .schema(createTravelSchema)
  .action(async ({ parsedInput: { name, country, date }, ctx: { userId } }) => {
    const newTravel = await db
      .insert(travels)
      .values({
        name,
        country,
        dateFrom: date.from,
        dateTo: date.to,
        userId,
      })
      .returning({ travelId: travels.id });
    redirect(`${Routes.TRAVEL}?id=${newTravel[0].travelId}`);
  });
