import React, { type PropsWithChildren } from 'react';
import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
  useFormContext,
} from 'react-hook-form';
import type { z } from 'zod';

import { createCtx } from '../../../hooks/utils';

import type { AnyValue } from './types';

export const [useFormSchemaContext, FormSchemaContextProvider] =
  createCtx<FieldValues>('FormSchemaContext');

type FormSchemaProviderProps<
  Schema extends z.ZodObject<AnyValue, 'strip'>,
  Input extends z.input<Schema>,
  Output extends z.output<Schema>,
> = PropsWithChildren<{
  form: UseFormReturn<Input, AnyValue, Output>;
}>;

export function FormSchemaProvider<
  Schema extends z.ZodObject<AnyValue, 'strip'>,
  Input extends z.input<Schema> = z.input<Schema>,
  Output extends z.output<Schema> = z.output<Schema>,
>({ children, form }: FormSchemaProviderProps<Schema, Input, Output>) {
  return (
    <FormSchemaContextProvider value={{} as Schema}>
      <FormProvider {...form}>{children}</FormProvider>
    </FormSchemaContextProvider>
  );
}

export function useTypedFormContext<Schema extends FieldValues>() {
  return useFormContext<Schema>();
}
