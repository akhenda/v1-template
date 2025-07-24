import { describe, expect, it } from 'vitest';

import { ERROR_REGISTRY, getErrorCode } from './registry';
import { createErrorUtilities } from './utils';

// Test Error classes
class TestError extends Error {}
class AnotherTestError extends Error {}

describe('Error Registry', () => {
  it('should have a comprehensive list of error codes', () => {
    expect(ERROR_REGISTRY).toMatchSnapshot();
  });

  it('should return the correct error code for a given error name', () => {
    expect(getErrorCode('NotFoundError')).toBe(404);
    expect(getErrorCode('BadRequestError')).toBe(400);
    expect(getErrorCode('InvalidATSJSONPointerError')).toBe(400);
    expect(getErrorCode('ATSError')).toBe(500);
  });
});

describe('Shared Error Utilities', () => {
  const { is, assert, assertSimple, isInstance } = createErrorUtilities(TestError);

  it('should create a working type guard', () => {
    const err = new TestError('test error');
    expect(is(err)).toBe(true);
    expect(is(new AnotherTestError('another error'))).toBe(false);
  });

  it('should create a working assertion function', () => {
    const message = 'Assertion failed';
    expect(() => assert(false, message)).toThrow(new TestError(message));
    expect(() => assert(true, message)).not.toThrow();
  });

  it('should create an assertion function that includes cause', () => {
    const cause = new Error('root cause');
    try {
      // @ts-ignore: Testing with a cause
      assert(false, 'with cause', cause);
    } catch (e: unknown) {
      expect((e as TestError).cause).toBe(cause);
    }
  });

  it('should create a simple assertion function', () => {
    expect(() => assertSimple(false, 'Simple assertion')).toThrow(
      new TestError('Simple assertion'),
    );
    expect(() => assertSimple(true, 'Simple assertion')).not.toThrow();
  });

  it('should create a working instance checker', () => {
    const err = new TestError('test error');
    expect(isInstance(err)).toBe(true);
    expect(isInstance(new AnotherTestError('another error'))).toBe(false);
  });
});
