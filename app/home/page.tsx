import Navbar from '@/components/navbar';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
function HomePageWorkspaces() {
  const boards: Array<{ id: string; title: string }> = [
    { id: '1', title: 'hello' },
    { id: '2', title: 'hello' },
    { id: '3', title: 'hello' },
    { id: '4', title: 'hello' },
    { id: '5', title: 'hello' },
  ];
  return (
    <section>
      <h1>Your Workspaces</h1>
      <div className="grid grid-cols-3">
        <Button>Create new board</Button>
        {boards.map((b) => (
          <Link href={`/boards/${b.id}`} key={b.id}>
            {b.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect('/login');
  return (
    <div>
      <Navbar user={session.user} />
      <main>
        <HomePageWorkspaces />
      </main>
    </div>
  );
}
