import { useState } from 'react';
import { Button } from './ui/button';
import { TColumnWithChildren } from '@/types/types';
import CreateCardForm from './create-card-form';

export default function Column(props: TColumnWithChildren) {
  const [active, setActive] = useState(false);

  return (
    <div className="border rounded-md w-[300px] shrink-0 overflow-hidden flex flex-col max-h-full bg-background">
      <h2 className="px-2 py-1">{props.title}</h2>
      <hr></hr>
      <ul className="flex-1 space-y-2 overflow-y-auto px-4 py-2">{props.children}</ul>
      {!active ? (
        <Button variant="ghost" onClick={() => setActive(true)}>
          New Card
        </Button>
      ) : (
        <div>
          <CreateCardForm columnId={props.id} boardId={props.boardId}>
            <Button type="button" variant="ghost" onClick={() => setActive(false)}>
              Close
            </Button>
          </CreateCardForm>
        </div>
      )}
    </div>
  );
}
