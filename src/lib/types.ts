import { Day, Travel } from '@/db/schema';

export type TravelWithDays = Travel & {
  days: Day[];
};
