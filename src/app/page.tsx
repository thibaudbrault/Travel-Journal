'use client'

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addMonths } from "date-fns";
import { Button } from "@/components/ui/button";

export default function Home() {
  const today = new Date()
  const nextMonth = addMonths(today, 1)
  const [date, setDate] = useState<DateRange | undefined>()
  const [month, setMonth] = useState<Date>(nextMonth)

  return (
    <main className="flex grow flex-col items-center justify-center p-24 gap-8">
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        month={month}
        onMonthChange={setMonth}
        ISOWeek
        className="rounded-md border"
        classNames={{
          day_today: `bg-purple-600 text-neutral-100`,
        }}
      />
      <div className="w-full flex items-center justify-center gap-4">
        <Button variant="destructive" onClick={() => setDate(undefined)} className="text-lg">Reset</Button>
        <Button variant="secondary" onClick={() => setMonth(today)} className="text-lg">Today</Button>
        <Button variant="default" disabled={!date} className="font-semibold text-lg">Select</Button>
      </div>
    </main>
  );
}
