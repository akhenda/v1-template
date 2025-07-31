import { ParserError } from './base';

/**
 * Error thrown during resume parsing operations
 */
export class ParsingError extends ParserError {
  name = 'ParsingError' as const;

  constructor(
    message: string,
    public cause?: Error,
  ) {
    super(message);
  }
}
