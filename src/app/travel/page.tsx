import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { Routes } from '@/lib/constants';

import Travel from './travel';

export default async function Page() {
  const session = await auth();

  if (!session?.user) redirect(Routes.HOME);

  return <Travel />;
}
