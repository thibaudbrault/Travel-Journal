'use client';

import { createTravelSchema } from '@/actions/create-travel/schema';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DAY } from '@/lib/constants';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMonths } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  userId: string;
};

type Schema = z.infer<typeof createTravelSchema>;

export default function New({ userId }: Props) {
  const today = new Date();
  const nextMonth = addMonths(today, 1);
  const [month, setMonth] = useState<Date>(nextMonth);

  const form = useForm<Schema>({
    resolver: zodResolver(createTravelSchema),
    defaultValues: {
      name: '',
      location: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (values: Schema) => {
    console.log(values);
  };

  useEffect(() => {
    console.log('valid: ', form.formState.isValid);
  }, [form.formState.isDirty, form.formState.isValid]);

  return (
    <main className="flex grow flex-col items-center justify-center gap-8 p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <fieldset className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your travel name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Your travel location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={(date) => field.onChange(date)}
                      numberOfMonths={2}
                      month={month}
                      onMonthChange={setMonth}
                      ISOWeek
                      className="rounded-md border border-input"
                    />
                  </FormControl>
                  <FormMessage />
                  {field.value?.to && (
                    <FormDescription>
                      <span className="font-bold text-sky-400">
                        {Math.round(
                          Math.abs(field.value?.from - field.value?.to) / DAY,
                        ) ?? 0}
                      </span>{' '}
                      days from {field.value.from?.toLocaleDateString()} to{' '}
                      {field.value.to?.toLocaleDateString()}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <input value={userId} {...form.register('userId')} hidden />
          </fieldset>
          <div className="flex w-full items-center justify-center gap-4">
            <Button
              variant="destructive"
              onClick={() => form.reset()}
              className="text-lg"
              type="reset"
            >
              Reset
            </Button>
            <Button
              variant="secondary"
              onClick={() => setMonth(today)}
              className="text-lg"
              type="button"
            >
              Today
            </Button>
            <Button
              variant="default"
              // disabled={!form.formState.isValid}
              className="text-lg font-semibold"
              type="submit"
            >
              Select
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={form.control} />
    </main>
  );
}
