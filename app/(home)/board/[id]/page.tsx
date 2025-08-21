import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const boards = [
  { id: 1, title: 'Todo' },
  { id: 2, title: 'Ongoing' },
  { id: 3, title: 'Testing' },
  { id: 4, title: 'Done' },
];
export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getSession();
  if (!session) redirect('/login');
  return (
    <div className="px-4 py-2">
      <h1>BoardPage {id}</h1>
      <section className="grid grid-flow-col-dense overflow-x-scroll gap-4">
        {boards.map((b) => (
          <div key={b.id} className="border w-[300px] px-2 py-1 min-h-[300px]">
            <h2>{b.title}</h2>
            <hr></hr>
            <ul className="grid grid-cols-1 gap-2">
              <li>
                <input type="checkbox" />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                quis.
              </li>
              <li>
                <input type="checkbox" />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
                odio corporis nobis consequuntur dolor vero at laborum
                laudantium? Aliquam, tenetur!
              </li>
            </ul>
          </div>
        ))}
        <Button variant="outline" className="w-[300px]">
          Add a column
        </Button>
      </section>
    </div>
  );
}
