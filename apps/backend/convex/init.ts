import { internalAction } from './_generated/server';
import { polar } from './billing';

// Create Polar products, the Convex Polar component will sync them
// back to the database via webhook.
export default internalAction(async (ctx) => {
  // const products = await polar.sdk.products.list({ isArchived: false });
  const products = await polar.listProducts(ctx, { includeArchived: false });

  // If any unarchived products exist, bail.
  if (products?.length) {
    // biome-ignore lint/suspicious/noConsole: This is allowed in Convex
    console.info('🏃‍♂️ Skipping Polar products creation and seeding.');

    return;
  }

  /**
   * @see https://www.convex.dev/components/polar#create-products-in-polar
   *
   * Create products in Polar
   *
   * Create a product in the Polar dashboard for each pricing plan that you want to offer. The
   * product data will be synced to your Convex app automatically.
   *
   * Note: You can have one price per plan, so a plan with monthly and yearly pricing requires
   * two products in Polar.
   *
   * Note: The Convex Polar component is currently built to support recurring subscriptions, and
   * may not work as expected with one-time payments. Please open an issue or reach out on Discord
   * if you run into any issues.
   *
   * Products created prior to using this component need to be synced with Convex using the
   * `syncProducts` function.
   */
  // await polar.sdk.products.create({
  //   name: 'Pro',
  //   description: 'All the things for one low monthly price.',
  //   recurringInterval: 'month',
  //   prices: [{ priceAmount: 2000, amountType: 'fixed' }],
  // });

  // await polar.sdk.products.create({
  //   name: 'Pro',
  //   description: 'All the things for one low yearly price.',
  //   recurringInterval: 'year',
  //   prices: [{ priceAmount: 20_000, amountType: 'fixed' }],
  // });

  // biome-ignore lint/suspicious/noConsole: This is allowed in Convex
  console.info('📦 Polar Products have been successfully created.');
});
