import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { defineConfig, type UserManifest, type WxtViteConfig } from 'wxt';

export default defineConfig({
  manifest: () => {
    const hostPermissions: UserManifest['host_permissions'] = [];
    const dynamicManifest: UserManifest = { host_permissions: hostPermissions };

    const crxPubKey = import.meta.env.WXT_CRX_PUBLIC_KEY;
    const clerkFrontendUrl = import.meta.env.WXT_CLERK_FRONTEND_API;
    const syncHost = import.meta.env.WXT_CLERK_SYNC_HOST;

    if (crxPubKey) dynamicManifest.key = crxPubKey;
    if (syncHost) hostPermissions.push(`${syncHost}/*`);
    if (clerkFrontendUrl) hostPermissions.push(`${clerkFrontendUrl}/*`);

    return {
      name: '__MSG_extensionName__',
      description: '__MSG_extensionDescription__',
      default_locale: 'en',
      permissions: ['cookies', 'storage', 'sidePanel', 'scripting'],
      ...dynamicManifest,
    };
  },
  srcDir: 'src',
  entrypointsDir: 'app',
  outDir: 'build',
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
  imports: false,
  dev: { server: { port: 3100 } },
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
