'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { dateAtom, diffDaysAtom } from "@/lib/store";
import { addMonths } from "date-fns";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const today = new Date()
  const nextMonth = addMonths(today, 1)
  const [month, setMonth] = useState<Date>(nextMonth)
  const [date, setDate] = useAtom(dateAtom);
  const [diffDays] = useAtom(diffDaysAtom);

  return (
    <main className="flex grow flex-col items-center justify-center p-24 gap-8">
      <div className="flex flex-col gap-2 items-center justify-center">
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
          <p><span className="font-bold text-sky-400">{diffDays}</span> days from {date?.from?.toLocaleDateString()} to {date?.to?.toLocaleDateString()}</p>
        )}
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        {!!date && (
          <Button variant="destructive" onClick={() => setDate(undefined)} className="text-lg">Reset</Button>
        )}
        <Button variant="secondary" onClick={() => setMonth(today)} className="text-lg">Today</Button>
        <Button variant="default" disabled={!date} className="font-semibold text-lg" asChild><Link href="/travel">Select</Link></Button>
      </div>
    </main>
  );
}
