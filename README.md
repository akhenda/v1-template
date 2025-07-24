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
│   ├── docs/                # Documentation site (Mintlify)
│   ├── email/               # Email templates (React Email)
│   ├── studio/              # Database studio/admin panel
│   ├── storybook/           # Component library documentation
│   └── web/                 # Marketing website
├── packages/                # 📦 Shared libraries and tools
│   ├── ai/                  # AI agents and integrations
│   ├── auth/                # Authentication providers (Clerk)
│   ├── convex/              # Convex backend (queries, mutations, webhooks)
│   ├── database/            # Database schema and access (Drizzle)
│   ├── design-system/       # UI components (shadcn/ui + custom)
│   ├── payments/            # Payment integrations (Polar.sh, Stripe)
│   ├── email/               # Email utilities and templates
│   ├── analytics/           # Analytics tracking (PostHog, GA)
│   ├── i18n/                # Internationalization setup
│   ├── errors/              # Standardized error handling
│   ├── notifications/       # Notification system (Knock)
│   ├── storage/             # File storage (UploadThing)
│   ├── webhooks/            # Webhook utilities (Svix)
│   └── ...
```

## 🛠️ Tech Stack

### Frontend & Backend

- **Next.js 14** - Full-stack React framework
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

- **Turborepo** - Monorepo build system
- **Biome** - Code formatting & linting
- **Vitest** - Unit testing
- **Vercel** - Deployment platform
- **GitHub Actions** - CI/CD automation

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and **Bun** (we use Bun instead of npm)
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
bun run setup:env
```

### 2. Database Setup

```bash
# Run database migrations
bun db:push

# Seed the database with sample data
bun db:seed
```

### 3. Start Development

```bash
# Start all services
cd v1-template
bun dev

# Individual services (optional)
bun dev:web        # Marketing site - http://localhost:3001
bun dev:app        # Dashboard - http://localhost:3000
bun dev:api        # API server - http://localhost:3002
bun dev:docs       # Documentation - http://localhost:3004
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

### 📝 Environment Files Structure

Copy these files to their `.env.local` equivalents:

```bash
# Copy all env files
bun run setup:env

# The command creates:
# apps/api/.env.local
# apps/app/.env.local
# apps/web/.env.local
# apps/studio/.env.local
# packages/convex/.env.local
# packages/ai/.env.local
# packages/database/.env.local
```

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

**4. Products Configuration**

```bash
# Add these to your convex/.env.local if you have specific products:
POLAR_PRODUCT_FREE=your_free_product_id
POLAR_PRODUCT_LEGEND=your_legend_product_id
POLAR_PRODUCT_PRO_MONTHLY=your_pro_monthly_id
POLAR_PRODUCT_PRO_YEARLY=your_pro_yearly_id
POLAR_PRODUCT_PLUS_SMALL_PACK=your_small_pack_id
POLAR_PRODUCT_PLUS_MEDIUM_PACK=your_medium_pack_id
POLAR_PRODUCT_PLUS_LARGE_PACK=your_large_pack_id
```

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

# Update database/.env.local
DATABASE_URL=postgresql://username:password@localhost:5432/v1_template_db
```

### ⚡ Convex Setup

**1. Create Convex Account**

- Visit [convex.dev](https://convex.dev)
- Create account and new project
- Follow the setup instructions

**2. Connect to Project**

```bash
# Deploy your convex schema
bun convex dev

# Or if you're setting up
npm install -g convex
convex dev
```

**3. Get Environment Variables**

- **CONVEX_DEPLOYMENT**: Your project's deployment ID (from dashboard)
- **CONVEX_URL**: Your convex cloud URL
- **NEXT_PUBLIC_CONVEX_URL**: Same as CONVEX_URL for client
- **NEXT_PUBLIC_CONVEX_SITE_URL**: Your convex site URL for webhooks

### 📧 Resend Setup

**1. Get Resend Account**

- Sign up at [resend.com](https://resend.com)
- Create an API key
- **RESEND_TOKEN**: Your API key
- **RESEND_FROM**: Your verified sending email or domain
- **RESEND_API_KEY**: Same as RESEND_TOKEN (alternative naming)

### 📊 PostHog Setup

**1. Create PostHog Account**

- Sign up at [posthog.com](https://posthog.com)
- Create a new project
- **POSTHOG_KEY**: Project API key
- **NEXT_PUBLIC_POSTHOG_KEY**: Same as POSTHOG_KEY
- **POSTHOG_HOST**: Usually `https://eu.i.posthog.com` or `https://us.i.posthog.com`
- **NEXT_PUBLIC_POSTHOG_HOST**: Same as POSTHOG_HOST

### 🔔 Knock Setup

**1. Create Knock Account**

- Sign up at [knock.app](https://knock.app)
- **KNOCK_API_KEY**: Your API key (server-side)
- **KNOCK_SECRET_API_KEY**: Same as KNOCK_API_KEY
- **KNOCK_FEED_CHANNEL_ID**: Your feed channel ID
- **NEXT_PUBLIC_KNOCK_API_KEY**: Client-side API key
- **NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID**: Client-side feed channel

### ✉️ Remaining Optional Services

**Analytics & Monitoring**

- **GOOGLE_ANALYTICS_ID**: Standard GA tracking ID
- **NEXT_PUBLIC_GA_MEASUREMENT_ID**: Same as above
- **SENTRY_DSN**: Error tracking from [sentry.io](https://sentry.io)
- **NEXT_PUBLIC_SENTRY_DSN**: Same as SENTRY_DSN

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

**Setup Steps**:

1. **Go to Clerk Dashboard** → Configure → Webhooks
2. **Create new webhook endpoint**
3. **Set URL**: `https://your-convex-site.convex.site/webhooks/clerk/users`
4. **Select the 3 events** above
5. **Save and test the webhook**

### 💰 Polar.sh Webhooks

**Webhook URL Format**: `https://<YOUR_CONVEX_SITE_URL>/webhooks/polar/events`

**Required Events**:

- ✅ `subscription.created`
- ✅ `subscription.updated`
- ✅ `product.created`
- ✅ `product.updated`

**Setup Steps**:

1. **Go to Polar.sh Dashboard** → Settings → Webhooks
2. **Create new webhook endpoint**
3. **Set URL**: `https://your-convex-site.convex.site/webhooks/polar/events`
4. **Select the 4 events** above
5. **Save and test the webhook**

**Visual Guide Available**: Check the `.github/images/` folder for webhook setup screenshots:

- `.github/images/polar-webhook.png` - Polar webhook configuration
- `.github/images/polar-org-token.png` - Organization token setup

## 🤖 AI Coding Assistant

This repo is optimized for AI-powered development with **Kiro** integration.

### ✅ Pre-installed AI Tools

- **Kiro IDE** integration for advanced AI assistance
- **BMAD-method** prompt framework for consistent AI interactions
- **Standardized coding patterns** that work well with AI models

### 🔧 Recommended MCPs for Local Development

To enhance your AI development experience, install these MCP servers:

#### 1. **Context7** - Context-aware code assistance

```bash
claude mcp add context7 -- uvx mcp-server-context7
```

#### 2. **Fetch** - Web scraping and API calls

```bash
claude mcp add fetch -- uvx mcp-server-fetch
```

#### 3. **Serena** - IDE intelligence and project context

```bash
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project $(pwd)
```

Run the Serena command **inside this project directory** to set up comprehensive AI assistance.

### 🎨 Using Kiro Features

- **Auto-completion**: AI-powered suggestions based on your codebase
- **Context generation**: Automatic context for complex features
- **Code review**: AI-driven review of changes before commit
- **Documentation**: Automated code documentation generation

## 🏗️ Development Workflow

### Available Commands

```bash
# Development
bun dev                    # Start all services
bun dev:web               # Marketing site only
bun dev:app               # Dashboard only
bun dev:api               # API only
bun dev:docs              # Documentation only

# Database
bun db:push               # Push schema changes
bun db:seed               # Seed database
bun db:studio             # Open database GUI

# Convex
bun convex dev            # Start convex backend
db convex deploy          # Deploy to convex

# Testing
bun test                  # Run all tests
bun test:coverage         # Test with coverage
bun test:watch            # Watch mode

# Code Quality
bun lint                  # Lint all files
bun lint:fix              # Auto-fix linting issues
bun typecheck             # Check TypeScript
bun format                # Format code with Biome

# Build
bun build                 # Build all apps
bun build:web             # Build marketing site only
bun build:app             # Build dashboard only
```

### Project URLs in Development

| Service | Development URL | Description |
|---------|----------------|-------------|
| **Marketing** | <http://localhost:3001> | Landing pages, pricing, blog |
| **Dashboard** | <http://localhost:3000> | Main app interface |
| **API** | <http://localhost:3002> | Webhooks, serverless functions |
| **Docs** | <http://localhost:3004> | User documentation |
| **Storybook** | <http://localhost:6006> | Component library |

## 🚢 Deployment

### Initial Deployment Checklist

1. **Environment Variables**: Set all production environment variables
2. **Database**: Ensure your production database is migrated
3. **Convex**: Deploy your functions: `bun convex deploy`
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
- Run `bun convex dev` to sync local environment

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
# Check all environments
bun lint
bun typecheck

# Debug convex
bun convex dev --debug

# Debug database connection
bun db:studio

# Reset dev environment
bun dev:clean
```

## 📚 Documentation

- **[Convex Documentation](packages/convex/README.md)** - Backend setup and queries
- **[Database Schema](packages/database/README.md)** - Database design and migrations
- **[Component Library](packages/design-system/README.md)** - UI components and usage
- **[AI Features](packages/ai/README.md)** - AI agents and integrations

## 🤝 Contributing

1. **Read coding standards**: `.kiro/steering/coding-standards.md`
2. **Create feature branch**: `git checkout -b feature/your-feature`
3. **Follow commit conventions**: Use conventional commits
4. **Run tests**: `bun test`
5. **Check linting**: `bun lint`
6. **Create pull request** with detailed description

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🆘 Need Help?

If you get stuck setting up environment variables or webhooks:

1. **Check the `.env.example` files** in each package
2. **Review the webhook images**: `.github/images/` folder
3. **Read service documentation** in the respective packages
4. **Check the error logs** - they're very descriptive
5. **Open an issue** with your setup details and error messages

**Still stuck?** The most common issues are incorrect webhook URLs and missing environment variables. Double-check your configuration against the sections above!
