import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveModal } from '@/components/responsive-modal';

const boards: Array<{ id: string; title: string }> = [
  {
    id: '1',
    title:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores, odio.',
  },
  { id: '2', title: 'hello' },
  { id: '3', title: 'whatever' },
  { id: '4', title: 'i misss your tan skin' },
  { id: '5', title: 'your sweet smile' },
];

function HomePageWorkspaces() {
  return (
    <section className="grid gap-2">
      <h1 className="uppercase font-bold">Your Workspaces</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] auto-rows-fr gap-2">
        <ResponsiveModal />
        {boards.map((b) => (
          <Link href={`/board/${b.id}`} key={b.id}>
            <Card className="p-0 gap-0 overflow-hidden">
              <div className="h-15 bg-radial-[at_25%_25%] from-indigo-400 to-purple-500 to-95%"></div>
              <CardHeader className="py-3">
                <CardTitle className="font-normal truncate">
                  {b.title}
                </CardTitle>
              </CardHeader>
            </Card>
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
    <div className="px-4 py-2">
      <HomePageWorkspaces />
    </div>
  );
}
