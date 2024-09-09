import { redirect } from 'next/navigation';

import { getUserId } from '@/actions/get-user';
import { auth } from '@/auth';
import { Routes } from '@/lib/constants';

import New from './new';

export default async function Page() {
  const session = await auth();
  if (!session) redirect(Routes.HOME);

  const userId = await getUserId(session);
  if (!userId) redirect(Routes.HOME);

  return <New userId={userId} />;
}
