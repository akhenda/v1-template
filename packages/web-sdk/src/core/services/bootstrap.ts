import { initDateLocale } from '@repo/date';

const initDateLib = (locale: string) => initDateLocale(locale);

export const bootstrapServices = () => {
  // Core services to init first in a specific order
  // await Analytics.init(); // already initialized in ./analytics

  // Misc

  // All other core services
  initDateLib('en');

  // Used SDKs
  // ...
};
