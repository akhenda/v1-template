# @repo/errors

This package provides a centralized and extensible error handling system for the monorepo. It includes a set of standardized error classes, a central error registry, and shared utilities to ensure consistent error management across all applications and packages.

## Features

- **Centralized Error Registry**: A single source of truth for all error types and their corresponding HTTP status codes.
- **Standardized Error Classes**: A set of pre-defined error classes for common HTTP and domain-specific scenarios.
- **Shared Utilities**: Reusable functions for creating type guards and assertion functions, reducing code duplication.
- **Type-Safe**: Built with TypeScript to ensure type safety and autocompletion.
- **Extensible**: Easily extendable with new custom error types.

## Architecture

The error system is designed with a clear and consistent hierarchy:

1. **`ErrorBase`**: An abstract base class that all other errors extend from. It captures the stack trace and provides a common foundation.
2. **`RequestError`**: An abstract class for all HTTP-related errors, extending `ErrorBase`. It introduces an abstract `code` property for HTTP status codes.
3. **Concrete Error Classes**: Specific error classes like `NotFoundError`, `BadRequestError`, etc., which extend `RequestError`.
4. **`ATSError`**: An abstract class for domain-specific errors related to the ATS (Applicant Tracking System), also extending `ErrorBase`.
5. **`ERROR_REGISTRY`**: A central registry that maps error names to their HTTP status codes, ensuring consistency.

## Available Errors

### Request Errors

These errors correspond to standard HTTP status codes and are located in `src/requests/`.

| Error Class              | Status Code | Description                                      |
| ------------------------ | ----------- | ------------------------------------------------ |
| `NotFoundError`          | 404         | The requested resource could not be found.       |
| `BadRequestError`        | 400         | The server cannot process the request due to a client error. |
| `UnauthorizedError`      | 401         | Authentication is required and has failed.       |
| `ForbiddenError`         | 403         | The client does not have permission to access the resource. |
| `ConflictError`          | 409         | The request could not be completed due to a conflict. |
| `TooManyRequestsError`   | 429         | The user has sent too many requests in a given amount of time. |
| `InternalServerError`    | 500         | An unexpected condition was encountered on the server. |
| `RequestTimeoutError`    | 408         | The server did not receive a complete request message in time. |

### ATS Errors

These are domain-specific errors related to the Applicant Tracking System, located in `src/ats/`.

| Error Class                        | Description                                     |
| ---------------------------------- | ----------------------------------------------- |
| `ATSError`                         | Base class for all ATS-related errors.          |
| `InvalidATSJSONPointerError`       | Indicates an invalid JSON pointer was used.     |
| `InvalidATSSuggestionValueError`   | The value provided for a suggestion is invalid. |

## Usage

All errors and utilities are exported from the root of the package.

### Basic Instantiation

You can instantiate an error just like any other class:

```typescript
import { NotFoundError } from '@repo/errors';

throw new NotFoundError('The resource you were looking for could not be found.');
```

### Type Guards

Each error class comes with a type guard to help you identify it in `try...catch` blocks:

```typescript
import { NotFoundError, isNotFoundError } from '@repo/errors';

try {
  // some code that might throw
} catch (error: unknown) {
  if (isNotFoundError(error)) {
    console.error('Caught a NotFoundError:', error.message);
  }
}
```

### Assertion Functions

Assertion functions are provided to reduce boilerplate when checking for conditions:

```typescript
import { assertFound } from '@repo/errors';

function findUser(id: string) {
  const user = db.users.find(id);
  assertFound(user, `User with ID ${id} not found.`);
  return user; // user is now guaranteed to be non-null
}
```

You can also include a `cause` for better debugging:

```typescript
import { assertInternalServerError } from '@repo/errors';

try {
  // some third-party call
} catch (cause: unknown) {
  assertInternalServerError(false, 'Failed to process data.', { cause });
}
```

## Creating Custom Errors

To create a new error type, follow these steps:

1. **Define the Error Class**: Create a new class that extends `RequestError` or `ATSError`.

    ```typescript
    // src/requests/my-custom-error.ts
    import { RequestError } from './base';

    export class MyCustomError extends RequestError {
      readonly name = 'MyCustomError';
      readonly code = 418; // I'm a teapot
    }
    ```

2. **Generate Utilities**: Use `createErrorUtilities` to generate the helper functions.

    ```typescript
    import { createErrorUtilities } from '../utils';

    export const { is, assert, assertSimple } = createErrorUtilities(MyCustomError);
    ```

3. **Add to Registry**: Register the new error in `src/registry.ts`.

    ```typescript
    export const ERROR_REGISTRY = {
      // ...
      MyCustomError: { code: 418 },
    } as const;
    ```

4. **Export**: Export the new error and its utilities from the main `index.ts` files.

## Testing

This package uses `vitest` for testing. To run the tests:

```bash
bun run test --filter=@repo/errors
```

The test suite is designed to be comprehensive, covering the registry, utilities, and each error class to ensure reliability.
