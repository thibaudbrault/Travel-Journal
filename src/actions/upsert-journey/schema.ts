import { transportationValues } from '@/lib/constants';
import { z } from 'zod';

export const upsertJourneySchema = z.object({
  date: z.date(),
  depart: z.date(),
  arrival: z.date(),
  transportation: z.enum(transportationValues),
  travelId: z.string().uuid(),
});
