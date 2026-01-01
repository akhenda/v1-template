import { ParserError } from './base';

/**
 * Error thrown during resume parsing operations
 */
export class ParsingError extends ParserError {
  name = 'ParsingError' as const;
  cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;
  }
}
