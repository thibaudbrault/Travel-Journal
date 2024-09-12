import { redirect } from 'next/navigation';

import { Routes } from '@/lib/constants';

import { getTravel } from '@/actions/get-travel';
import { getUser } from '@/actions/get-user';
import Header from '@/components/modules/header';
import Nav from '@/components/modules/nav';
import Travel from './travel';

type Props = {
  searchParams: {
    id: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const { id } = searchParams;
  const user = await getUser();
  if (!user) redirect(Routes.HOME);

  const travel = await getTravel(user.id, id);

  return (
    <>
      <Header />
      <Nav user={user} />
      <Travel travel={travel} />
    </>
  );
}
