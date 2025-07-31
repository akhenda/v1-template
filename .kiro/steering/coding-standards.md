# Coding Standards & Best Practices

This document outlines the coding standards, conventions, and best practices that must be followed when working in this codebase. These rules ensure consistency, maintainability, and quality across the entire project.

## 🚫 Prohibited Practices

### Console Logging

**❌ DO NOT USE:**

```typescript
console.log('Debug message');
console.warn('Warning message');
console.error('Error message');
console.info('Info message');
```

**✅ USE INSTEAD:**

```typescript
import { logger } from '@repo/observability/logger';

logger.info('Debug message');
logger.warn('Warning message');
logger.error('Error message');
logger.debug('Debug message');
```

**Exception:** Only use console logging in rare situations where importing our custom logger is not possible (e.g., build scripts, configuration files where imports are restricted).

### TypeScript Any Type

**❌ DO NOT USE:**

```typescript
const data: any = someFunction();
const result: any[] = [];
function process(input: any): any {}
```

**✅ USE INSTEAD:**

```typescript
import type { AnyValue } from '@repo/types';

const data: AnyValue = someFunction();
const result: AnyValue[] = [];
function process(input: AnyValue): AnyValue {}
```

**Rationale:** `AnyValue` provides better type safety and is our standardized approach for handling unknown types.

### String Concatenation

**❌ DO NOT USE:**

```typescript
const message = 'Hello ' + name + ', welcome to ' + appName;
const url = baseUrl + '/api/' + version + '/users/' + userId;
```

**✅ USE INSTEAD:**

```typescript
const message = `Hello ${name}, welcome to ${appName}`;
const url = `${baseUrl}/api/${version}/users/${userId}`;
```

**Rationale:** Template literals are more readable, maintainable, and less error-prone.

### Unsafe Property Access

**❌ DO NOT USE:**

```typescript
if (result && result.suggestions && result.suggestions.length > 0) {
  // Process suggestions
}

const value = data && data.user && data.user.profile && data.user.profile.name;
```

**✅ USE INSTEAD:**

```typescript
if (result?.suggestions && result.suggestions.length > 0) {
  // Process suggestions
}

const value = data?.user?.profile?.name;
```

**Rationale:** Optional chaining is safer, more concise, and handles null/undefined values gracefully.

### Unsafe Number Checking

**❌ DO NOT USE:**

```typescript
if (isNaN(value)) {
  // Handle invalid number
}
```

**✅ USE INSTEAD:**

```typescript
if (Number.isNaN(value)) {
  // Handle invalid number
}
```

**Rationale:** `isNaN` performs type coercion which can lead to unexpected results. `Number.isNaN` is safer and more predictable.

## ✅ Required Practices

### Import Organization

Follow the established import order as defined in Biome configuration:

```typescript
// 1. URL imports
import 'https://example.com/module';

// 2. Node.js built-ins (with node: protocol)
import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

// 3. Bun runtime
import { serve } from 'bun';

// 4. React ecosystem
import React from 'react';
import { useState } from 'react';

// 5. Next.js ecosystem
import { NextRequest } from 'next/server';

// 6. Convex ecosystem
import { query } from 'convex/server';

// 7. External packages
import { z } from 'zod';
import { clsx } from 'clsx';

// 8. Workspace packages
import { logger } from '@repo/observability/logger';
import type { AnyValue } from '@repo/types';

// 9. Internal aliases
import { validateSchema } from '@/utils/validation';

// 10. Relative imports
import { helper } from '../utils/helper';
import { Component } from './Component';

// 11. CSS imports
import './styles.css';
```

### Error Handling

**✅ PREFERRED PATTERNS:**

```typescript
// Use proper error types from @repo/errors
import { ParserError, ParserVerificationError } from '@repo/errors';

// Throw meaningful errors with specific types
throw new ParserError('Invalid resume format', originalError);
throw new ParserVerificationError('Validation failed', ['Missing required field']);

// Handle errors gracefully
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  logger.error('Operation failed', { error, context: additionalInfo });
  throw new ParserError('Operation failed', error instanceof Error ? error : undefined);
}
```

**🔧 MANDATORY: New Feature Error Creation Process**

When implementing new features that require custom errors:

1. **Create errors in `@repo/errors` package first**
   - Follow the directory structure pattern (e.g., `packages/errors/src/parser/`)
   - Create a base error class and specific error classes
   - Include proper TypeScript typing with const assertions

2. **Write comprehensive tests**
   - Create `.spec.ts` files alongside error definitions
   - Test error instantiation, inheritance, and properties
   - Ensure 100% test coverage for error classes

3. **Update the error registry**
   - Add new error types to `packages/errors/src/registry.ts`
   - Include appropriate HTTP status codes
   - Update type definitions

4. **Export from main index**
   - Add exports to `packages/errors/src/index.ts`
   - Ensure errors are available for import across the codebase

**Example Structure:**

```txt
packages/errors/src/
├── feature-name/
│   ├── base.ts                    # Base error class
│   ├── specificError.ts           # Specific error implementations
│   ├── specificError.spec.ts      # Tests for each error
│   └── index.ts                   # Feature exports
├── registry.ts                    # Updated with new errors
└── index.ts                       # Updated with feature export
```

### Type Safety

**✅ PREFERRED PATTERNS:**

```typescript
// Use strict typing
interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences?: UserPreferences;
}

// Use type guards
function isValidUser(user: AnyValue): user is UserProfile {
  return typeof user === 'object' &&
         user !== null &&
         typeof user.id === 'string' &&
         typeof user.name === 'string';
}

// Use discriminated unions for complex types
type APIResponse =
  | { success: true; data: AnyValue }
  | { success: false; error: string };
```

### Function and Variable Naming

**✅ PREFERRED PATTERNS:**

```typescript
// Use descriptive names
const userAuthenticationToken = generateToken();
const isUserAuthenticated = checkAuthStatus();

// Use verb-noun pattern for functions
function validateUserInput(input: AnyValue): boolean {}
function transformResumeData(resume: Resume): ProcessedResume {}
function calculateATSScore(resume: Resume): number {}

// Use boolean prefixes for boolean variables/functions
const isLoading = true;
const hasPermission = checkUserPermission();
const canEdit = user.role === 'admin';
```

### Async/Await Usage

**✅ PREFERRED PATTERNS:**

```typescript
// Use async/await over Promises
async function processResume(resume: Resume): Promise<ProcessedResume> {
  try {
    const validated = await validateResume(resume);
    const scored = await calculateScore(validated);
    const optimized = await optimizeForATS(scored);
    return optimized;
  } catch (error) {
    logger.error('Resume processing failed', { error, resumeId: resume.id });
    throw new AppError('Failed to process resume', { cause: error });
  }
}

// Handle concurrent operations properly
const [userProfile, userPreferences, userHistory] = await Promise.all([
  fetchUserProfile(userId),
  fetchUserPreferences(userId),
  fetchUserHistory(userId),
]);
```

## 🧪 Testing Standards

### ⚠️ CRITICAL: Test Runner Command

**ALWAYS use `bun run test` - NEVER use `bun test`**

This is the most important rule for testing in this codebase:

- ✅ **`bun run test`**: Runs Vitest via package.json script with full mocking support
- ❌ **`bun test`**: Runs Bun's native test runner, which lacks Vitest mocking features

**Why this matters:**

- Using `bun test` will cause all Vitest mocking features to be undefined (`vi.mock`, `vi.hoisted`, etc.)
- Tests that rely on mocking will fail with cryptic errors
- This was the root cause of the "enable-skipped-tests" project issues

**Examples:**

```bash
# ✅ Correct - runs Vitest with full mocking support
bun run test
bun run test --run path/to/test.ts
bun run test:ui
bun run test:coverage

# ❌ Wrong - runs Bun's native test runner
bun test
bun test path/to/test.ts
```

### Test Structure

```typescript
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { logger } from '@repo/observability/logger';

describe('Component/Function Name', () => {
  beforeEach(() => {
    // Setup code
  });

  afterEach(() => {
    // Cleanup code
  });

  describe('specific functionality', () => {
    it('should handle expected behavior', () => {
      // Arrange
      const input = createTestInput();

      // Act
      const result = functionUnderTest(input);

      // Assert
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it('should handle error cases gracefully', () => {
      // Test error scenarios
      expect(() => functionUnderTest(invalidInput)).toThrow();
    });
  });
});
```

### Test Naming

- Use descriptive test names that explain the expected behavior
- Follow the pattern: "should [expected behavior] when [condition]"
- Group related tests using nested `describe` blocks

## 📝 Documentation Standards

### Code Comments

```typescript
/**
 * Calculates the ATS compatibility score for a resume
 *
 * @param resume - The resume object to analyze
 * @param jobDescription - Optional job description for targeted analysis
 * @returns Promise resolving to score object with breakdown by category
 *
 * @throws {ValidationError} When resume format is invalid
 * @throws {ProcessingError} When AI analysis fails
 *
 * @example
 * ```typescript
 * const score = await calculateATSScore(resume, jobDescription);
 * console.log(`Overall score: ${score.total}/100`);
 * ```
 */
async function calculateATSScore(
  resume: Resume,
  jobDescription?: string
): Promise<ATSScore> {
  // Implementation
}
```

### README Files

- Every package should have a comprehensive README.md
- Include purpose, installation, usage examples, and API documentation
- Keep documentation up-to-date with code changes

## 🔧 Configuration Standards

### Environment Variables

```typescript
// Use @t3-oss/env-nextjs for type-safe environment variables
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string().min(1),
    DATABASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
```

## 🚀 Performance Standards

### Optimization Guidelines

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <div>{/* Expensive rendering */}</div>;
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return performExpensiveCalculation(data);
}, [data]);

// Use useCallback for event handlers
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);
```

### Bundle Size Considerations

- Use dynamic imports for code splitting
- Avoid importing entire libraries when only specific functions are needed
- Use tree-shaking friendly imports

## 🔒 Security Standards

### Input Validation

```typescript
// Always validate external input
import { z } from 'zod';

const UserInputSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
});

function processUserInput(input: AnyValue) {
  const validated = UserInputSchema.parse(input);
  // Process validated input
}
```

### Sensitive Data Handling

- Never log sensitive information (passwords, tokens, personal data)
- Use environment variables for secrets
- Sanitize user input before processing

## 📋 Code Review Checklist

Before submitting code for review, ensure:

- [ ] **CRITICAL**: Used `bun run test` (NOT `bun test`) for running tests
- [ ] No console.log statements (use logger instead)
- [ ] No `any` types (use `AnyValue` instead)
- [ ] Template literals used instead of string concatenation
- [ ] Optional chaining used for safe property access
- [ ] `Number.isNaN` used instead of `isNaN`
- [ ] Proper error handling with meaningful error messages
- [ ] Type safety maintained throughout
- [ ] Tests written for new functionality
- [ ] Documentation updated if needed
- [ ] Import order follows established conventions
- [ ] No linting errors or warnings

## 🛠 Tools and Automation

### Linting and Formatting

- **Biome**: Primary tool for linting and formatting
- **TypeScript**: Strict mode enabled for type checking
- **Husky**: Pre-commit hooks for quality checks

### Recommended VS Code Extensions

- Biome (official)
- TypeScript Importer
- Error Lens
- GitLens

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vitest Testing Guide](https://vitest.dev/guide/)

---

**Remember**: These standards exist to maintain code quality, consistency, and developer experience. When in doubt, prioritize readability, maintainability, and type safety.

## Linting and Code Quality Enforcement

### ✅ MANDATORY RULE: Zero Linting Errors Policy

**All code MUST pass linting checks before being committed or considered complete.**

- **Before any commit**: Run `bun lint` to check for issues
- **Before any pull request**: Ensure `bun lint` returns no errors
- **During development**: Fix linting issues immediately as they appear
- **For auto-fixable issues**: Use `bun lint:fix` to automatically resolve them
- **For complex issues**: Use `bun lint:fix --unsafe` for additional auto-fixes (review changes carefully)

### Linting Commands

```bash
# Check for linting issues (all files)
bun lint

# Check specific files only (RECOMMENDED for development)
bun lint path/to/file1.ts path/to/file2.ts

# Auto-fix safe linting issues (all files)
bun lint:fix

# Auto-fix specific files only (RECOMMENDED for development)
bun lint:fix path/to/file1.ts path/to/file2.ts

# Auto-fix all possible linting issues (review changes)
bun lint:fix --unsafe

# Auto-fix specific files with unsafe fixes
bun lint:fix --unsafe path/to/file1.ts path/to/file2.ts

# Check with more detailed output
bun lint --max-diagnostics=100

# Check only changed files (using git)
bun lint $(git diff --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx|js|jsx)$' | tr '\n' ' ')
```

### Pre-Development Checklist

Before starting any development task:

1. ✅ Run `bun lint` to ensure the codebase is clean
2. ✅ Run `bun typecheck` to ensure no TypeScript errors
3. ✅ Fix any existing linting/TypeScript issues in files you'll be working on
4. ✅ Follow all coding standards outlined in this document
5. ✅ Run `bun lint [files]` and `tsc --noEmit [files]` after making changes
6. ✅ Only consider the task complete when both linting and TypeScript checking pass

### Optimized Development Workflow

**For faster development, always target specific files:**

```bash
# Instead of checking everything (SLOW)
bun lint && bun typecheck

# Check only files you're working on (FAST)
bun lint src/component.ts src/utils.ts
tsc --noEmit src/component.ts src/utils.ts

# Check only changed files (FAST)
bun lint $(git diff --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx|js|jsx)$' | tr '\n' ' ')
tsc --noEmit $(git diff --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx)$' | tr '\n' ' ')
```

### Integration with Development Workflow

- **IDE Setup**: Configure your IDE to show linting errors in real-time
- **Pre-commit Hooks**: Linting checks should be part of the pre-commit process
- **CI/CD**: All builds should fail if linting errors are present
- **Code Reviews**: Reviewers should verify that linting passes

### Common Linting Issues and Solutions

#### Console Usage

```typescript
// ❌ Wrong
console.log('Debug message');

// ✅ Correct
import { logger } from '@repo/observability/logger';
logger.info('Debug message');
```

#### Type Safety

```typescript
// ❌ Wrong
const data: any = someFunction();

// ✅ Correct
import type { AnyValue } from '@repo/types';
const data: AnyValue = someFunction();
```

#### String Concatenation

```typescript
// ❌ Wrong
const message = 'Hello ' + name;

// ✅ Correct
const message = `Hello ${name}`;
```

#### Node.js Imports

```typescript
// ❌ Wrong
import { readFile } from 'fs';

// ✅ Correct
import { readFile } from 'node:fs';
```

## TypeScript Type Checking Enforcement

### ✅ MANDATORY RULE: Zero TypeScript Errors Policy

**All code MUST pass TypeScript type checking before being committed or considered complete.**

- **Before any commit**: Run `bun typecheck` to check for type errors
- **Before any pull request**: Ensure `bun typecheck` returns no errors
- **During development**: Fix TypeScript errors immediately as they appear
- **For specific files**: Use `tsc --noEmit path/to/file.ts` for faster checking

### TypeScript Commands

```bash
# Check TypeScript errors (all files) - SLOW
bun typecheck

# Check specific files only (RECOMMENDED for development) - FAST
tsc --noEmit path/to/file1.ts path/to/file2.ts

# Check only changed files (using git) - FAST
tsc --noEmit $(git diff --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx)$' | tr '\n' ' ')

# Check with project references (if applicable)
tsc --build --dry

# Watch mode for continuous checking during development
tsc --noEmit --watch
```

### TypeScript Integration in Development Workflow

- **IDE Setup**: Configure your IDE to show TypeScript errors in real-time
- **Pre-commit Hooks**: TypeScript checks should be part of the pre-commit process
- **CI/CD**: All builds should fail if TypeScript errors are present
- **Code Reviews**: Reviewers should verify that TypeScript checking passes

### Common TypeScript Issues and Solutions

#### Null/Undefined Safety

```typescript
// ❌ Wrong - might cause runtime errors
const name = user.profile.name;

// ✅ Correct - safe access
const name = user.profile?.name;
const name = user.profile?.name ?? 'Unknown';
```

#### Type Assertions

```typescript
// ❌ Wrong - using 'any'
const data = response as any;

// ✅ Correct - using proper types
import type { AnyValue } from '@repo/types';
const data = response as AnyValue;
```

#### Function Parameters

```typescript
// ❌ Wrong - missing required parameters
validateSuggestion(suggestion);

// ✅ Correct - all required parameters provided
validateSuggestion(suggestion, pointer, resume);
```

### Performance Optimization for TypeScript Checking

**Always prefer checking specific files over the entire project:**

1. **During development**: Only check files you're working on
2. **Before commits**: Check only changed files
3. **In CI/CD**: Full project check is acceptable
4. **For large projects**: Use project references and incremental builds

### Enforcement

**This is a ZERO-TOLERANCE policy for both linting AND TypeScript errors.**

- Code with linting errors will not be accepted
- Code with TypeScript errors will not be accepted
- Tasks are not considered complete until both linting and TypeScript checking pass
- All team members must follow this standard without exception
- Any development work must start with clean linting and TypeScript state and end with clean state

### Quality Checks Integration in Task Workflow

When working on any task or feature:

1. **Before starting**:
   - Verify `bun lint` passes
   - Verify `bun typecheck` passes
2. **During development**:
   - Address linting and TypeScript issues as they appear
   - Use file-specific commands for faster feedback
3. **Before completion**:
   - Run `bun lint [changed-files]` to ensure no linting errors
   - Run `tsc --noEmit [changed-files]` to ensure no TypeScript errors
4. **Task completion criteria**:
   - Zero linting errors is a requirement
   - Zero TypeScript errors is a requirement

### Quick Commands for Development

```bash
# Quick check for files you're working on
FILES="src/component.ts src/utils.ts"
bun lint $FILES && tsc --noEmit $FILES

# Quick check for all changed files
CHANGED_FILES=$(git diff --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx|js|jsx)$' | tr '\n' ' ')
CHANGED_TS_FILES=$(git diff --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx)$' | tr '\n' ' ')
bun lint $CHANGED_FILES && tsc --noEmit $CHANGED_TS_FILES
```

This ensures that the codebase maintains high quality and consistency at all times while keeping development fast and efficient.
