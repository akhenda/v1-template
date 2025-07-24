import React, { type PropsWithChildren } from 'react';

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
        isVisible
        fullScreen={false}
        errorType="error"
        iconSize="lg"
        animationStyle="pulse"
        speed={0.6}
        showBackgroundElements={false}
        title={errorTitle}
        message={errorMessage}
        details={errorDetails}
        className="h-full"
      />
    );
  }

  if (showLoading) {
    return (
      <FullScreenLoader
        isLoading
        speed={1.2}
        fullScreen={false}
        elementCount={6}
        animationStyle="pulse"
        message={loadingMessage}
        subMessage={loadingSubMessage}
        className="h-full"
      />
    );
  }

  return <>{children}</>;
}
