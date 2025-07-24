import React from 'react';
import type { FieldError } from 'react-hook-form';

export function ErrorMessage({ error }: { error?: FieldError }) {
  if (!error?.message) return null;

  return <p className="pt-3 font-ibm-medium text-red-600 text-sm">{error.message}</p>;
}
