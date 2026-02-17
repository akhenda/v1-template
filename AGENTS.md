# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

> **Note**: `AGENTS.md` is the source of truth for AI assistant instructions in this project.
> All `CLAUDE.md` files are symlinks pointing to their corresponding `AGENTS.md` files.
> When updating instructions, always edit `AGENTS.md` directly, not the symlinks.

## Project Overview

**v1-template** is a production-ready full-stack SaaS template using:

- **Turborepo 2.7** monorepo with Bun package manager
- **Next.js 16** with **React 19** and TypeScript
- **Convex** real-time backend for queries/mutations
- **Clerk** authentication with JWT templates for Convex
- **Polar.sh** for payments/subscriptions
- **PostgreSQL** with Drizzle ORM (Neon recommended)
- **Biome** for linting/formatting (not ESLint/Prettier)
- **Vitest** for testing

## Essential Commands

```bash
# Development
bun dev                    # Start all services in parallel
bun --filter app dev       # Dashboard only (localhost:3000)
bun --filter web dev       # Marketing site only (localhost:3001)
bun --filter api dev       # API server only (localhost:3002)
bun --filter docs dev      # Documentation only (localhost:3004)

# Code Quality
bun lint                   # Lint with Biome + sherif
bun typecheck              # TypeScript check
bun test                   # Run tests with Vitest
bun test:run               # Run tests once (no watch)

# Database (Drizzle)
bun db:generate            # Generate migration from schema
bun db:migrate             # Run migrations
bun --filter @repo/database run db:studio  # Database GUI

# Convex Backend
bun --filter @repo/backend run dev     # Start Convex dev server
bun --filter @repo/backend run setup   # Initial setup
bun --filter @repo/backend run seed    # Seed data

# Build
bun build                  # Build all apps
bun --filter app build     # Build specific app
```

## Repository Structure

```text
v1-template/
├── apps/                   # Applications
│   ├── app/                # Main dashboard (Next.js)
│   ├── web/                # Marketing site (Next.js)
│   ├── api/                # API server for webhooks
│   ├── backend/            # Convex backend (convex/ directory)
│   ├── email/              # React Email templates
│   ├── docs/               # Mintlify documentation
│   ├── storybook/          # Component library (localhost:6006)
│   ├── studio/             # Database admin panel
│   └── extension/          # Browser extension
├── packages/
│   ├── modules/            # Domain modules (auth, ai, database, etc.)
│   ├── sdks/               # Platform SDKs
│   │   ├── web/            # Web SDK (core, design, features, assets)
│   │   ├── mobile/         # React Native SDK
│   │   └── extension/      # Extension SDK
│   └── tooling/            # Build tooling (tsconfig, next-config, etc.)
```

## Import Ordering (Biome Enforced)

Biome automatically organizes imports. Follow this order:

1. URL imports (`:URL:`)
2. Node.js built-ins (`:NODE:`)
3. Bun runtime (`:BUN:`)
4. React ecosystem (`react`, `react-*`)
5. React platform (`@react-*`, `rn-*`)
6. Next.js (`next`, `next-*`, `@next/*`)
7. Expo (`expo-*`, `@expo/*`)
8. Convex (`convex`, `convex-*`, `@convex/*`)
9. External packages (no scope)
10. `@udecode/*` (editor packages)
11. `@repo/*` (workspace packages)
12. Path aliases (`@/*`, alias paths)
13. Relative parent imports (`../**`)
14. Relative imports (`./**`)
15. CSS/SCSS imports

## Coding Standards

### Environment Variables

Use `@t3-oss/env-nextjs` for type-safe environment variables:

```typescript
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  },
});
```

### Logging

Never use `console.log`. Use the structured logger:

```typescript
import { logger } from '@repo/observability/logger';

logger.info('Message', { userId: '123' });
logger.error('Error occurred', { error, context: { userId } });
```

### Type Safety

Never use `any`. Use `AnyValue` from `@repo/types`:

```typescript
import type { AnyValue } from '@repo/types';

const data: AnyValue = someFunction();
```

### String Templates

Always use template literals, never string concatenation:

```typescript
// ❌ Never
const url = baseUrl + '/api/' + version + '/users';

// ✅ Always
const url = `${baseUrl}/api/${version}/users`;
```

### Error Handling

Use standardized errors from `@repo/errors`:

```typescript
import { AppError } from '@repo/errors';

try {
  // code
} catch (error) {
  logger.error('Operation failed', { error });
  throw new AppError('Failed to process', { cause: error });
}
```

### Styling

Use `cn()` for conditional Tailwind classes:

```typescript
import { cn } from '@repo/design-system/lib/utils';

const className = cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' && 'primary-class',
);
```

## Never Do These

- **No `console.log()`** - Use `@repo/observability/logger`
- **No `any` types** - Use `@repo/types#AnyValue`
- **No string concatenation** - Use template literals
- **No `isNaN()`** - Use `Number.isNaN()`
- **No unsafe property access** - Use optional chaining (`?.`)
- **No nested try-catch without proper logging**

## Convex Backend Patterns

The Convex backend is in `packages/modules/backend/convex/`.

### Schema Definition

```typescript
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    email: v.string(),
    createdAt: v.number(),
  }),
});
```

### Queries and Mutations

```typescript
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const listUsers = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    return ctx.db.query('users').take(args.limit);
  },
});

export const createUser = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return ctx.db.insert('users', { email: args.email, createdAt: Date.now() });
  },
});
```

### Webhooks

Webhooks are HTTP endpoints in `packages/modules/backend/convex/webhooks/`:

- `/webhooks/clerk/users` - User lifecycle (created, updated, deleted)
- `/webhooks/polar/events` - Subscription events

## Database Patterns (Drizzle)

Schema is in `packages/modules/database/`.

```typescript
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Always export types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
```

### Migrations

```bash
# Generate migration after schema changes
bun db:generate

# Run in development
bun db:migrate
```

## Testing Guidelines

### Test Structure

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('UserService', () => {
  it('should create user successfully', async () => {
    // Arrange
    const mockData = { email: 'test@example.com' };

    // Act
    const result = await createUser(mockData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.user.email).toBe(mockData.email);
  });
});
```

### Mocking Patterns

```typescript
// Use proper mocking for external dependencies
vi.mock('@repo/backend/client', () => ({
  convexClient: {
    query: vi.fn(),
    mutation: vi.fn(),
  },
}));
```

## Webhook Configuration

### Clerk Webhooks

- **URL**: `https://[CONVEX_SITE_URL]/webhooks/clerk/users`
- **Events**: `user.created`, `user.updated`, `user.deleted`
- **JWT Template**: Must include `metadata` claim with value `{{user.public_metadata}}`

### Polar Webhooks

- **URL**: `https://[CONVEX_SITE_URL]/webhooks/polar/events`
- **Events**: `subscription.created`, `subscription.updated`, `product.created`, `product.updated`

## Common Tasks

### Adding a New Package

```bash
# Create new package in packages/modules/
cd packages/modules
mkdir new-package
cd new-package
bun init

# Update package.json name to: @repo/new-package
# Import using: import { thing } from '@repo/new-package';
```

### Creating a New API Route

```typescript
// In apps/[app]/app/api/new-route/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@repo/auth/server';
import { db } from '@repo/database';
import { logger } from '@repo/observability/logger';

export async function POST(request: NextRequest) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    // ... processing logic

    logger.info('Created new resource', { userId: user.id, resourceId: result.id });
    return NextResponse.json(result);
  } catch (error) {
    logger.error('Failed to create resource', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Adding Database Schema

```typescript
// In packages/modules/database/src/schema/
export const newTable = pgTable('new_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Always generate migration
bun db:generate
```

## Before Committing

Run these commands before submitting changes:

```bash
bun lint           # Must pass
bun typecheck      # Must pass
bun test           # Must pass
```

## File Naming

- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `validateSchema.ts`)
- **API Routes**: `kebab-case.ts` (e.g., `get-users.ts`)
- **Directories**: `kebab-case` (e.g., `user-management`)

## Key Package Imports

```typescript
// Authentication
import { auth, currentUser } from '@repo/auth';

// Database (Drizzle)
import { db } from '@repo/database';
import { users } from '@repo/database/schema';

// Convex
import { api } from '@repo/backend/api';

// UI Components
import { Button } from '@repo/design-system/components/ui/button';

// Logger
import { logger } from '@repo/observability/logger';

// Types
import type { AnyValue } from '@repo/types';

// Errors
import { AppError } from '@repo/errors';
```

## Common Issues

### Convex not connecting

- Check `NEXT_PUBLIC_CONVEX_URL` matches your deployment
- Verify `CONVEX_DEPLOYMENT` is set correctly
- Run `bun --filter @repo/backend run dev` to sync schema

### TypeScript errors

- Run `bun typecheck` to see specific errors
- Check import paths vs build config
- Verify type definitions from `@repo/types`

### Linting failures

- Run `bun fix` or `npx ultracite@latest fix` for auto-fixes
- Check for `console.log` and `any` types in new code
- Ensure proper import ordering
