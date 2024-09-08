import { getUserId } from '@/actions/get-user';
import New from './new';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Routes } from '@/lib/constants';

export default async function Page() {
  const session = await auth();
  if (!session) redirect(Routes.HOME);

  const userId = await getUserId(session);
  if (!userId) redirect(Routes.HOME);

  return <New userId={userId} />;
}
