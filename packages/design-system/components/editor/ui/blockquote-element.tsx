'use client';

import { type PlateElementProps, PlateElement } from '@udecode/plate/react';

export function BlockquoteElement(props: PlateElementProps) {
  return <PlateElement as="blockquote" className="my-1 border-l-2 pl-6 italic" {...props} />;
}
