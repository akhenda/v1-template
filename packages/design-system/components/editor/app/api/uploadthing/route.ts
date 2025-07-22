import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from '@repo/design-system/lib/uploadthing';

export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
