'use client';

import { useEffect } from 'react';

import type NextError from 'next/error';
import Image from 'next/image';
import Link from 'next/link';

import { AlertTriangle, Home, Mail, RefreshCw } from 'lucide-react';

import { Button } from '@repo/design-system/components/ui/button';
import { logger } from '@repo/observability/logger';

import './styles.css';

type Props = {
  readonly error: Error & NextError & { digest?: string };
  readonly reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error(error.message, error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
          <div className="w-full max-w-lg space-y-8">
            {/* Logo */}
            <div className="mb-16 flex items-center justify-center">
              <Image
                priority
                src="/images/logo.svg"
                alt="Kaidoku Cars Logo"
                width={0}
                height={0}
                className="h-20 w-auto dark:invert-30"
              />
            </div>

            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-red-100 p-4">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="font-bold text-3xl text-foreground tracking-tight">
                Oops, something went wrong
              </h1>
              <p className="text-muted-foreground">
                We're sorry, but we encountered an unexpected error. Our team has been notified.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 rounded-md bg-red-50 p-4 text-left">
                  <p className="font-medium text-red-800 text-sm">Error details:</p>
                  <pre className="mt-2 max-h-40 overflow-auto rounded bg-gray-800 p-2 text-white text-xs">
                    {error.message}
                    {'\n'}
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button variant="secondary" asChild>
                <Link href="/" className="flex min-w-32 items-center justify-center">
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Link>
              </Button>
              <Button
                onClick={reset}
                className="flex min-w-32 items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>

            {/* Support Info */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="font-medium text-foreground text-sm">Need assistance?</h2>
              <p className="mt-1 text-muted-foreground text-sm">
                If the problem persists, please contact our support team.
              </p>
              <a
                href="mailto:support@kaidokucars.com"
                className="mt-3 inline-flex items-center font-medium text-emerald-600 text-sm hover:text-emerald-700"
              >
                <Mail className="mr-2 h-4 w-4" />
                support@kaidokucars.com
              </a>
            </div>

            {/* Error ID */}
            {error.digest && (
              <p className="text-muted-foreground/90 text-xs">
                Error ID: <code className="rounded bg-gray-100 px-1 py-0.5">{error.digest}</code>
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
