'use client';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { createCardAction } from '@/lib/actions/card-actions';
import { UpdateCardFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { State } from '@/types/types';
import { useActionState, useTransition, type PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

//TODO: unused for now. use it in modal?
export default function UpdateCardForm(
  props: PropsWithChildren<{ columnId: string; boardId: string; id: string; title: string }>
) {
  const initialState: State = { message: '', success: false };
  const createCardActionWithIds = createCardAction.bind(null, { columnId: props.columnId, boardId: props.boardId });
  const [, formAction, isPending] = useActionState(createCardActionWithIds, initialState);
  const [, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateCardFormSchema>>({
    resolver: zodResolver(UpdateCardFormSchema),
    defaultValues: {
      title: props.title,
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
            form.reset();
          });
        })}
        className="grid items-start gap-3 p-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Card Title</FormLabel>
              <FormControl>
                <Input placeholder="Your card title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            Update Card
          </Button>
          {props.children}
        </div>
      </form>
    </Form>
  );
}
