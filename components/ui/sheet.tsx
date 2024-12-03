"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "f8w-fixed f8w-inset-0 f8w-z-50 f8w-bg-black/80 f8w- data-[state=open]:f8w-animate-in data-[state=closed]:f8w-animate-out data-[state=closed]:f8w-fade-out-0 data-[state=open]:f8w-fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "f8w-fixed f8w-z-50 f8w-gap-4 f8w-bg-background f8w-p-6 f8w-shadow-lg f8w-transition f8w-ease-in-out data-[state=open]:f8w-animate-in data-[state=closed]:f8w-animate-out data-[state=closed]:f8w-duration-300 data-[state=open]:f8w-duration-500",
  {
    variants: {
      side: {
        top: "f8w-inset-x-0 f8w-top-0 f8w-border-b data-[state=closed]:f8w-slide-out-to-top data-[state=open]:f8w-slide-in-from-top",
        bottom:
          "f8w-inset-x-0 f8w-bottom-0 f8w-border-t data-[state=closed]:f8w-slide-out-to-bottom data-[state=open]:f8w-slide-in-from-bottom",
        left: "f8w-inset-y-0 f8w-left-0 f8w-h-full f8w-w-3/4 f8w-border-r data-[state=closed]:f8w-slide-out-to-left data-[state=open]:f8w-slide-in-from-left sm:f8w-max-w-sm",
        right:
          "f8w-inset-y-0 f8w-right-0 f8w-h-full f8w-w-3/4 f8w- f8w-border-l data-[state=closed]:f8w-slide-out-to-right data-[state=open]:f8w-slide-in-from-right sm:f8w-max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.DialogTitle />
      {children}
      <SheetPrimitive.Close className="f8w-absolute f8w-right-4 f8w-top-4 f8w-rounded-sm f8w-opacity-70 f8w-ring-offset-background f8w-transition-opacity hover:f8w-opacity-100 focus:f8w-outline-none focus:f8w-ring-2 focus:f8w-ring-ring focus:f8w-ring-offset-2 disabled:f8w-pointer-events-none data-[state=open]:f8w-bg-secondary">
        <X className="f8w-h-4 f8w-w-4" />
        <span className="f8w-sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "f8w-flex f8w-flex-col f8w-space-y-2 f8w-text-center sm:f8w-text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "f8w-flex f8w-flex-col-reverse sm:f8w-flex-row sm:f8w-justify-end sm:f8w-space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "f8w-text-lg f8w-font-semibold f8w-text-foreground",
      className,
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("f8w-text-sm f8w-text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
