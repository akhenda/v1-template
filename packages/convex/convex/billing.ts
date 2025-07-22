import { Polar } from '@convex-dev/polar';

import { components, internal } from './_generated/api';
import type { Id } from './_generated/dataModel';
import { env } from './env';

export const polar = new Polar(components.polar, {
  // Required: provide a function the component can use to get the current user's ID and
  // email - this will be used for retrieving the correct subscription data for the
  // current user. The function should return an object with `userId` and `email`
  // properties.
  getUserInfo: async (ctx): Promise<{ userId: Id<'users'>; email: string }> => {
    const user = await ctx.runQuery(internal.users.getCurrentPolarUserInfo);

    return user;
  },
  // Optional: Configure static keys for referencing your products.
  // Alternatively you can use the `listAllProducts` function to get
  // the product data and sort it out in your UI however you like
  // (eg., by price, name, recurrence, etc.).
  // Map your product keys to Polar product IDs (you can also use env vars for this)
  // Replace these keys with whatever is useful for your app (eg., "pro", "proMonthly",
  // whatever you want), and replace the values with the actual product IDs from your
  // Polar dashboard
  products: {
    free: env.POLAR_PRODUCT_FREE,
    legend: env.POLAR_PRODUCT_LEGEND,
    plusSmallPack: env.POLAR_PRODUCT_PLUS_SMALL_PACK,
    plusMediumPack: env.POLAR_PRODUCT_PLUS_MEDIUM_PACK,
    plusLargePack: env.POLAR_PRODUCT_PLUS_LARGE_PACK,
    proMonthly: env.POLAR_PRODUCT_PRO_MONTHLY,
    proYearly: env.POLAR_PRODUCT_PRO_YEARLY,
  },
  // Optional: Set Polar configuration directly in code
  organizationToken: env.POLAR_ORGANIZATION_TOKEN, // Defaults to POLAR_ORGANIZATION_TOKEN env var
  webhookSecret: env.POLAR_WEBHOOK_SECRET, // Defaults to POLAR_WEBHOOK_SECRET env var
  server: env.POLAR_SERVER, // Optional: "sandbox" or "production", defaults to POLAR_SERVER env var
});

// Export the API functions
export const {
  getConfiguredProducts,
  listAllProducts,
  generateCheckoutLink,
  generateCustomerPortalUrl,
  changeCurrentSubscription,
  cancelCurrentSubscription,
} = polar.api();
