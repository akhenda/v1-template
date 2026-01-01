import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { createMetadata } from '@repo/seo/metadata';

// import { Dashboard } from '@repo/web/features/dashboard/index';

const Dashboard = dynamic(() =>
  import('@repo/web/features/dashboard/index').then((mod) => mod.Dashboard),
);

const title = 'Dashboard';
const description = "Here's an overview of...";
export const metadata: Metadata = createMetadata({ title, description });

export default Dashboard;
