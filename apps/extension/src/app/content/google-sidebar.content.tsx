import ReactDOM from 'react-dom/client';

import { createShadowRootUi, defineContentScript } from '#imports';

import '~/assets/styles/globals.css';

// import { GoogleSidebar } from './contents/google-sidebar';
import { Button } from '@repo/design-system/components/ui/button';

import { logger } from '@/lib/utils';

const ContentScriptUI = () => {
  return <Button onClick={() => alert('This is injected UI!')}>Content Script UI 😎</Button>;
};

export default defineContentScript({
  matches: ['https://www.google.com/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    logger.info('Content script is running! Edit `src/app/content` and save to reload.');

    const ui = await createShadowRootUi(ctx, {
      name: 'plasmo-google-sidebar',
      position: 'overlay',
      anchor: 'body',
      onMount: (container) => {
        const app = document.createElement('div');
        container.append(app);

        const root = ReactDOM.createRoot(app);
        root.render(<ContentScriptUI />);

        return root;
      },
      onRemove: (root) => root?.unmount(),
    });

    ui.mount();
  },
});
