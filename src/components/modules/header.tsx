import { Plane } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="px-8 py-4">
      <h1 className="text-4xl font-bold text-sky-400">
        <Link href="/" className="flex items-center gap-1">
          <Plane className="size-8 text-sky-400" /> Travel Journal
        </Link>
      </h1>
    </header>
  );
}
