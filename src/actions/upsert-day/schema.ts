import { z } from 'zod';

export const upsertDaySchema = z.object({
  breakfast: z.string().optional(),
  morning: z.string().min(2, {
    message: 'You must add a descritption of your morning.',
  }),
  lunch: z.string().optional(),
  afternoon: z.string().min(2, {
    message: 'You must add a descritption of your afternoon.',
  }),
  diner: z.string().optional(),
});
