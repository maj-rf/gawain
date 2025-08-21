'use client';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function SignoutButton() {
  const router = useRouter();

  const signout = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push('/login'),
      },
    });
  return <div onClick={signout}>Sign Out</div>;
}
