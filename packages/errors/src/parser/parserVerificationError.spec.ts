import { describe, expect, it } from 'vitest';

import { ParserVerificationError } from './parserVerificationError';

describe('ParserVerificationError', () => {
  it('should create an error with the correct name, message, and issues', () => {
    const issues = ['Issue 1', 'Issue 2'];
    const error = new ParserVerificationError('Test verification error', issues);

    expect(error.name).toBe('ParserVerificationError');
    expect(error.message).toBe('Test verification error');
    expect(error.issues).toEqual(issues);
    expect(error instanceof Error).toBe(true);
  });

  it('should handle empty issues array', () => {
    const error = new ParserVerificationError('Test error', []);

    expect(error.name).toBe('ParserVerificationError');
    expect(error.message).toBe('Test error');
    expect(error.issues).toEqual([]);
  });

  it('should be an instance of Error', () => {
    const error = new ParserVerificationError('Test error', ['issue']);

    expect(error instanceof Error).toBe(true);
    expect(error instanceof ParserVerificationError).toBe(true);
  });
});
