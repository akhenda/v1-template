import cache from '@convex-dev/action-cache/convex.config';
import polar from '@convex-dev/polar/convex.config';
import rateLimiter from '@convex-dev/rate-limiter/convex.config';
import workflow from '@convex-dev/workflow/convex.config';
import { defineApp } from 'convex/server';

const app = defineApp();

app.use(rateLimiter);
app.use(workflow);
app.use(cache);
app.use(polar);

export default app;
