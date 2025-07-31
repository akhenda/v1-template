import { describe, expect, it } from 'vitest';

import { ParsingError } from './parsingError';

describe('ParsingError', () => {
  it('should create an error with the correct name and message', () => {
    const error = new ParsingError('Test parsing error');

    expect(error.name).toBe('ParsingError');
    expect(error.message).toBe('Test parsing error');
    expect(error instanceof Error).toBe(true);
    expect(error.cause).toBeUndefined();
  });

  it('should store cause information when provided', () => {
    const cause = new Error('Original error');
    const error = new ParsingError('Test parsing error', cause);

    expect(error.name).toBe('ParsingError');
    expect(error.message).toBe('Test parsing error');
    expect(error.cause).toBe(cause);
  });

  it('should be an instance of Error', () => {
    const error = new ParsingError('Test error');

    expect(error instanceof Error).toBe(true);
    expect(error instanceof ParsingError).toBe(true);
  });
});
