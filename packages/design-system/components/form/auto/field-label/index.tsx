import React, { type PropsWithChildren } from 'react';

import { cn } from '../../../../lib/utils';
import { FormLabel as FormLabelPrimitive } from '../../../ui/form';

import { LabelTooltip } from './label-tooltip';
import { FieldRequiredMarker } from './required-marker';

type Props = PropsWithChildren<{ markAsRequired?: boolean; tooltip?: string; className?: string }>;

export function FormLabelComponent({ className, children, tooltip, markAsRequired }: Props) {
  return (
    <FormLabelPrimitive className={cn('gap-0 font-semibold text-sm', className)}>
      {children}
      <FieldRequiredMarker markAsRequired={markAsRequired} />
      <LabelTooltip tooltip={tooltip} />
    </FormLabelPrimitive>
  );
}

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.children === nextProps.children &&
    prevProps.tooltip === nextProps.tooltip &&
    prevProps.markAsRequired === nextProps.markAsRequired
  );
};

export const FormLabel = React.memo(FormLabelComponent, areEqual);
