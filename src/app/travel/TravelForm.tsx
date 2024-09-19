'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { upsertDaySchema } from '@/actions/upsert-day/schema';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { upsertDay } from '@/actions/upsert-day';
import { Day } from '@/db/schema';
import { useRouter } from 'next/navigation';

type Props = {
  travelId: string;
  date: Date;
  day: Day;
};

type Schema = z.infer<typeof upsertDaySchema>;

export default function TravelForm({ travelId, date, day }: Props) {
  const router = useRouter();

  const form = useForm<Schema>({
    resolver: zodResolver(upsertDaySchema),
    defaultValues: {
      date,
      breakfast: day?.breakfast ?? '',
      morning: day?.morning ?? '',
      lunch: day?.lunch ?? '',
      afternoon: day?.afternoon ?? '',
      diner: day?.diner ?? '',
      link: day?.link ?? '',
      travelId,
    },
  });

  const onSubmit: SubmitHandler<Schema> = async (values: Schema) => {
    await upsertDay(values);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <fieldset className="space-y-2">
          <FormField
            control={form.control}
            name="breakfast"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breakfast</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Your breakfast" {...field} />
                    <Button
                      variant={field.value === 'None' ? 'default' : 'ghost'}
                      type="button"
                      onClick={() => form.setValue('breakfast', 'None')}
                    >
                      None
                    </Button>
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
                  <Textarea placeholder="Your morning activities" {...field} />
                </FormControl>
                <FormDescription>You can use Markdown</FormDescription>
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
                    <Input placeholder="Your breakfast" {...field} />
                    <Button
                      variant={field.value === 'None' ? 'default' : 'ghost'}
                      type="button"
                      onClick={() => form.setValue('lunch', 'None')}
                    >
                      None
                    </Button>
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
                <FormDescription>You can use Markdown</FormDescription>
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
                    <Button
                      variant={field.value === 'None' ? 'default' : 'ghost'}
                      type="button"
                      onClick={() => form.setValue('diner', 'None')}
                    >
                      None
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Link related to this day" {...field} />
                    <Button
                      variant={field.value === 'None' ? 'default' : 'ghost'}
                      type="button"
                      onClick={() => form.setValue('link', 'None')}
                    >
                      None
                    </Button>
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
  );
}
