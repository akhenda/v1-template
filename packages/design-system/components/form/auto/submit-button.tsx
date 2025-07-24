import React, { type PropsWithChildren } from 'react';
import type { FieldValues } from 'react-hook-form';

import { Loader } from '../../loader';
import { Button } from '../../ui/button';

import type { FormApi } from './types';

export type ButtonProps = React.ComponentProps<typeof Button>;

export function useSubmitButton<Schema extends FieldValues>(formApi: FormApi<Schema>) {
  return ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
    const {
      form: {
        formState: { isSubmitting },
      },
      submit,
    } = formApi;

    return (
      <Button type="submit" {...props} disabled={isSubmitting} onClick={submit}>
        {isSubmitting && <Loader className="h-4 w-4" />}
        {!isSubmitting && children}
      </Button>
    );
  };
}
