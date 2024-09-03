import { Plane } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="px-8 py-4">
      <h1 className="font-bold text-4xl text-sky-400">
        <Link href="/" className="flex gap-1 items-center">
          <Plane className="text-sky-400 size-8" /> Travel Journal
        </Link>
      </h1>
    </header>
  );
}
