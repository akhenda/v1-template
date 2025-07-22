import type { ComponentProps } from 'react';

import { MDXContent } from '@content-collections/mdx/react';

type BodyProperties = Omit<ComponentProps<typeof MDXContent>, 'code'> & {
  content: ComponentProps<typeof MDXContent>['code'];
};

export const Body = ({ content, ...props }: BodyProperties) => (
  <MDXContent {...props} code={content} />
);
