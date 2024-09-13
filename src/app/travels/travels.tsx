import { Button } from '@/components/ui/button';
import { Travel } from '@/db/schema';
import { Routes } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';

type Props = {
  travels: Travel[] | null;
};

export default function Travels({ travels }: Props) {
  return travels && travels.length > 0 ? (
    <section>
      <h2>Your travels</h2>
      <ul>
        {travels.map((travel) => (
          <li key={travel.id}>{travel.name}</li>
        ))}
      </ul>
    </section>
  ) : (
    <section className="flex h-full flex-col items-center justify-center gap-4">
      <p className="text-6xl font-bold">You haven't created any travel yet</p>
      <Button variant="default" className="font-semibold" asChild>
        <Link href={Routes.NEW}>Create a travel</Link>
      </Button>
    </section>
  );
}
