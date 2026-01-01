import type { PropsWithChildren } from 'react';

import { FullScreenError } from './full-screen-error';
import { FullScreenLoader } from './full-screen-loader';

type Props = PropsWithChildren<{
  showError: boolean;
  showLoading: boolean;
  errorTitle?: string;
  errorMessage?: string;
  errorDetails?: string;
  loadingMessage?: string;
  loadingSubMessage?: string;
}>;

export function PageWithStatusHandling({
  children,
  showError,
  showLoading,
  errorTitle = 'Oops! Sorry!',
  errorMessage = 'We encountered an Error',
  errorDetails = 'Error 500: There was a problem processing your request. Please try again',
  loadingMessage = 'Loading',
  loadingSubMessage = 'Please wait...',
}: Props) {
  if (showError) {
    return (
      <FullScreenError
        animationStyle="pulse"
        className="h-full"
        details={errorDetails}
        errorType="error"
        fullScreen={false}
        iconSize="lg"
        isVisible
        message={errorMessage}
        showBackgroundElements={false}
        speed={0.6}
        title={errorTitle}
      />
    );
  }

  if (showLoading) {
    return (
      <FullScreenLoader
        animationStyle="pulse"
        className="h-full"
        elementCount={6}
        fullScreen={false}
        isLoading
        message={loadingMessage}
        speed={1.2}
        subMessage={loadingSubMessage}
      />
    );
  }

  return <>{children}</>;
}
