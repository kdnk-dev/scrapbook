import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "f8w-flex f8w-h-10 f8w-w-full f8w-rounded-md f8w-border f8w-border-input f8w-bg-background f8w-px-3 f8w-py-2 f8w-text-sm f8w-ring-offset-background file:f8w-border-0 file:f8w-bg-transparent file:f8w-text-sm file:f8w-font-medium file:f8w-text-foreground placeholder:f8w-text-muted-foreground focus-visible:f8w-outline-none focus-visible:f8w-ring-2 focus-visible:f8w-ring-ring focus-visible:f8w-ring-offset-2 disabled:f8w-cursor-not-allowed disabled:f8w-opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
