import { z } from 'zod';

export const createTravelSchema = z.object({
  name: z.string().min(1, { message: 'Enter a name for this travel' }),
  location: z.string().min(1, { message: 'Enter a location for this travel' }),
  date: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    { message: 'Select a start and end date' },
  ),
  userId: z.string().uuid(),
});
