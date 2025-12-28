import { captureRequestError } from '@sentry/nextjs';

export const initializeSentry = async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initializeSentry: initServer } = await import('./server');

    initServer();
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    const { initializeSentry: initEdge } = await import('./edge');

    initEdge();
  }
};

/**
 * Errors from Nested React Server Components
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#errors-from-nested-react-server-components
 */
export const onRequestError = captureRequestError;
