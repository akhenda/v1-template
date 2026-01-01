import { createMemoryRouter, RouterProvider } from 'react-router';

import ReactDOM from 'react-dom/client';

import { RootLayout } from '@/components/layout/root';
import { AI } from '@/pages/ai';
import { Home } from '@/pages/home';
import { Settings } from '@/pages/settings';
import { SignInPage } from '@/pages/sign-in';
import { SignUpPage } from '@/pages/sign-up';

const router = createMemoryRouter([
  {
    // Wraps the entire app in the root layout
    element: <RootLayout />,

    // Mounted where the <Outlet /> component is inside the root layout
    children: [
      { path: '/', element: <Home /> },
      { path: '/ai', element: <AI /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
