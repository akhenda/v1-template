import React from 'react';

import ReactDOM from 'react-dom/client';
import { browser } from 'wxt/browser';

import { Main } from '~/components/common/main';

browser.devtools.panels.create('Kaidoku Cars', 'icons/128.png', 'devtools.html');
browser.devtools.panels.elements.createSidebarPane('Kaidoku Cars', (sidebar) => {
  sidebar.setObject({ name: 'DevTools' });
});

const DevTools = () => <Main filename="app/devtools" />;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DevTools />
  </React.StrictMode>,
);
