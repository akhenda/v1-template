import { Link } from 'react-router';

import { Bot } from 'lucide-react';

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@repo/auth/extension';
import { AppearanceToggle } from '@repo/web-design-system/components/layout/theme-toggle';
import { Button } from '@repo/web-design-system/components/ui/button';

export const Header = () => (
  <header className="flex items-center justify-center gap-2">
    <SignedIn>
      <Button asChild size="icon" variant="outline">
        <Link to="/ai">
          <Bot className="size-5" />
          <span className="sr-only">AI Demo</span>
        </Link>
      </Button>
      <Button asChild>
        <Link to="/settings">Settings</Link>
      </Button>
      <AppearanceToggle />
      <UserButton />
    </SignedIn>

    <SignedOut>
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
      <Button asChild>
        <SignInButton mode="modal" />
      </Button>
      <Button asChild>
        <SignUpButton mode="modal" />
      </Button>
      <AppearanceToggle />
    </SignedOut>
  </header>
);
