import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveModal } from '@/components/responsive-modal';
import { CreateBoardForm } from '@/components/create-board-form';
import { fetchUserBoards } from '@/lib/data';

function HomePageWorkspaces({
  boards,
}: {
  boards: {
    userId: string;
    role: 'owner' | 'member';
    id: string;
    title: string;
    ownerId: string;
    ownerName: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) {
  return (
    <section className="grid gap-2">
      <h1 className="uppercase font-bold">Your Workspaces</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-[minmax(100px,1fr)] gap-2">
        <ResponsiveModal
          title="Create board"
          triggerTitle="Create new board"
          desc="Add a new board to your workspace and start working on your
              project!"
          triggerClass=""
        >
          <CreateBoardForm />
        </ResponsiveModal>
        {boards.map((b) => (
          <Link href={`/board/${b.id}`} key={b.id}>
            <Card className="p-0 gap-0 overflow-hidden h-full">
              <div className="flex-1 bg-radial-[at_25%_25%] from-indigo-400 to-purple-500 to-95%"></div>
              <CardHeader className="py-3">
                <CardTitle className="font-normal truncate">{b.title}</CardTitle>
                <CardDescription>by{b.ownerName}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const boards = await fetchUserBoards();
  return (
    <div className="px-4 py-2">
      <HomePageWorkspaces boards={boards} />
    </div>
  );
}
