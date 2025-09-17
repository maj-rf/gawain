'use client';
import { BoardWithColumns } from '@/types/types';
import Column from './column';
import ColumnCard from './column-card';
import { ColumnForm } from './column-form';
import { ResponsiveModal } from './responsive-modal';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useState, useTransition } from 'react';
import { handleReorderColumn } from '@/lib/actions/column-actions';

export default function Board(props: BoardWithColumns) {
  const [cols, setCols] = useState(props.column);
  const [isPending, startTransition] = useTransition();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleClientDeleteCard(columnId: string, cardId: string) {
    setCols((prev) => {
      const newCols = [...prev];
      const currentCol = newCols.find((col) => col.id === columnId);
      if (currentCol) {
        currentCol.card = currentCol.card.filter((c) => c.id !== cardId);
        currentCol.card = currentCol.card.map((c, i) => ({ ...c, order: i }));
      }
      return newCols;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'column' && overData?.type === 'column') {
      const oldIndex = cols.findIndex((c) => c.id === active.id);
      const newIndex = cols.findIndex((c) => c.id === over.id);
      const newCols = arrayMove(cols, oldIndex, newIndex);
      const updatedCols = newCols.map((c, i) => ({ ...c, order: i }));
      startTransition(async () => {
        await handleReorderColumn({ boardId: props.id, updates: updatedCols });
      });
      setCols(updatedCols);
    }

    // TODO: Add card reorder & sorting
    if (activeData?.type === 'card') {
      // here TS knows `columnId` exists
      const fromColId = activeData.columnId;
    }
  }

  return (
    <DndContext
      id={'dnd-column-card-context'}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-nowrap h-[calc(100%-1.5rem)] gap-4 p-4 items-start overflow-y-hidden green-gradient">
        <SortableContext items={cols} strategy={horizontalListSortingStrategy}>
          {cols.map((c) => (
            <Column key={c.id} {...c}>
              {c.card.length === 0 ? (
                <div className="text-center border-foreground/40 border border-dashed rounded-md py-2">
                  Drop cards here
                </div>
              ) : (
                c.card.map((ca) => (
                  <ColumnCard key={ca.id} {...ca} boardId={props.id} handleClientDeleteCard={handleClientDeleteCard} />
                ))
              )}
            </Column>
          ))}
        </SortableContext>

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
      {/* TODO: style loader */}
      {isPending && <div className="fixed bottom-0 right-0">Saving...</div>}
    </DndContext>
  );
}
