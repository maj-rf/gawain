import { Button } from './ui/button';
import { TColumnWithChildren } from '@/types/types';

export default function Column(props: TColumnWithChildren) {
  return (
    <div className="border rounded-md w-[300px] shrink-0 overflow-hidden flex flex-col max-h-full bg-background">
      <h2 className="px-2 py-1">{props.title}</h2>
      <hr></hr>
      <ul className="flex-1 space-y-2 overflow-y-auto px-4 py-2">
        <li>
          <input type="checkbox" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque quaerat illum quisquam ad voluptates
          culpa odit, veniam ea sed.
        </li>
        <li>
          <input type="checkbox" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque quaerat illum quisquam ad voluptates
          culpa odit, veniam ea sed.
        </li>
        <li>
          <input type="checkbox" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque quaerat illum quisquam ad voluptates
          culpa odit, veniam ea sed.
        </li>
        <li>
          <input type="checkbox" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque quaerat illum quisquam ad voluptates
          culpa odit, veniam ea sed.
        </li>
        <li>
          <input type="checkbox" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque quaerat illum quisquam ad voluptates
          culpa odit, veniam ea sed.
        </li>
        <li>
          <input type="checkbox" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque quaerat illum quisquam ad voluptates
          culpa odit, veniam ea sed.
        </li>

        {props.children}
      </ul>
      <Button variant="ghost">Add a Card</Button>
    </div>
  );
}
