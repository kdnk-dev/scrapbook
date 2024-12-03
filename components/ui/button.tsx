import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "f8w-inline-flex f8w-items-center f8w-justify-center f8w-gap-2 f8w-whitespace-nowrap f8w-rounded-md f8w-text-sm f8w-font-medium f8w-ring-offset-background f8w-transition-colors focus-visible:f8w-outline-none focus-visible:f8w-ring-2 focus-visible:f8w-ring-ring focus-visible:f8w-ring-offset-2 disabled:f8w-pointer-events-none disabled:f8w-opacity-50 [&_svg]:f8w-pointer-events-none [&_svg]:f8w-size-4 [&_svg]:f8w-shrink-0",
  {
    variants: {
      variant: {
        default:
          "f8w-bg-primary f8w-text-primary-foreground hover:f8w-bg-primary/90",
        destructive:
          "f8w-bg-destructive f8w-text-destructive-foreground hover:f8w-bg-destructive/90",
        outline:
          "f8w-border f8w-border-input f8w-bg-background hover:f8w-bg-accent hover:f8w-text-accent-foreground",
        secondary:
          "f8w-bg-secondary f8w-text-secondary-foreground hover:f8w-bg-secondary/80",
        ghost: "hover:f8w-bg-accent hover:f8w-text-accent-foreground",
        link: "f8w-text-primary f8w-underline-offset-4 hover:f8w-underline",
      },
      size: {
        default: "f8w-h-10 f8w-px-4 f8w-py-2",
        sm: "f8w-h-9 f8w-rounded-md f8w-px-3",
        lg: "f8w-h-11 f8w-rounded-md f8w-px-8",
        icon: "f8w-h-10 f8w-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
