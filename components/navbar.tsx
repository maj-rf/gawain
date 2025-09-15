import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SignoutButton from './auth/signout-button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { requireAuth } from '@/lib/data';

type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
};

const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="88.1023"
        y="144.792"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 88.1023 144.792)"
        fill="currentColor"
      />
      <rect
        x="85.3459"
        y="244.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 85.3459 244.537)"
        fill="currentColor"
      />
      <rect
        x="95.3459"
        y="344.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-90.5799 85.3459 244.537)"
        fill="currentColor"
      />
    </svg>
  );
};

function NavbarDropdown({ image, name, email }: Pick<User, 'image' | 'name' | 'email'>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage referrerPolicy="no-referrer" src={image ?? 'https://github.com/shadcn.png'} />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 w-[300px]">
        <DropdownMenuLabel>
          {name}
          <p className="text-muted-foreground">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationDropdown() {
  const notif: Array<{ id: string; message: string }> = [{ id: '1', message: 'hello' }];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {notif.length > 0 && (
            <div className="absolute top-0 right-0 bg-destructive size-4 text-background rounded-full text-xs">
              {notif.length}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 w-[300px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notif.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center gap-4 py-4">
            <Image src="/content.webp" alt="contented-face" width={50} height={50} className="rounded-full" />
            <p>No unread notifications</p>
          </div>
        ) : (
          notif.map((n) => <DropdownMenuItem key={n.id}>{n.message}</DropdownMenuItem>)
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default async function Navbar() {
  const user = await requireAuth();
  return (
    <header className="w-full">
      <nav className="flex items-center justify-between gap-2 px-4 py-2 border-b">
        <div className="flex items-center justify-center">
          <Logo /> gawain
        </div>
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <NavbarDropdown image={user.image} email={user.email} name={user.name} />
        </div>
      </nav>
    </header>
  );
}
