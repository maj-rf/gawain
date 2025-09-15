'use client';
import { BoardWithColumns } from '@/types/types';
import Column from './column';
import ColumnCard from './column-card';
import { ColumnForm } from './column-form';
import { ResponsiveModal } from './responsive-modal';
import { DndContext } from '@dnd-kit/core';
export default function Board(props: BoardWithColumns) {
  return (
    <DndContext>
      <div className="flex flex-nowrap h-[calc(100%-1.5rem)] gap-4 p-4 items-start overflow-y-hidden green-gradient">
        {props.column.map((c) => (
          <Column key={c.id} {...c}>
            {c.card.length === 0 ? (
              <div className="text-center border-foreground/40 border border-dashed rounded-md py-2">
                Drop cards here
              </div>
            ) : (
              c.card.map((ca) => <ColumnCard key={ca.id} {...ca} boardId={props.id} />)
            )}
          </Column>
        ))}

        <div className="shrink-0">
          <ResponsiveModal
            title="New Column"
            triggerTitle="Add a column"
            desc="Create a new column to your board!"
            triggerClass="w-[200px] px-2 py-1"
          >
            <ColumnForm boardId={props.id} />
          </ResponsiveModal>
        </div>
      </div>
    </DndContext>
  );
}
