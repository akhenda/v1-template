'use client';

import { HelpCircle } from 'lucide-react';

import { cn } from '../../../lib/utils';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

type OptionValue<T = string> = T;
type Option<T = string> = { value: OptionValue<T>; label: string };
type Options<T = string> = Option<T>[];

interface FormSelectProps<T = string> {
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
}

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
        <Label htmlFor={id} className="font-semibold text-sm">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="ml-1.5 h-3.5 w-3.5 cursor-help text-gray-400" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full bg-muted"
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
        <p id={`${id}-error`} className="mt-1 text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
