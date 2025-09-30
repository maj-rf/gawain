'use client';
import { TCard } from '@/db/schema';
import { Button } from './ui/button';
import { useTransition } from 'react';
import { deleteCardAction } from '@/lib/actions/card-actions';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';
import { useSortable } from '@dnd-kit/react/sortable';

type ColumnCardProps = TCard & {
  boardId: string;
};

export default function ColumnCard(props: ColumnCardProps) {
  const [isPending, startTransition] = useTransition();
  const { ref, isDragging } = useSortable({
    id: props.id,
    index: props.order,
    type: 'item',
    accept: 'item',
    group: props.columnId,
  });

  return (
    <li
      ref={ref}
      data-dragging={isDragging}
      className={cn(
        'flex relative px-2 py-1 overflow-hidden bg-accent rounded-sm hover:outline-2 hover:outline-yellow-200 group',
        {
          'opacity-60': isPending,
        }
      )}
    >
      <div className="flex w-full items-center gap-2">
        <div className="w-full">
          <p className="wrap-break-word w-full">{props.title}</p>
          <span className="text-foreground/60">{props.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
      <Button
        className="w-fit px-2 py-1 absolute top-1 right-[-100px] group-hover:right-1"
        variant="destructive"
        size="icon"
        name="delete-card-btn"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const result = await deleteCardAction({
              columnId: props.columnId,
              cardId: props.id,
              order: props.order,
              boardId: props.boardId,
            });
            if (!result.success) {
              toast.error(result.message);
              return;
            }
          });
        }}
      >
        <CircleX className="stroke-background" />
      </Button>
    </li>
  );
}
