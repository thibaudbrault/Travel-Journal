import { z } from 'zod';

export const createTravelSchema = z.object({
  name: z.string().min(1, { message: 'Enter a name for this travel' }),
  country: z.string().min(1, { message: 'Select a country' }),
  date: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    { message: 'Select a start and end date' },
  ),
  userId: z.string().uuid(),
});
