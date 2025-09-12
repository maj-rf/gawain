'use server';
import { z } from 'zod';
import { notifs } from '@/lib/notifications';
import { createColumn } from '../queries';
import { CreateFormSchema } from '../schemas';
import { CreateActionResponse, State } from '@/types/types';
import { revalidatePath } from 'next/cache';

export async function handleCreateColumn(
  boardId: string,
  _prevState: State,
  formData: FormData
): Promise<CreateActionResponse> {
  const form = Object.fromEntries(formData);
  const parsedForm = CreateFormSchema.safeParse(form);
  // server-side validation
  if (!parsedForm.success) return { success: false, message: z.prettifyError(parsedForm.error) };
  try {
    await createColumn({ title: parsedForm.data.title, boardId });
    revalidatePath('/');
    return { success: true, message: notifs.BOARD.CREATE_SUCCESS };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Something went wrong' };
  }
}
