'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { authClient } from '@/lib/auth-client';

export default function SignoutButton() {
  const router = useRouter();

  const signout = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push('/login'),
      },
    });
  return (
    <Button onClick={signout} variant="outline" className="w-full md:w-fit">
      Sign Out
    </Button>
  );
}
