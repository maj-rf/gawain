'use server';
import { getSession } from '@/lib/auth';
import { notifs } from '@/lib/notifications';

export async function handleCreateBoard(data: { title: string }) {
  const session = await getSession();
  if (!session) throw new Error(notifs.AUTH.REQUIRED);
}
