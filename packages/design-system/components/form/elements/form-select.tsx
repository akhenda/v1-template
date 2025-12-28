'use client';

import { HelpCircle } from 'lucide-react';

import { cn } from '../../../lib/utils';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

type OptionValue<T = string> = T;
type Option<T = string> = { value: OptionValue<T>; label: string };
type Options<T = string> = Option<T>[];

type FormSelectProps<T = string> = {
  id: string;
  label: string;
  options: Options<T>;
  value: OptionValue<T>;
  onChange: (value: OptionValue<T>) => void;
  tooltip?: string;
  required?: boolean;
  className?: string;
  error?: string;
  placeholder?: string;
};

export function FormSelect({
  id,
  label,
  options,
  value,
  onChange,
  tooltip,
  required = false,
  className = '',
  error,
  placeholder = 'Select an option',
}: FormSelectProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2">
        <Label className="font-semibold text-sm" htmlFor={id}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="ml-1.5 h-3.5 w-3.5 cursor-help text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs" side="top">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className="w-full bg-muted"
          id={id}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="mt-1 text-red-500 text-sm" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
