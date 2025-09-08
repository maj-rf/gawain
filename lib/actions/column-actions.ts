'use server';
import { z } from 'zod';
import { notifs } from '@/lib/notifications';
import { createColumn } from '../queries';
import { CreateColumnSchema } from '../schemas';
import { State } from '@/types/types';
import { revalidatePath } from 'next/cache';

type CreateColumnResponse = {
  success: boolean;
  message: string;
};

export async function handleCreateColumn(
  boardId: string,
  _prevState: State,
  formData: FormData
): Promise<CreateColumnResponse> {
  const form = Object.fromEntries(formData);
  const parsedForm = CreateColumnSchema.safeParse(form);
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
