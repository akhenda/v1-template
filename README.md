# 🚀 v1-template - Full-Stack SaaS Starter Template

A production-ready, battle-tested Turborepo SaaS template built on **next-forge** and customized with Convex backend, authentication, payments, and everything you need to ship fast.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F<YOUR_GITHUB_USERNAME>%2F<YOUR_REPO_NAME>&env=DATABASE_URL,NEXT_PUBLIC_CONVEX_URL,CONVEX_DEPLOYMENT,CLERK_SECRET_KEY,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,RESEND_API_KEY&envDescription=Core%20environment%20variables%20to%20get%20started.%20See%20README%20for%20the%20full%20list.)


⚡ **Features**: Authentication, Payments, Database, AI Integration, Emails, Feature Flags, Analytics, i18n, Collaboration, Real-time updates, and more

## 📁 Repository Structure

```
v1-template/
├── apps/                     # 🏗️ Application-specific code
│   ├── api/                 # Next.js API server (webhooks, serverless functions)
│   ├── app/                 # Main application dashboard
│   ├── backend/             # Convex backend (queries, mutations, webhooks)
│   ├── docs/                # Documentation site (Mintlify)
│   ├── email/               # Email templates (React Email)
│   ├── extension/           # Browser extension
│   ├── storybook/           # Component library documentation
│   ├── studio/              # Database studio/admin panel
│   └── web/                 # Marketing website
├── packages/
│   ├── modules/             # 📦 Domain modules
│   │   ├── ai/              # AI agents and integrations
│   │   ├── auth/            # Authentication providers (Clerk)
│   │   ├── database/        # Database schema and access (Drizzle)
│   │   ├── payments/        # Payment integrations (Polar.sh)
│   │   ├── analytics/       # Analytics tracking (PostHog, GA)
│   │   ├── i18n/            # Internationalization setup
│   │   ├── errors/          # Standardized error handling
│   │   ├── notifications/   # Notification system (Knock)
│   │   ├── storage/         # File storage (UploadThing)
│   │   ├── webhooks/        # Webhook utilities (Svix)
│   │   └── ...
│   ├── sdks/                # 📦 Platform SDKs
│   │   ├── web/             # Web SDK (core, design, features, assets)
│   │   ├── mobile/          # React Native SDK
│   │   └── extension/       # Extension SDK
│   └── tooling/             # 📦 Build tooling (tsconfig, next-config, etc.)
```

## 🛠️ Tech Stack

### Frontend & Backend

- **Next.js 16** - Full-stack React framework
- **React 19** - UI library
- **TypeScript** - Type safety throughout
- **Convex** - Real-time backend and database
- **Clerk** - Authentication & user management
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Primary database

### UI & UX

- **shadcn/ui** - Modern, accessible components
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **React Hook Form** - Form handling

### Integrations

- **Polar.sh** - Payment processing & subscriptions
- **Resend** - Transactional emails
- **PostHog** - Product analytics
- **Liveblocks** - Real-time collaboration
- **Storybook** - Component documentation
- **UploadThing** - File uploads

### Dev & Deployment

- **Turborepo 2.7** - Monorepo build system
- **Bun** - Package manager and runtime
- **Biome** - Code formatting & linting
- **Vitest** - Unit testing
- **Vercel** - Deployment platform
- **GitHub Actions** - CI/CD automation

## 🚀 Quick Start

### Prerequisites

- **Node.js 22+** and **Bun** (Bun is required - enforced via preinstall hook)
- **PostgreSQL** database (Neon recommended)
- **Convex** account
- **Clerk** account
- **Polar.sh** account (for payments)

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd v1-template

# Install dependencies
bun install

# Copy environment files
cp apps/api/.env.example apps/api/.env.local
cp apps/backend/.env.example apps/backend/.env.local
cp apps/app/.env.example apps/app/.env.local
cp apps/web/.env.example apps/web/.env.local
cp apps/studio/.env.example apps/studio/.env.local
cp apps/extension/.env.example apps/extension/.env.local
cp packages/modules/i18n/.env.example packages/modules/i18n/.env.local
cp packages/modules/database/.env.example packages/modules/database/.env
```

### 2. Database Setup

```bash
# Generate database artifacts
bun db:generate

# Run migrations
bun db:migrate
```

### 3. Convex Setup

```bash
# Start Convex backend (this will guide you through setup)
bun --filter @repo/backend run dev

# In a new terminal, run setup
bun --filter @repo/backend run setup

# Seed with sample data (optional)
bun --filter @repo/backend run seed
```

### 4. Start Development

```bash
# Start all services
bun dev

# Or run individual services
bun --filter web dev      # Marketing site - http://localhost:3001
bun --filter app dev      # Dashboard - http://localhost:3000
bun --filter api dev      # API server - http://localhost:3002
bun --filter docs dev     # Documentation - http://localhost:3004
```

## 🔑 Required Environment Variables

This is the **most critical section** - follow carefully to get everything working!

### 📋 Environment Setup Overview

You need accounts with these services:

- 🆔 **Clerk** (Authentication)
- 💳 **Polar.sh** (Payments & Subscriptions)
- 🗄️ **PostgreSQL** (Database - Neon recommended)
- ⚡ **Convex** (Backend)
- 📧 **Resend** (Emails)
- 📊 **PostHog** (Analytics)
- 🔔 **Knock** (Notifications)

### 🆔 Clerk Setup

**1. Create Clerk Application**

- Go to [clerk.com](https://clerk.com) and create an account
- Create a new application
- **Important**: Choose the configuration that matches your needs (email+social auth recommended)

**2. Get Your Keys**

- **CLERK_SECRET_KEY**: Find in Clerk Dashboard → API Keys → Backend API
- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: Find in API Keys → Frontend API
- **CLERK_FRONTEND_API_URL**: Should be like `https://your-app.clerk.accounts.dev`

**3. Configure JWT Template for Convex**

- Go to Clerk Dashboard → Configure → JWT Templates
- Click "Add new template"
- Choose **Convex** as template type
- **CRITICAL STEP**: Add custom session claim:
  - **Key**: `metadata`
  - **Value**: `{{user.public_metadata}}`
- Save the template (this creates the JWT template needed for Convex)

### 💳 Polar.sh Setup

**1. Create Polar Account**

- Go to [polar.sh](https://polar.sh) and sign up
- Create your first organization (this will be your SaaS business)

**2. Configure Products**

- Create subscription products (e.g., "Pro Plan", "Enterprise")
- Set up pricing tiers and billing cycles
- Note down the product IDs for environment variables

**3. Get API Credentials & Scopes**

- **POLAR_ACCESS_TOKEN**: Settings → Developer → Access Tokens. When creating the token, you **must** select the following scopes:
  - `checkout_links:read`
  - `checkout_links:write`
  - `checkouts:read`
  - `checkouts:write`
  - `customer_portal:read`
  - `customer_portal:write`
  - `customer_sessions:write`
  - `customers:read`
  - `customers:write`
  - `products:read`
  - `products:write`
  - `subscriptions:read`
  - `subscriptions:write`
- **POLAR_ORGANIZATION_ID**: Found in organization settings URL
- **POLAR_ORGANIZATION_TOKEN**: Organization settings → Storefront → Advanced

### 🗄️ Database Setup

**Option 1: Neon (Recommended)**

- Go to [neon.tech](https://neon.tech)
- Create a new project
- Copy the connection string to `DATABASE_URL`

**Option 2: Local PostgreSQL**

```bash
# Install PostgreSQL (Mac)
brew install postgresql
brew services start postgresql

# Create database
createdb v1_template_db

# Update packages/modules/database/.env
DATABASE_URL=postgresql://username:password@localhost:5432/v1_template_db
```

### ⚡ Convex Setup

**1. Create Convex Account**

- Visit [convex.dev](https://convex.dev)
- Create account and new project

**2. Get Environment Variables**

- **CONVEX_DEPLOYMENT**: Your project's deployment ID (from dashboard)
- **CONVEX_URL**: Your convex cloud URL
- **NEXT_PUBLIC_CONVEX_URL**: Same as CONVEX_URL for client
- **NEXT_PUBLIC_CONVEX_SITE_URL**: Your convex site URL for webhooks

### 📧 Resend Setup

- Sign up at [resend.com](https://resend.com)
- Create an API key
- **RESEND_API_KEY**: Your API key
- **RESEND_FROM**: Your verified sending email or domain

### 📊 PostHog Setup

- Sign up at [posthog.com](https://posthog.com)
- Create a new project
- **POSTHOG_KEY**: Project API key
- **NEXT_PUBLIC_POSTHOG_KEY**: Same as POSTHOG_KEY
- **POSTHOG_HOST**: Usually `https://eu.i.posthog.com` or `https://us.i.posthog.com`

### 🔔 Knock Setup

- Sign up at [knock.app](https://knock.app)
- **KNOCK_API_KEY**: Your API key (server-side)
- **KNOCK_FEED_CHANNEL_ID**: Your feed channel ID
- **NEXT_PUBLIC_KNOCK_API_KEY**: Client-side API key
- **NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID**: Client-side feed channel

### ✉️ Optional Services

**Analytics & Monitoring**

- **SENTRY_DSN**: Error tracking from [sentry.io](https://sentry.io)

**File Storage**

- **UPLOADTHING_TOKEN**: File uploads via [uploadthing.com](https://uploadthing.com)

**AI Services**

- **OPENAI_API_KEY**: OpenAI integration
- **ANTHROPIC_API_KEY**: Claude integration
- **GEMINI_API_KEY**: Google AI integration

## 🔗 Webhook Configuration

This is **essential** for your SaaS to function correctly with subscriptions and user management.

### 🤖 Clerk Webhooks

**Webhook URL Format**: `https://<YOUR_CONVEX_SITE_URL>/webhooks/clerk/users`

**Required Events**:

- ✅ `user.created`
- ✅ `user.deleted`
- ✅ `user.updated`

### 💰 Polar.sh Webhooks

**Webhook URL Format**: `https://<YOUR_CONVEX_SITE_URL>/webhooks/polar/events`

**Required Events**:

- ✅ `subscription.created`
- ✅ `subscription.updated`
- ✅ `product.created`
- ✅ `product.updated`

## 🏗️ Development Workflow

### Available Commands

```bash
# Development
bun dev                           # Start all services
bun --filter web dev              # Marketing site only
bun --filter app dev              # Dashboard only
bun --filter api dev              # API only
bun --filter docs dev             # Documentation only

# Database
bun db:generate                   # Generate Drizzle artifacts
bun db:migrate                    # Run migrations
bun --filter @repo/database run db:studio  # Open database GUI

# Convex
bun --filter @repo/backend run dev   # Start Convex backend
bun --filter @repo/backend run setup # Initial setup
bun --filter @repo/backend run seed  # Seed data

# Testing
bun test                          # Run all tests
bun test:run                      # Run tests once
bun test:coverage                 # Test with coverage

# Code Quality
bun lint                          # Lint all files (Biome + sherif)
bun typecheck                     # Check TypeScript
bun format                        # Format code with Biome

# Build
bun build                         # Build all apps
bun --filter app build            # Build specific app
```

### Project URLs in Development

| Service | Development URL | Description |
|---------|----------------|-------------|
| **Dashboard** | <http://localhost:3000> | Main app interface |
| **Marketing** | <http://localhost:3001> | Landing pages, pricing, blog |
| **API** | <http://localhost:3002> | Webhooks, serverless functions |
| **Docs** | <http://localhost:3004> | User documentation |
| **Storybook** | <http://localhost:6006> | Component library |

## 🚢 Deployment

### Initial Deployment Checklist

1. **Environment Variables**: Set all production environment variables
2. **Database**: Ensure your production database is migrated
3. **Convex**: Deploy your functions
4. **Webhooks**: Update webhook URLs to production domains
5. **Domains**: Configure your custom domains

### Vercel Deployment

```bash
# Deploy specific apps
vercel deploy apps/web
vercel deploy apps/app
vercel deploy apps/api
```

### Required Production Variables

Ensure these are set in your production environment:

- **Convex**: `CONVEX_DEPLOYMENT`, `CONVEX_URL`, `NEXT_PUBLIC_CONVEX_URL`
- **Clerk**: `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- **Database**: `DATABASE_URL` (production database)
- **Polar**: `POLAR_ACCESS_TOKEN`, `POLAR_ORGANIZATION_ID`
- **Webhooks**: Update all webhook URLs to production domains

## 🔧 Troubleshooting

### Common Issues

**"Convex not connecting"**

- Ensure `NEXT_PUBLIC_CONVEX_URL` matches your deployment
- Check if `CONVEX_DEPLOYMENT` is correctly set
- Run `bun --filter @repo/backend run dev` to sync local environment

**"Clerk authentication not working"**

- Verify your JWT template is configured correctly
- Check webhook endpoints match Convex functions
- Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set

**"Payments not processing"**

- Verify Polar webhook URLs are correct
- Check that webhook events are selected correctly
- Ensure products exist in your Polar organization

**"Database connection issues"**

- Verify `DATABASE_URL` format is correct
- Check if database is accessible from your IP
- For Neon: ensure you're using the pooled connection URL

### Debug Commands

```bash
# Check code quality
bun lint
bun typecheck

# Debug Convex
bun --filter @repo/backend run dev

# Debug database connection
bun --filter @repo/database run db:studio
```

## 📚 Documentation

- **[Convex Documentation](apps/backend/README.md)** - Backend setup and queries
- **[Database Schema](packages/modules/database/README.md)** - Database design and migrations
- **[Design System](packages/sdks/web/design/README.md)** - UI components and usage
- **[AI Features](packages/modules/ai/README.md)** - AI agents and integrations

## 🤝 Contributing

1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Follow commit conventions**: Use conventional commits (`bun gc` or `bun gc-ai`)
3. **Run checks**: `bun lint && bun typecheck && bun test`
4. **Create pull request** with detailed description

## 🤖 AI-Assisted Development

This project is optimized for AI-assisted development with vendor-agnostic instructions.

### AGENTS.md Convention

- `AGENTS.md` files are the **source of truth** for AI assistant instructions
- `CLAUDE.md` files are **symlinks** pointing to their corresponding `AGENTS.md`
- Always edit `AGENTS.md` directly, never edit the symlinks

When creating new subdirectories that need AI-specific instructions:

```bash
# Create AGENTS.md with your instructions
echo "# AGENTS.md" > path/to/AGENTS.md

# Create symlink for Claude Code
ln -s AGENTS.md path/to/CLAUDE.md
```

This convention allows different AI tools to use the same instruction file via their own symlinks.

### Available AI Instruction Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Root project instructions |
| `apps/extension/AGENTS.md` | Browser extension-specific instructions |

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🆘 Need Help?

If you get stuck setting up environment variables or webhooks:

1. **Check the `.env.example` files** in each package
2. **Read service documentation** in the respective packages
3. **Check the error logs** - they're very descriptive
4. **Open an issue** with your setup details and error messages

**Still stuck?** The most common issues are incorrect webhook URLs and missing environment variables. Double-check your configuration against the sections above!
