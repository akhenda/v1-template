import React from 'react';

type Props = { markAsRequired?: boolean };

export function FieldRequiredMarker({ markAsRequired }: Props) {
  if (!markAsRequired) return null;

  return <span className="ml-1 max-h-[20px] text-base text-red-500">*</span>;
}
