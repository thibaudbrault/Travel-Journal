'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

type Props = {
  error: Error & { digest?: string };
};

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-12">
      <h2 className="text-5xl font-bold">Something went wrong!</h2>
      <Button
        variant="destructive"
        className="text-xl font-semibold"
        onClick={redirect(ROUTES.HOME)}
      >
        Go Home
      </Button>
    </div>
  );
}
