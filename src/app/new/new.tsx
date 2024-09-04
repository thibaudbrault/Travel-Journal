'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { dateAtom, diffDaysAtom } from '@/lib/store';
import { addMonths } from 'date-fns';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useState } from 'react';

type Props = {};

export default function New({}: Props) {
  const today = new Date();
  const nextMonth = addMonths(today, 1);
  const [month, setMonth] = useState<Date>(nextMonth);
  const [date, setDate] = useAtom(dateAtom);
  const [diffDays] = useAtom(diffDaysAtom);

  return (
    <main className="flex grow flex-col items-center justify-center gap-8 p-24">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-2xl font-bold">Select your dates</p>
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          month={month}
          onMonthChange={setMonth}
          ISOWeek
          className="rounded-md border border-sky-300"
        />
        {!!diffDays && (
          <p>
            <span className="font-bold text-sky-400">{diffDays}</span> days from{' '}
            {date?.from?.toLocaleDateString()} to{' '}
            {date?.to?.toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        {!!date && (
          <Button
            variant="destructive"
            onClick={() => setDate(undefined)}
            className="text-lg"
          >
            Reset
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() => setMonth(today)}
          className="text-lg"
        >
          Today
        </Button>
        <Button
          variant="default"
          disabled={!date}
          className="text-lg font-semibold"
          asChild
        >
          <Link href="/travel">Select</Link>
        </Button>
      </div>
    </main>
  );
}
