# CLAUDE.md - v1-template AI Configuration

This file provides context and rules for AI assistants working with this codebase.

## 🎯 Project Overview

**v1-template** is a production-ready full-stack SaaS template built on:
- **Turborepo** monorepo structure
- **Next.js 14** with TypeScript
- **Convex** real-time backend
- **Clerk** for authentication
- **Polar.sh** for payments
- **PostgreSQL** with Drizzle ORM
- **shadcn/ui** for components

## 🔧 Development Setup

### Required Tools
- **Bun** - Package manager and runtime (use instead of npm/yarn)
- **Node.js 18+** - Required for native tools
- **PostgreSQL** - Database (Neon recommended for dev)

### Essential Commands
```bash
# Development
bun dev           # Start all services
bun lint          # Check code quality
bun typecheck     # Check TypeScript
bun test          # Run tests
bun build         # Build all apps

# Database
bun db:push       # Push schema changes
bun db:seed       # Seed with sample data
bun db:studio     # Database management UI

# Convex backend
bun convex dev    # Start convex dev server
bun convex deploy # Deploy to production

# Individual apps
bun dev:web       # Marketing site (3001)
bun dev:app       # Dashboard app (3000)
bun dev:api       # API server (3002)
bun dev:docs      # Documentation (3004)
```

## 📁 Repository Structure

```
v1-template/
├── apps/
│   ├── api/                 # Serverless functions & webhooks
│   ├── app/                 # Main dashboard application
│   ├── web/                 # Marketing website
│   ├── docs/                # Documentation site
│   ├── storybook/           # Component documentation
│   └── studio/              # Database admin interface
├── packages/
│   ├── ai/                  # AI integrations and agents
│   ├── auth/                # Clerk authentication
│   ├── convex/              # Backend queries/mutations
│   ├── database/            # Drizzle schema & helpers
│   ├── design-system/       # shadcn/ui + custom components
│   ├── payments/            # Polar.sh integration
│   ├── errors/              # Standardized error handling
│   ├── notifications/       # Knock notifications
│   ├── analytics/           # PostHog & GA integration
│   └── [shared packages]    # Reusable utilities
└── .kiro/                   # Kiro IDE configuration
```

## 🎯 AI Development Guidelines

### ✅ Always Use These Patterns

#### 1. **Environment Variables**
Use `@t3-oss/env-nextjs` for type-safe env variables:
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

#### 2. **Import Order** (Follow exactly)
```typescript
// 1. URL imports
// 2. Node.js built-ins (with node: prefix)
// 3. Bun runtime
// 4. React ecosystem
// 5. Next.js ecosystem  
// 6. Convex ecosystem
// 7. External packages
// 8. Workspace packages
// 9. Internal aliases (@/)
// 10. Relative imports
// 11. CSS imports
```

#### 3. **Logging (Never console.log)**
```typescript
// ❌ Never do this:
console.log('Debug message');

// ✅ Always use:
import { logger } from '@repo/observability/logger';
logger.info('Debug message', { userId: '123' });
```

#### 4. **Type Safety**
```typescript
// ❌ Never use any:
const data: any = someFunction();

// ✅ Use our AnyValue type:
import type { AnyValue } from '@repo/types';
const data: AnyValue = someFunction();
```

#### 5. **String Templates**
```typescript
// ❌ Never use string concatenation:
const url = baseUrl + '/api/' + version + '/users';

// ✅ Always use template literals:
const url = `${baseUrl}/api/${version}/users`;
```

#### 6. **Error Handling**
```typescript
// ✅ Use our standardized error types:
import { AppError } from '@repo/errors';

try {
  // ... code
} catch (error) {
  logger.error('Operation failed', { error, context: { userId } });
  throw new AppError('Failed to process', { cause: error });
}
```

## 🚫 Never Do These

- **No console.log()** - Use @repo/observability/logger
- **No any types** - Use @repo/types#AnyValue
- **No string concatenation** - Use template literals
- **No isNaN()** - Use Number.isNaN()
- **No unsafe property access** - Use optional chaining
- **No nested try-catch without proper logging**

## 🎯 Convex Backend Guidelines

### Schema Definition
```typescript
// Use proper Convex schema definition
import { v } from 'convex/values';

export const User = v.object({
  email: v.string(),
  createdAt: v.number(),
  subscription: v.optional(
    v.object({
      status: v.string(),
      productId: v.id('products'),
    })
  ),
});
```

### Queries & Mutations
```typescript
// Always use proper typing
export const listUsers = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('status'), 'active'))
      .take(args.limit);
  },
});
```

### Webhooks
All webhooks are handled in `/packages/convex/convex/`:
- `/webhooks/clerk/users` - User lifecycle events
- `/webhooks/polar/events` - Payment & subscription events

## 🎯 Database Guidelines

### Drizzle Schema
```typescript
// Use consistent naming and types
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
bun db:push

# Run in production
bun db:migrate
```

## 🎯 Styling Guidelines

### Tailwind Patterns
```typescript
// Use cn() utility for conditional classes
import { cn } from '@repo/design-system/lib/utils';

const buttonClass = cn(
  'btn inline-flex items-center justify-center rounded-md',
  variant === 'primary' && 'bg-blue-600 text-white',
  variant === 'secondary' && 'bg-gray-200 text-gray-900',
  size === 'sm' && 'px-3 py-1.5 text-sm',
  size === 'lg' && 'px-6 py-3 text-lg',
);
```

### Component Structure
```typescript
// Follow shadcn/ui patterns
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('base-classes', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Component.displayName = 'Component';
```

## 🎯 Testing Guidelines

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
vi.mock('@repo/convex/client', () => ({
  convexClient: {
    query: vi.fn(),
    mutation: vi.fn(),
  },
}));
```

## 🎯 Deployment Guidelines

### Environment Variables by Environment

#### Development
```bash
# Core services
DATABASE_URL=postgresql://localhost:5432/v1_template_dev
NEXT_PUBLIC_CONVEX_URL=https://dev-xxx.convex.cloud
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Payments
POLAR_ACCESS_TOKEN=test_... (must have all read/write scopes for checkouts, customers, products, and subscriptions)
POLAR_ORGANIZATION_ID=test_...
POLAR_WEBHOOK_SECRET=whsec_test...

# Webhooks (dev)
NEXT_PUBLIC_CONVEX_SITE_URL=https://dev-xxx.convex.site
```

#### Production
```bash
# Update all URLs to production domains
DATABASE_URL=production_database_url
NEXT_PUBLIC_CONVEX_URL=https://prod-xxx.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://prod-xxx.convex.site
```

### Webhook Configuration

#### Clerk Webhooks
- **URL**: `https://[CONVEX_SITE_URL]/webhooks/clerk/users`
- **Events**: `user.created`, `user.deleted`, `user.updated`
- **JWT Template**: Must include "metadata" claim: `"{{user.public_metadata}}"`

#### Polar Webhooks  
- **URL**: `https://[CONVEX_SITE_URL]/webhooks/polar/events`
- **Events**: `subscription.created`, `subscription.updated`, `product.created`, `product.updated`

## 🎯 Common Tasks

### Adding a New Package
```bash
# Create new package
cd packages
mkdir new-package
cd new-package
bun init

# Add to workspace
# Update package.json name: @repo/new-package
# Import using: import { thing } from '@repo/new-package';
```

### Creating a New Route
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
// In packages/database/src/schema/
export const newTable = pgTable('new_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Always create migration
bun db:generate
```

## 🎯 AI Assistant Best Practices

When generating code:

1. **Check existing patterns** - Look at neighboring files first
2. **Follow file naming** - camelCase for utils, kebab-case for comps
3. **Use established utilities** - Check @repo packages before rolling own
4. **Test immediately** - Write basic tests for new functions
5. **Check conventions** - Environment variables, imports, exports

### Before Contributing
```bash
# Always run these before starting work
bun lint           # Should pass without errors
bun typecheck      # Should pass without errors
bun test           # Should pass with existing tests
```

### File Naming Conventions
- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `validateSchema.ts`)
- **API Routes**: `kebab-case.ts` (e.g., `get-users.ts`)
- **Folders**: `kebab-case` (e.g., `user-management`)

## 🔗 Quick Resources

- **Convex**: https://docs.convex.dev
- **Clerk**: https://clerk.com/docs
- **Polar**: https://docs.polar.sh
- **Tailwind**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com/docs
- **Drizzle**: https://orm.drizzle.team/docs

## 🆘 Common Issues

**"Convex not connecting"**
- Check NEXT_PUBLIC_CONVEX_URL matches your deployment
- Verify CONVEX_DEPLOYMENT is set correctly  
- Run `bun convex dev` to sync schema

**"TypeScript errors"**
- Run `bun typecheck` to see specific errors
- Check import paths vs build config
- Verify type definitions from @repo/types

**"Linting failures"**
- Use `bun lint:fix --unsafe` for auto-fixes
- Check for console.log and any types in new code
- Ensure proper import ordering

This CLAUDE.md is optimized for AI-assisted development in this specific codebase. Follow these guidelines to maintain consistency and leverage the full potential of the AI-powered development experience.