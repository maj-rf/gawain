'use server';
import { z } from 'zod';
import { notifs } from '@/lib/notifications';
import { createBoard } from '../queries';
import { requireAuth } from '../data';
import { CreateFormSchema } from '../schemas';
import { CreateActionResponse, State } from '@/types/types';
import { revalidatePath } from 'next/cache';

export async function createBoardAction(_prevState: State, formData: FormData): Promise<CreateActionResponse> {
  try {
    const user = await requireAuth();
    const form = Object.fromEntries(formData);
    const parsedForm = CreateFormSchema.safeParse(form);
    // server-side validation
    if (!parsedForm.success) return { success: false, message: z.prettifyError(parsedForm.error) };
    await createBoard({ title: parsedForm.data.title, ownerId: user.id });
    revalidatePath('/');

    return { success: true, message: notifs.BOARD.CREATE_SUCCESS };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Something went wrong' };
  }
}
