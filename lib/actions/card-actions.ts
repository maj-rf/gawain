'use server';
import { CreateActionResponse, State } from '@/types/types';
import { CreateFormSchema } from '../schemas';
import { z } from 'zod';
import { createCard, deleteCard } from '../queries';
import { revalidatePath } from 'next/cache';
import { notifs } from '../notifications';
export async function handleCreateCard(
  ids: { columnId: string; boardId: string },
  _prevState: State,
  formData: FormData
): Promise<CreateActionResponse> {
  const form = Object.fromEntries(formData);
  const parsedForm = CreateFormSchema.safeParse(form);
  if (!parsedForm.success) return { success: false, message: z.prettifyError(parsedForm.error) };
  try {
    await createCard({ columnId: ids.columnId, title: parsedForm.data.title });
    revalidatePath(`/${ids.boardId}`);
    return { success: true, message: notifs.CARD.CREATE_SUCCESS };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Something went wrong' };
  }
}

export async function handleDeleteCard({
  columnId,
  cardId,
  order,
  boardId,
}: {
  columnId: string;
  cardId: string;
  order: number;
  boardId: string;
}): Promise<CreateActionResponse> {
  try {
    await deleteCard({ columnId, cardId, order });
    revalidatePath(`/${boardId}`);
    return { success: true, message: notifs.CARD.DELETE_SUCCESS };
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
  }
}
