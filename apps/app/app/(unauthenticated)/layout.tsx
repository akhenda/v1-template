import type { PropsWithChildren } from 'react';

import { FlickeringGrid } from '@repo/design-system/components/layout/flickering-grid';
import { ModeToggle } from '@repo/design-system/components/layout/mode-toggle';

import './auth.css';

import { CarIcon } from 'lucide-react';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className="container relative mx-auto grid h-dvh grid-cols-1 flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-zinc-900" />
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className="relative z-20 flex items-center font-medium text-lg">
        <CarIcon className="mr-2 h-6 w-6" />
        Kaidoku Cars
      </div>
      <div className="absolute top-10 right-10 z-30">
        <ModeToggle className="text-white" />
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;I was struggling to get translated auction sheets until I discovered Kaidoku
            Cars!&rdquo;
          </p>
          <footer className="text-sm">Michael Chen</footer>
        </blockquote>
      </div>
    </div>
    <div className="lg:p-8">
      <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center space-y-6 sm:max-w-sm md:max-w-md lg:max-w-lg">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
