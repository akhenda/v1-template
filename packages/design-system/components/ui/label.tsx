"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@repo/design-system/lib/utils"

const Label = React.memo(function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.htmlFor === nextProps.htmlFor &&
    // Compare other props if necessary, or ensure they are stable from parent
    true
  );
});

export { Label }
