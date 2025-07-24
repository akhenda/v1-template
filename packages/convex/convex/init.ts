import { internalAction } from './_generated/server';
import { polar } from './billing';

// Create Polar products, the Convex Polar component will sync them
// back to the database via webhook.
export default internalAction(async () => {
  const products = await polar.sdk.products.list({ isArchived: false });

  // If any unarchived products exist, bail.
  if (products?.result?.items?.length) {
    // biome-ignore lint/suspicious/noConsole: This is allowed in Convex
    console.info('🏃‍♂️ Skipping Polar products creation and seeding.');

    return;
  }

  await polar.sdk.products.create({
    name: 'Pro',
    description: 'All the things for one low monthly price.',
    recurringInterval: 'month',
    prices: [{ priceAmount: 2000, amountType: 'fixed' }],
  });

  await polar.sdk.products.create({
    name: 'Pro',
    description: 'All the things for one low yearly price.',
    recurringInterval: 'year',
    prices: [{ priceAmount: 20000, amountType: 'fixed' }],
  });

  // biome-ignore lint/suspicious/noConsole: This is allowed in Convex
  console.info('📦 Polar Products have been successfully created.');
});
