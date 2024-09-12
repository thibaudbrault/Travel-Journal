import Header from '@/components/modules/header';
import Home from './home';
import Nav from '@/components/modules/nav';
import { getUser } from '@/actions/get-user';

export default async function Page() {
  const user = await getUser();

  return (
    <>
      <Header />
      <Nav user={user} />
      <Home />
    </>
  );
}
