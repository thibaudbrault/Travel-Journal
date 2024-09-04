import { List, LogIn, LogOut, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { auth } from '@/auth';
import { signInAction } from '@/actions/sign-in';
import { signOutAction } from '@/actions/sign-out';

export default async function Nav() {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between px-8 py-2">
      <div className="flex gap-4">
        <Button variant="secondary" asChild>
          <Link href="/" className="flex gap-1 font-semibold">
            <List /> Travels
          </Link>
        </Button>
        <Button asChild>
          <Link href="/new" className="flex gap-1 font-semibold">
            <Plus /> New
          </Link>
        </Button>
      </div>
      {session?.user ? (
        <form action={signOutAction}>
          <Button variant="ghost" type="submit" asChild>
            <Link href="/" className="flex items-center gap-1 font-semibold">
              <LogOut />
              Sign Out
            </Link>
          </Button>
        </form>
      ) : (
        <form action={signInAction}>
          <Button
            variant="default"
            type="submit"
            className="flex items-center gap-1 font-semibold"
          >
            <LogIn />
            Sign In
          </Button>
        </form>
      )}
    </nav>
  );
}
