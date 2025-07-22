'use client';

import * as React from "react"
import { LucideIcon } from "lucide-react";

import { cn } from "@repo/design-system/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & {
  IconPrefix?: LucideIcon;
  IconSuffix?: LucideIcon;
  onPressIconSuffix?: () => void;
  containerClassName?: string
}>(
  ({ className, containerClassName, type, IconPrefix, IconSuffix, onPressIconSuffix, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        {IconPrefix &&(
          <div className="absolute items-center justify-center pl-3 top-1/2 -translate-y-1/2">
            <IconPrefix className="px-0 h-4 w-4 text-primary opacity-90" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bgg-background bg-muted px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "selection:bg-primary selection:text-primary-foreground min-w-0 bbg-transparent shadow-xs transition-[color,box-shadow] ouutline-none file:inline-flex file:h-7 disabled:pointer-events-none",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
            { 'pl-9': IconPrefix, 'pr-9': IconSuffix }
          )}
          {...props}
        />
        {IconSuffix && (
          <div className="absolute right-0 items-center justify-center pr-3 top-1/2 -translate-y-1/2">
            <IconSuffix
              className="h-4 w-4 text-primary opacity-90 cursor-pointer"
              onClick={onPressIconSuffix}
            />
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

// "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
