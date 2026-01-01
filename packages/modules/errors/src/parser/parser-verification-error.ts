import { ParserError } from './base';

/**
 * Error thrown during resume verification operations
 */
export class ParserVerificationError extends ParserError {
  name = 'ParserVerificationError' as const;
  issues: string[];
  cause?: Error;

  constructor(message: string, issues: string[], cause?: Error) {
    super(message);
    this.issues = issues;
    this.cause = cause;
  }
}
