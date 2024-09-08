import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Travel from './travel';
import { Routes } from '@/lib/constants';

export default async function Page() {
  const session = await auth();

  if (!session?.user) redirect(Routes.HOME);

  return <Travel />;
}
