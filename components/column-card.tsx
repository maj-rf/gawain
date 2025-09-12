import { TCard } from '@/db/schema';

export default function ColumnCard(props: TCard) {
  return (
    <li>
      <input type="checkbox" />
      {props.title}
      <span className="text-foreground/60">{props.createdAt.toLocaleDateString()}</span>
    </li>
  );
}
