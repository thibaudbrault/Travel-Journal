'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { options } from '@/lib/constants';
import { dateAtom, diffDaysAtom } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {};

const formSchema = z.object({
  morning: z.string().min(2, {
    message: 'You must add a descritption of your morning.',
  }),
});

export default function Travel({}: Props) {
  const date = useAtomValue(dateAtom);
  const diffDays = useAtomValue(diffDaysAtom);
  const startDate = new Date(date?.from);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      morning: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
            <section key={index} className="w-full">
              <h2>
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
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </section>
          );
        })}
    </main>
  );
}
