import Board from '@/components/board';
import { fetchBoard } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function BoardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await fetchBoard(id);
  if (!b) redirect('/');

  return (
    <>
      <nav className="bg-accent">{b.title}</nav>
      <Board {...b} />
    </>
  );
}
