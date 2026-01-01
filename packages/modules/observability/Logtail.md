# Logtail

Follow the new [Next.js Docs](https://betterstack.com/docs/logs/javascript/nextjs)
for Logtail.

## 1. Setup

Set environment variables, e.g. in your console before running the server:

```sh
# Set environment variable

export NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN="$SOURCE_TOKEN"
export NEXT_PUBLIC_BETTER_STACK_INGESTING_URL="https://$INGESTING_HOST"
```

> **Insert your source token and ingesting host**
>
> Replace `$SOURCE_TOKEN` and `$INGESTING_HOST` with your source token and
> ingesting host. You can find those values in your sources.

Set up Better Stack Next.js client in `next.config.ts` or `next.config.js`:

```ts
import { withBetterStack } require('@logtail/next');

export default withBetterStack({
  // Your existing config
});
```

## 2. Start logging 🎉

Use structured logging in client, edge, or server-side files.

### Route handlers

Wrap your route handlers in `withBetterStack` to add a logger to your request and
log exceptions automatically:

```ts
// Wrap route handler with Better Stack

import { withBetterStack, BetterStackRequest } from '@logtail/next';

export const GET = withBetterStack((req: BetterStackRequest) => {
  req.log.info('Login function called');

  // You can create intermediate loggers
  const log = req.log.with({ scope: 'user' });
  log.info('User logged in', { userId: 42 });

  return NextResponse.json({ hello: 'world' });
});
```

### Client components

To send logs from client components, add `useLogger` from `@logtail/next` to
your component:

```ts
// Send logs from client components to Better Stack

'use client';
import { useLogger } from '@logtail/next';

export default function ClientComponent() {
  const log = useLogger();
  log.debug('User logged in', { userId: 42 });
  return <h1>Logged in</h1>;
}
```

### Server components

To send logs from server components, add `Logger` from `@logtail/next` to your
component, and call flush before returning:

```ts
// Send logs from server components to Better Stack

import { Logger } from '@logtail/next';

export default async function ServerComponent() {
  const log = new Logger();
  log.info('User logged in', { userId: 42 });

  // ...

  await log.flush();
  return <h1>Logged in</h1>;
}
```

## 3. Advanced usage

### Capture traffic requests

To capture traffic requests, create a `middleware.ts` file in the root folder of
your Next.js app:

```ts
// Capture traffic requests using middleware

import { Logger } from '@logtail/next'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const logger = new Logger({ source: "middleware" });
  await logger.middleware(request, { logRequestDetails: ["body", "nextUrl"] });

  event.waitUntil(logger.flush());
  return NextResponse.next();
}
```

### Log levels

The log level defines the lowest level of logs sent to Better Stack. Choose one
of the following levels (from lowest to highest):

- `debug` is the default setting. It means that you send all logs to Better Stack.
- `info`
- `warn`
- `error` means that you only send the highest-level logs to Better Stack.
- `off` means that you don't send any logs to Better Stack.

For example, to send all logs except for debug logs to Better Stack:

```sh
# Set environment variable to change log level

export NEXT_PUBLIC_BETTER_STACK_LOG_LEVEL=info
```

### Web Vitals

To send Web Vitals to Better Stack, add the `BetterStackWebVitals` component
from `@logtail/next` to the `app/layout.tsx` file:

```ts
// Send Web Vitals to Better Stack

import { BetterStackWebVitals } from '@logtail/next';

export default function RootLayout() {
  return (
    <html>
      ...
      <BetterStackWebVitals />
      <div>...</div>
    </html>
  );
}
```

### Capture errors

To capture routing errors, use the [error handling mechanism of Next.js](https://nextjs.org/docs/app/building-your-application/routing/error-handling):

1. Go to the `app` folder.
2. Create an `error.tsx` file.
3. Inside your component function, add `useLogger` from `@logtail/next` to send
   the error to Better Stack. For example:

```ts
// Send errors to Better Stack

"use client";

import { useLogger, LogLevel } from "@logtail/next";
import { usePathname } from "next/navigation";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const pathname = usePathname()
  const log = useLogger({ source: "error.tsx" });
  let status =  error.message == 'Invalid URL' ? 404 : 500;

  log.logHttpRequest(
    LogLevel.error,
    error.message,
    {
      host: window.location.href,
      path: pathname,
      statusCode: status,
    },
    {
      error: error.name,
      cause: error.cause,
      stack: error.stack,
      digest: error.digest,
    },
  );

  return (
    <div className="p-8">
      Ops! An Error has occurred:{" "}
      <p className="text-red-400 px-8 py-2 text-lg">`{error.message}`</p>
      <div className="w-1/3 mt-8">
        <NavTable />
      </div>
    </div>
  );
}
```

### How can I extend the logger?

You can use `log.with` to create an intermediate logger, for example:

```ts
// Extend logger with additional context

const logger = userLogger().with({ userId: 42 });
logger.info('Hi'); // will ingest { ..., "message": "Hi", "fields" { "userId": 42 }}
```
