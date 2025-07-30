import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { defineConfig, type WxtViteConfig } from 'wxt';

const crxPubKey = 'imdhnmpcgpknkipjanmmlpelfinmeleb';
const clerkFrontendUrl = 'https://magnetic-alien-35.clerk.accounts.dev';

export default defineConfig({
  manifest: {
    name: '__MSG_extensionName__',
    description: '__MSG_extensionDescription__',
    default_locale: 'en',
    key: crxPubKey,
    permissions: ['cookies', 'storage', 'sidePanel', 'scripting'],
    host_permissions: ['<all_urls>', 'http://localhost/*', `${clerkFrontendUrl}/*`],
  },
  srcDir: 'src',
  entrypointsDir: 'app',
  outDir: 'build',
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
  imports: false,
  vite: () =>
    ({
      plugins: [svgr(), tailwindcss()],
      define: {
        // 'process.env': process.env, // This exposes all Node.js process.env variables
        // Or, for specific variables:
        'process.env.CLERK_SECRET_KEY': JSON.stringify(process.env.CLERK_SECRET_KEY),
        'process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY': JSON.stringify(
          process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        ),
        'process.env.NEXT_PUBLIC_CONVEX_URL': JSON.stringify(process.env.NEXT_PUBLIC_CONVEX_URL),
        'process.env.NEXT_PUBLIC_POSTHOG_KEY': JSON.stringify(process.env.NEXT_PUBLIC_POSTHOG_KEY),
        'process.env.NEXT_PUBLIC_POSTHOG_HOST': JSON.stringify(
          process.env.NEXT_PUBLIC_POSTHOG_HOST,
        ),
        'process.env.NEXT_PUBLIC_APP_URL': JSON.stringify(process.env.NEXT_PUBLIC_APP_URL),
        'process.env.NEXT_PUBLIC_WEB_URL': JSON.stringify(process.env.NEXT_PUBLIC_WEB_URL),
      },
    }) as WxtViteConfig,
  webExt: { chromiumArgs: ['--disable-features=DisableLoadExtensionCommandLineSwitch'] },
});
