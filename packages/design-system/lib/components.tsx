import React, { type ReactNode } from 'react';

/**
 * A component that renders its children without any modifications.
 * It acts as a placeholder or pass-through component.
 *
 * @param children - The content to be rendered.
 * @returns The unmodified children wrapped in a React fragment.
 */
export function NoOp({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
