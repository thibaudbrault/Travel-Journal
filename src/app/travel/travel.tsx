'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';
import type { Travel } from '@/db/schema';
import { DAY, options } from '@/lib/constants';
import TravelForm from './TravelForm';
import { TravelWithDays } from '@/lib/types';

type Props = {
  travel: TravelWithDays;
};

export default function Travel({ travel }: Props) {
  const diffDays =
    // @ts-expect-error Operation works with dates
    Math.round(Math.abs(travel.dateFrom - travel.dateTo) / DAY) ?? 0;
  const startDate = new Date(travel.dateFrom);

  return (
    <main className="flex grow flex-col items-center justify-center gap-8 p-12">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-semibold">Select a day</h2>
        <small className="text-neutral-300">
          From{' '}
          <span className="capitalize text-sky-400">
            {travel.dateFrom?.toLocaleDateString(undefined, options)}
          </span>{' '}
          to{' '}
          <span className="capitalize text-sky-400">
            {travel.dateTo?.toLocaleDateString(undefined, options)}
          </span>
        </small>
      </div>
      {Array(diffDays + 1)
        .fill(null)
        .map((_, index) => {
          const curDate = new Date(travel.dateFrom);
          curDate.setDate(startDate.getDate() + index);
          const day = travel.days.find(
            (day) => new Date(day.date).getTime() === curDate.getTime(),
          );
          return (
            <section key={index} className="w-full space-y-4">
              <Dialog>
                <DialogTrigger className="text-xl transition-all duration-300 ease-in-out hover:text-sky-400">
                  <small className="text-xs text-neutral-300">
                    Day {index + 1}:
                  </small>{' '}
                  <span className="font-semibold capitalize">
                    {curDate.toLocaleDateString(undefined, options)}
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="capitalize">
                      {curDate.toLocaleDateString(undefined, options)}
                    </DialogTitle>
                    <DialogDescription>
                      Enter the activities for this day
                    </DialogDescription>
                  </DialogHeader>
                  <TravelForm travelId={travel.id} date={curDate} day={day} />
                </DialogContent>
              </Dialog>

              <Separator />
            </section>
          );
        })}
    </main>
  );
}
