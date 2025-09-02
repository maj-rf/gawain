'use client';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { useActionState } from 'react';
import { handleCreateBoard } from '@/lib/actions/board-actions';
import { CreateBoardSchema } from '@/lib/schemas';
import { State } from '@/types/types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

export function CreateBoardForm({ className }: React.ComponentProps<'form'>) {
  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit() {
    // TODO: put formAction here???
    console.log('submitted');
  }

  const initialState: State = { message: '', success: false };
  // TODO: how to mix RHF & useActionState???
  const [state, formAction, isPending] = useActionState(handleCreateBoard, initialState);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('grid items-start gap-6', className)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board Title</FormLabel>
              <FormControl>
                <Input placeholder="Your board title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
