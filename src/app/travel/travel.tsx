'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { upsertDaySchema } from '@/actions/upsert-day/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import type { Travel } from '@/db/schema';
import { DAY, options } from '@/lib/constants';

type Props = {
  travel: Travel;
};

type Schema = z.infer<typeof upsertDaySchema>;

export default function Travel({ travel }: Props) {
  const diffDays =
    // @ts-expect-error Operation works with dates
    Math.round(Math.abs(travel.dateFrom - travel.dateTo) / DAY) ?? 0;
  const startDate = new Date(travel.dateFrom);

  const form = useForm<Schema>({
    resolver: zodResolver(upsertDaySchema),
    defaultValues: {
      breakfast: '',
      morning: '',
      lunch: '',
      afternoon: '',
      diner: '',
    },
  });

  const onSubmit = (values: Schema) => {
    console.log(values);
  };

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
          return (
            <section key={index} className="w-full space-y-4">
              <Dialog>
                <DialogTrigger>
                  <h3 className="text-xl">
                    <small className="text-xs text-neutral-300">
                      Day {index + 1}:
                    </small>{' '}
                    <span className="font-semibold capitalize">
                      {curDate.toLocaleDateString(undefined, options)}
                    </span>
                  </h3>
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
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <fieldset className="space-y-2">
                        <FormField
                          control={form.control}
                          name="breakfast"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Breakfast</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    placeholder="Your breakfast"
                                    {...field}
                                  />
                                  <Button variant="ghost">None</Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="morning"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Morning</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Your morning activities"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lunch"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lunch</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    placeholder="Your breakfast"
                                    {...field}
                                  />
                                  <Button variant="ghost">None</Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="afternoon"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Afternoon</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Your afternoon activities"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="diner"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Diner</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input placeholder="Your diner" {...field} />
                                  <Button variant="ghost">None</Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </fieldset>
                      <Button
                        type="submit"
                        className="w-full font-semibold"
                        disabled={!form.formState.isValid}
                      >
                        Save
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <Separator />
            </section>
          );
        })}
    </main>
  );
}
