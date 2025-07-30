import { LogInIcon } from 'lucide-react';

import { SignedIn, SignedOut, UserButton } from '@repo/auth/extension';
import { EnhancedButton } from '@repo/design-system/components/enhanced-button';

import { useIsSidepanelSurface } from '@/lib/hooks';
import Logo from '~/assets/logo.svg?react';
import { cn, logger } from '~/lib/utils';

import config from '@@/app.config';

type MainProps = { readonly className?: string; readonly filename: string };

export const Main = ({ className, filename }: MainProps) => {
  const isSidepanel = useIsSidepanelSurface();

  function onSignIn() {
    logger.info('Signing in...');
    if (isSidepanel) window.close();
  }

  return (
    <main className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <Logo className="w-24 animate-pulse text-primary" />
      <p className="text-pretty text-center leading-tight">
        Hello from{' '}
        <code className="inline-block rounded-sm bg-muted px-1.5 text-muted-foreground text-sm">
          {filename}
        </code>{' '}
        👋
      </p>
      <SignedOut>
        <EnhancedButton
          variant="default"
          effect="ringHover"
          iconPlacement="right"
          icon={LogInIcon}
          onClick={onSignIn}
          asChild
        >
          <a href={config.signInLink} target="_blank" rel="noreferrer">
            Sign In to Continue
          </a>
        </EnhancedButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  );
};
