import ReactDOM from 'react-dom/client';

import { createShadowRootUi, defineContentScript } from '#imports';

import '~/assets/styles/globals.css';

import { Button } from '@repo/design-system/components/ui/button';

import { logger } from '@/lib/utils';

const ContentScriptUI = () => {
  return <Button onClick={() => alert('This is injected UI!')}>Content Script UI 😎</Button>;
};

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    logger.info('Content script is running! Edit `src/app/content` and save to reload.');

    const ui = await createShadowRootUi(ctx, {
      name: 'extro-ui',
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
