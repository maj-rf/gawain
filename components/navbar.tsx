import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SignoutButton from './signout-button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

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

function NavbarDropdown({
  image,
  name,
  email,
}: Pick<User, 'image' | 'name' | 'email'>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image ?? 'https://github.com/shadcn.png'} />
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

export default function Navbar({ user }: { user: User }) {
  return (
    <header className="w-full bg-red-300">
      <nav className="flex items-center justify-between gap-2 px-4 py-2">
        <div className="flex items-center justify-center">
          <Logo /> gawain
        </div>
        <NavbarDropdown
          image={user.image}
          email={user.email}
          name={user.name}
        />
      </nav>
    </header>
  );
}
