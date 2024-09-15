import { z } from 'zod';

export const createTravelSchema = z.object({
  name: z.string().min(1, { message: 'Enter a name for this travel' }),
  country: z.string({ required_error: 'Select a country' }),
  date: z.object(
    {
      from: z.date({ message: 'Selet a start date' }),
      to: z.date({ message: 'Select an end date' }),
    },
    { message: 'Select a start and end date' },
  ),
  userId: z.string().uuid(),
});
