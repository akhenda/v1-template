import React from 'react';

import ReactDOM from 'react-dom/client';

import { Main } from '~/components/common/main';

const Options = () => {
  return <Main filename="app/options" />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
