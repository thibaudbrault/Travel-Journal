import { z } from 'zod';

export const upsertDaySchema = z.object({
  date: z.date(),
  breakfast: z.string().optional(),
  morning: z.string().min(1, {
    message: 'You must add a descritption of your morning.',
  }),
  lunch: z.string().optional(),
  afternoon: z.string().min(1, {
    message: 'You must add a descritption of your afternoon.',
  }),
  diner: z.string().optional(),
  link: z.union([z.literal(''), z.literal('None'), z.string().trim().url()]),
  travelId: z.string().uuid(),
});
