import { TCard } from '@/db/schema';

export default function ColumnCard(props: TCard) {
  return (
    <li>
      <input type="checkbox" />
      {props.title}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque quaerat illum quisquam ad voluptates
      culpa odit, veniam ea sed.
    </li>
  );
}
