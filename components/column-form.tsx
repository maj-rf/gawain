'use client';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { createColumnAction } from '@/lib/actions/column-actions';
import { CreateFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { State } from '@/types/types';
import { useActionState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';

export function ColumnForm({ boardId }: { boardId: string }) {
  const initialState: State = { message: '', success: false };
  const createColumnActionWithId = createColumnAction.bind(null, boardId);
  const [, formAction, isPending] = useActionState(createColumnActionWithId, initialState);
  const [, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      title: '',
    },
  });

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={form.handleSubmit((_, e) => {
          startTransition(() => {
            const formData = new FormData(e?.target);
            formAction(formData);
          });
        })}
        className="grid items-start gap-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Column Title</FormLabel>
              <FormControl>
                <Input placeholder="Your column title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
