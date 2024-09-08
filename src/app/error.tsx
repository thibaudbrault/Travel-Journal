'use client';

import { Button } from '@/components/ui/button';
import { Routes } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-12">
      <h2 className="text-5xl font-bold">Something went wrong!</h2>
      <Button
        variant="destructive"
        className="font-semibold text-xl"
        onClick={redirect(Routes.HOME)}
      >
        Go Home
      </Button>
    </div>
  );
}
