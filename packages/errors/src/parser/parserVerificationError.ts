import { ParserError } from './base';

/**
 * Error thrown during resume verification operations
 */
export class ParserVerificationError extends ParserError {
  name = 'ParserVerificationError' as const;

  constructor(
    message: string,
    public issues: string[],
  ) {
    super(message);
  }
}
