import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function LandingPage() {
  const session = await getSession();
  if (session) redirect('/home');
  return (
    <div>
      <h1>This is the landing page</h1>
      <Link href="/login">
        <Button variant={'link'}>Login</Button>
      </Link>
    </div>
  );
}
