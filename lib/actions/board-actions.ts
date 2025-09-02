'use server';
import { z } from 'zod';
import { notifs } from '@/lib/notifications';
import { createBoard } from '../queries';
import { requireAuth } from '../data';
import { CreateBoardSchema } from '../schemas';
import { State } from '@/types/types';

type CreateBoardResponse = {
  success: boolean;
  message: string;
};

export async function handleCreateBoard(prevState: State, data: { title: string }): Promise<CreateBoardResponse> {
  try {
    const user = await requireAuth();
    const validate = CreateBoardSchema.safeParse({ title: data.title });
    // server-side validation
    if (!validate.success) return { success: false, message: z.prettifyError(validate.error) };

    await createBoard({ title: data.title, ownerId: user.id });
    return { success: true, message: notifs.BOARD.CREATE_SUCCESS };
  } catch {
    return { success: false, message: 'Something went wrong' };
  }
}
