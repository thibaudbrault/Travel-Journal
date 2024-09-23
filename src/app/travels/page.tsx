import { redirect } from 'next/navigation';

import { getUser } from '@/actions/get-user';
import { ROUTES } from '@/lib/constants';

import Header from '@/components/modules/header';
import Nav from '@/components/modules/nav';
import Travels from './travels';
import { getTravels } from '@/actions/get-travels';

export default async function Page() {
  const user = await getUser();
  if (!user) redirect(ROUTES.HOME);

  const userId = user.id;
  const travels = await getTravels(userId);

  return (
    <>
      <Header />
      <Nav user={user} />
      <Travels travels={travels} />
    </>
  );
}
