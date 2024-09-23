'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { upsertJourney } from '@/actions/upsert-journey';
import { upsertJourneySchema } from '@/actions/upsert-journey/schema';
import { Input } from '@/components/ui/input';
import { Day } from '@/db/schema';
import { useRouter } from 'next/navigation';

type Props = {
  travelId: string;
  date: Date;
  day: Day;
};

type Schema = z.infer<typeof upsertJourneySchema>;

export default function JourneyForm({ travelId, date, day }: Props) {
  const router = useRouter();

  const form = useForm<Schema>({
    resolver: zodResolver(upsertJourneySchema),
    defaultValues: {
      date,
      depart: day?.depart ?? date,
      arrival: day?.arrival ?? date,
      transportation: day.transportation ?? 'car',
      travelId,
    },
  });

  const onSubmit: SubmitHandler<Schema> = async (values: Schema) => {
    await upsertJourney(values);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <fieldset className="space-y-2">
          <FormField
            control={form.control}
            name="depart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Depart</FormLabel>
                <FormControl>
                  <Input placeholder="Depart date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrival"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arrival</FormLabel>
                <FormControl>
                  <Input placeholder="Depart date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transportation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transportation</FormLabel>
                <FormControl>
                  <Input placeholder="Mean of transport" {...field} />
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
  );
}
