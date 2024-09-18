import { Button } from '@/components/ui/button';
import { Travel } from '@/db/schema';
import { options, ROUTES } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';

type Props = {
  travels: Travel[] | null;
};

export default function Travels({ travels }: Props) {
  return travels && travels.length > 0 ? (
    <section className="flex flex-col gap-4 px-8 py-12">
      <h2 className="text-center text-4xl font-semibold capitalize">
        Your travels
      </h2>
      <ul>
        {travels.map((travel) => (
          <li key={travel.id} className="flex list-disc flex-col">
            <Link
              href={`${ROUTES.TRAVEL}?id=${travel.id}`}
              className="text-xl font-semibold transition-all duration-300 ease-in-out hover:text-sky-400"
            >
              {travel.name}
            </Link>
            <p className="text-xs text-neutral-300">
              From{' '}
              <span>
                {travel.dateFrom.toLocaleDateString(undefined, options)}
              </span>{' '}
              to{' '}
              <span>
                {travel.dateTo.toLocaleDateString(undefined, options)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <section className="flex h-full flex-col items-center justify-center gap-4">
      <p className="text-6xl font-bold">You haven't created any travel yet</p>
      <Button variant="default" className="font-semibold" asChild>
        <Link href={ROUTES.NEW}>Create a travel</Link>
      </Button>
    </section>
  );
}
