import 'server-only';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { getUserBoards } from './queries';

export const requireAuth = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect('/login');
  return session.user;
});

export async function fetchUserBoards() {
  const user = await requireAuth();
  const boards = await getUserBoards(user.id);
  return boards;
}
