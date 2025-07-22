import { captureRequestError, init } from '@sentry/nextjs';
import { keys } from './keys';

const opts = { dsn: keys().NEXT_PUBLIC_SENTRY_DSN };

export const initializeSentry = () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') init(opts);
  if (process.env.NEXT_RUNTIME === 'edge') init(opts);
};

/**
 * Errors from Nested React Server Components
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#errors-from-nested-react-server-components
 */
export const onRequestError = captureRequestError;
