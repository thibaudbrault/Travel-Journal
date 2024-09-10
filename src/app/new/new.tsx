'use client';

import { useState } from 'react';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { createTravel } from '@/actions/create-travel';
import { createTravelSchema } from '@/actions/create-travel/schema';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { countries, DAY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

type Props = {
  userId: string;
};

type Schema = z.infer<typeof createTravelSchema>;

export default function New({ userId }: Props) {
  const today = new Date();
  const [month, setMonth] = useState<Date>(today);

  const form = useForm<Schema>({
    resolver: zodResolver(createTravelSchema),
    defaultValues: {
      name: '',
      country: '',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Schema> = async (values) => {
    await createTravel(values);
  };

  return (
    <main className="flex grow flex-col items-center justify-center gap-8 p-24">
      <h2 className="text-4xl font-semibold">Create your travel</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-fit max-w-screen-lg space-y-4"
        >
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
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? countries.find(
                                (country) => country.value === field.value,
                              )?.label
                            : 'Select a country'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search countries..." />
                        <CommandList>
                          <CommandEmpty>No country found</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country) => (
                              <CommandItem
                                value={country.label}
                                key={country.value}
                                onSelect={() => {
                                  form.setValue('country', country.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    country.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {country.flag} {country.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
