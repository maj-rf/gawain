'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { TColumnWithChildren } from '@/types/types';
import CreateCardForm from './create-card-form';
import { CollisionPriority } from '@dnd-kit/abstract';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/react/sortable';

export default function Column(props: TColumnWithChildren) {
  const [active, setActive] = useState(false);
  const { ref, isDropTarget, handleRef } = useSortable({
    id: props.id,
    index: props.order,
    type: 'column',
    accept: ['item', 'column'],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      className={cn(`border rounded-md w-[300px] shrink-0 overflow-hidden flex flex-col max-h-full bg-background`, {
        'bg-red-200': isDropTarget,
      })}
    >
      <div className="hover:cursor-grab" ref={handleRef}>
        <div className="h-2 w-[60%] shrink-0 rounded-4xl mx-auto my-2 bg-black/40"></div>
      </div>
      <h2 className="px-2 py-1">{props.title}</h2>
      <hr></hr>
      <ul className="flex-1 space-y-2 overflow-y-auto p-2">{props.children}</ul>
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
