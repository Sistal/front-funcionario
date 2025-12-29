import * as React from "react";
import { cn } from "./cn";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none placeholder:text-muted-foreground aria-invalid:ring-destructive/20 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border border-gray-200 bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
