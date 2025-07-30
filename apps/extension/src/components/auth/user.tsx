import { LogIn, UserRound } from 'lucide-react';
import { browser } from 'wxt/browser';

import { useClerk, useUser } from '@repo/auth/extension';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';

import { getAvatar, getName } from '~/lib/utils';

const AnonymousUser = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => {
        browser.tabs.create({ url: 'tabs.html#sign-in' });
      }}
    >
      <LogIn className="size-4" />
    </Button>
  );
};

export const User = () => {
  const { signOut } = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return 'Loading...';
  if (!user || !isSignedIn) return <AnonymousUser />;

  const name = getName(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar className="size-10">
            <AvatarImage src={getAvatar(user)} alt={name} />
            <AvatarFallback>
              <UserRound className="size-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            {name && <p className="font-medium font-sans text-sm leading-none">{name}</p>}
            {user.emailAddresses.at(0)?.emailAddress && (
              <p className="font-sans text-muted-foreground text-xs leading-none">
                {user.emailAddresses.at(0)?.emailAddress}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" asChild>
          <button type="button" className="w-full" onClick={() => signOut()}>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
