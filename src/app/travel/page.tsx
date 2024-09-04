import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Travel from './travel';

export default async function Page() {
  const session = await auth();

  if (!session?.user) redirect('/');

  return <Travel />;
}
