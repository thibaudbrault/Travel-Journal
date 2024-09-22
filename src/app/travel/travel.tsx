'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Separator } from '@/components/ui/separator';
import type { Travel } from '@/db/schema';
import { DAY, options } from '@/lib/constants';
import ActivitiesForm from './ActivtiesForm';
import { TravelWithDays } from '@/lib/types';
import Link from 'next/link';
import JourneyForm from './JourneyForm';

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
              <div>
                <small className="text-xs text-neutral-300">
                  Day {index + 1}:
                </small>{' '}
                <Dialog>
                  <DialogTrigger className="text-xl transition-all duration-300 ease-in-out hover:text-sky-400">
                    <span className="font-semibold capitalize">
                      {curDate.toLocaleDateString(undefined, options)}
                    </span>
                  </DialogTrigger>
                  <DialogContent>
                    <Tabs defaultValue="activities">
                      <DialogHeader>
                        <DialogTitle className="capitalize">
                          {curDate.toLocaleDateString(undefined, options)}
                        </DialogTitle>
                        <DialogDescription>
                          Enter the activities for this day
                        </DialogDescription>
                      </DialogHeader>
                      <TabsList className="mt-2 w-full">
                        <TabsTrigger value="activities" className="w-full">
                          Activities
                        </TabsTrigger>
                        <TabsTrigger value="travel" className="w-full">
                          Travel
                        </TabsTrigger>
                      </TabsList>
                      <Separator className="my-4" />
                      <TabsContent value="activities">
                        <ActivitiesForm
                          travelId={travel.id}
                          date={curDate}
                          day={day}
                        />
                      </TabsContent>
                      <TabsContent value="travel">
                        <JourneyForm
                          travelId={travel.id}
                          date={curDate}
                          day={day}
                        />
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
              <ul className="list-disc px-12">
                {day?.breakfast && day.breakfast !== 'None' && (
                  <li>Breakfast: {day.breakfast}</li>
                )}
                {day?.morning && <li>Morning: {day.morning}</li>}
                {day?.lunch && day.lunch !== 'None' && (
                  <li>Lunch: {day.lunch}</li>
                )}
                {day?.afternoon && <li>Afternoon: {day.afternoon}</li>}
                {day?.diner && day.diner !== 'None' && (
                  <li>Diner: {day.diner}</li>
                )}
                {day?.link && day.link !== 'None' && (
                  <li>
                    Link:{' '}
                    <Link
                      href={day.link}
                      target="_blank"
                      className="hover:underline"
                    >
                      {day.link}
                    </Link>
                  </li>
                )}
              </ul>
              <Separator />
            </section>
          );
        })}
    </main>
  );
}
