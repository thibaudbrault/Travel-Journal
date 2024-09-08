'use server';

import { redirect } from 'next/navigation';

import { authActionClient } from '@/lib/safe-actions';

import { Routes } from '@/lib/constants';
import 'server-only';
import { createTravelSchema } from './schema';
import { db } from '@/db';
import { travels } from '@/db/schema';

export const createTravel = authActionClient
  .metadata({ actionName: 'createTravel' })
  .schema(createTravelSchema)
  .action(
    async ({ parsedInput: { name, location, date }, ctx: { userId } }) => {
      await db.insert(travels).values({
        name,
        location,
        dateFrom: date.from,
        dateTo: date.to,
        userId,
      });
      redirect(Routes.TRAVEL);
    },
  );
