'use client';

/**
 * @see https://autoform.vantezzen.io/
 * @see https://github.com/vantezzen/autoform/blob/main/packages/zod/src/schema-parser.ts
 * @see https://medium.com/@rutikpanchal121/building-a-robust-form-in-react-native-with-react-hook-form-and-zod-for-validation-7583678970c3
 */

import type React from 'react';
import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';
import type { DefaultValues, Mode, Resolver } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import type { PropsWithClassName } from '@repo/types';

import { cn } from '../../../../lib/utils';

import type { AnyValue } from './types';
import { getDefaultValues } from './utils';

export * from './create-typed-fields';
export * from './types';
export * from './utils';

type FormProps = PropsWithChildren &
  PropsWithClassName & {
    /** The HTML element to render as the form container. Defaults to 'form'. */
    containerElement?: React.ElementType;
    /** Base classes to apply to the form container. Defaults to 'flex flex-col gap-6'. */
    baseClasses?: string;
  };

export function useAutoFormPrime<
  Schema extends z.ZodObject<AnyValue, AnyValue>,
  Input extends z.input<Schema>,
>({
  schema,
  data,
  mode = 'onChange',
}: {
  schema: Schema;
  data?: DefaultValues<Input>;
  mode?: Mode;
}) {
  const form = useForm<Input>({
    mode,
    defaultValues: data ?? getDefaultValues<Schema, Input>(schema),
    resolver: zodResolver(schema) as Resolver<Input>,
  });

  const Form: React.FC<FormProps> = useCallback(
    ({
      children,
      className,
      containerElement: Container = 'form',
      baseClasses = 'flex flex-col gap-6',
    }) => (
      <FormProvider {...form}>
        <Container className={cn(baseClasses, className)}>{children}</Container>
      </FormProvider>
    ),
    [form],
  );
  Form.displayName = 'AutoFormPrimeForm';

  return { form, Form };
}
