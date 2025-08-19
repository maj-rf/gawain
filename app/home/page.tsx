import Navbar from '@/components/navbar';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect('/login');
  return (
    <div>
      <Navbar user={session.user} />
      <main>asdasd</main>
    </div>
  );
}
