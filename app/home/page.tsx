import SignoutButton from '@/components/signout-button';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect('/login');
  return (
    <div>
      <h1>HomePage</h1>
      <SignoutButton />
    </div>
  );
}
