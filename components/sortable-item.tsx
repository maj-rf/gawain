'use client';
import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type SortableData = { type: 'column' } | { type: 'card'; columnId: string };

interface SortableItemProps<T extends SortableData> {
  id: string;
  data: T;
  children: ReactNode;
}

export function SortableItem<T extends SortableData>({ id, data, children }: SortableItemProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, data });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {data.type === 'column' && (
        <div {...attributes} {...listeners} className="relative">
          <div className="absolute top-[2px] left-0 right-0 h-2 w-[60%] rounded-4xl mx-auto bg-black/40 hover:cursor-grab"></div>
        </div>
      )}

      {children}
    </div>
  );
}
