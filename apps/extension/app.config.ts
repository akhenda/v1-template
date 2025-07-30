import { defineAppConfig } from '#imports';

import env from './env.config';

// Define types for your config
declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    env: typeof env;
    signInLink: string;
  }
}

export default defineAppConfig({
  env,
  signInLink: `${env.WXT_CLERK_SYNC_HOST}${env.NODE_ENV === 'production' ? '' : ':3000'}/sign-in`,
});
