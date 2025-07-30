import { browser } from 'wxt/browser';

import Logo from '~/assets/logo.svg?react';
import { cn } from '~/lib/utils';

type MainProps = { readonly className?: string; readonly filename: string };

export const Main = ({ className, filename }: MainProps) => {
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
      <a
        href="https://turbostarter.dev/docs/extension"
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer text-primary text-sm underline hover:no-underline"
      >
        {browser.i18n.getMessage('learnMore')}
      </a>
    </main>
  );
};
