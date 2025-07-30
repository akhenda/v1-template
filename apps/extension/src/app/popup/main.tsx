import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ReactDOM from 'react-dom/client';

import { Main } from '@/components/common/main';
import { PopupLayout } from '@/components/layout/popup';

const Popup = () => <Main className="w-[23rem] px-4" filename="app/popup" />;

const router = createMemoryRouter([
  {
    // Wraps the entire app in the root layout
    element: <PopupLayout />,

    // Mounted where the <Outlet /> component is inside the root layout
    children: [{ path: '/', element: <Popup /> }],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
