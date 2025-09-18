'use client';
import { TCard } from '@/db/schema';
import { Button } from './ui/button';
import { CircleX } from 'lucide-react';
import { useTransition } from 'react';
import { deleteCardAction } from '@/lib/actions/card-actions';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type ColumnCardProps = TCard & {
  boardId: string;
};

export default function ColumnCard(props: ColumnCardProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <li className={cn('relative px-2 py-1 bg-accent rounded-sm', { 'opacity-60': isPending })}>
      <div className="flex items-center gap-2">
        <div>
          <p>{props.title}</p>
          <span className="text-foreground/60">{props.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
      <Button
        className="absolute top-0 right-0 ml-auto"
        variant="ghost"
        size="icon"
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
        <CircleX className="stroke-red-500" />
      </Button>
    </li>
  );
}
