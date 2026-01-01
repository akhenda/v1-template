import { ErrorBase } from '../base';

export type ParserErrorName = 'ParsingError' | 'ParserVerificationError';

export abstract class ParserError extends ErrorBase<ParserErrorName> {}
