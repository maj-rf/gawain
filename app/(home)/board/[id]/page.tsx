import { ColumnForm } from '@/components/column-form';
import { ResponsiveModal } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';
import { fetchBoard, requireAuth } from '@/lib/data';
import { getMembership } from '@/lib/queries';
import { redirect } from 'next/navigation';

const boards = [
  {
    id: 1,
    title: 'Todo',
    cards: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 2,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 3,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 4,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 5,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 6,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 7,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
    ],
  },
  {
    id: 2,
    title: 'Ongoing',
    cards: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 2,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 3,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
    ],
  },
  {
    id: 3,
    title: 'Testing',
    cards: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 2,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      ,
    ],
  },
  {
    id: 4,
    title: 'Done',
    cards: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 2,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
      {
        id: 3,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,quis.',
      },
    ],
  },
];

export default async function BoardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await fetchBoard(id);
  if (!b) redirect('/');

  return (
    <>
      <nav className="bg-accent">{b.title}</nav>
      <div className="grid grid-flow-col-dense h-full gap-4 p-4 items-start overflow-y-hidden green-gradient">
        {b.column.map((c) => (
          <div
            key={c.id}
            className="border rounded-md w-[300px] overflow-hidden flex flex-col max-h-full bg-background"
          >
            <h2 className="px-2 py-1">{c.title}</h2>
            <hr></hr>
            <ul className="flex-1 space-y-2 overflow-y-auto px-4 py-2">
              {c.card.map((ca) => (
                <li key={ca.id}>
                  <input type="checkbox" />
                  {ca.title}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque quaerat illum quisquam ad
                  voluptates culpa odit, veniam ea sed.
                </li>
              ))}
            </ul>
            <Button variant="ghost">Add a Card</Button>
          </div>
        ))}

        <ResponsiveModal
          title="New Column"
          triggerTitle="Add a column"
          desc="Create a new column to your board!"
          triggerClass="w-[200px] px-2 py-1"
        >
          <ColumnForm />
        </ResponsiveModal>
      </div>
    </>
  );
}
