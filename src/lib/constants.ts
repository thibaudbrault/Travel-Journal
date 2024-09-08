export const options: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export const DAY = 24 * 60 * 60 * 1000;

export const Routes = {
  HOME: '/',
  PROFILE: '/profile',
  TRAVEL: '/travel',
  NEW: '/new',
} as const;
