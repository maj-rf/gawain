import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';

export function ProfileForm({ className }: React.ComponentProps<'form'>) {
  return (
    <form className={cn('grid items-start gap-6', className)}>
      <div className="grid gap-3">
        <Label htmlFor="board-title">Board Title</Label>
        <Input id="board-title" placeholder="Your Board Title" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
