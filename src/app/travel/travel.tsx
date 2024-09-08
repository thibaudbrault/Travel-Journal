'use client';

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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { options } from '@/lib/constants';
import { dateAtom, diffDaysAtom } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {};

type Schema = z.infer<typeof upsertDaySchema>;

export default function Travel({}: Props) {
  const date = useAtomValue(dateAtom);
  const diffDays = useAtomValue(diffDaysAtom);
  const startDate = new Date(date?.from);

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
      <p>
        From{' '}
        <span className="capitalize text-sky-400">
          {date?.from?.toLocaleDateString(undefined, options)}
        </span>{' '}
        to{' '}
        <span className="capitalize text-sky-400">
          {date?.to?.toLocaleDateString(undefined, options)}
        </span>
      </p>
      {Array(diffDays + 1)
        .fill(null)
        .map((_, index) => {
          const curDate = new Date(date?.from);
          curDate.setDate(startDate.getDate() + index);
          return (
            <>
              <section key={index} className="w-full space-y-4">
                <h2 className="text-xl">
                  Day {index + 1}:{' '}
                  <span className="font-semibold capitalize">
                    {curDate.toLocaleDateString(undefined, options)}
                  </span>
                </h2>
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
                              <div className="flex gap-2 items-center">
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
                              <div className="flex gap-2 items-center">
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
                              <div className="flex gap-2 items-center">
                                <Input placeholder="Your diner" {...field} />
                                <Button variant="ghost">None</Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </fieldset>
                    <Button type="submit" className="font-semibold">
                      Save
                    </Button>
                  </form>
                </Form>
              </section>
              <Separator />
            </>
          );
        })}
    </main>
  );
}
