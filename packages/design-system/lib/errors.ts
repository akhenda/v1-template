import { toast } from 'sonner';

import { parseError } from '@repo/observability/error';

export function handleError (error: unknown): void {
  const message = parseError(error);

  toast.error(message);
};
