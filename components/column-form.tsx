import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';

export function ColumnForm({ className }: React.ComponentProps<'form'>) {
  return (
    <form className={cn('grid items-start gap-6', className)}>
      <div className="grid gap-3">
        <Label htmlFor="column-title">Column Title</Label>
        <Input id="column-title" placeholder="Your Column Title" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
