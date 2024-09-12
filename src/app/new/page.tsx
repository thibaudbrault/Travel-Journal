import { redirect } from 'next/navigation';

import { getUser } from '@/actions/get-user';
import { Routes } from '@/lib/constants';

import Header from '@/components/modules/header';
import Nav from '@/components/modules/nav';
import New from './new';

export default async function Page() {
  const user = await getUser();
  if (!user) redirect(Routes.HOME);

  return (
    <>
      <Header />
      <Nav user={user} />
      <New userId={user.id} />
    </>
  );
}
