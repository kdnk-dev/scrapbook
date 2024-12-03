"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "f8w-z-50 f8w-overflow-hidden f8w-rounded-md f8w-border f8w-bg-popover f8w-px-3 f8w-py-1.5 f8w-text-sm f8w-text-popover-foreground f8w-shadow-md f8w-animate-in f8w-fade-in-0 f8w-zoom-in-95 data-[state=closed]:f8w-animate-out data-[state=closed]:f8w-fade-out-0 data-[state=closed]:f8w-zoom-out-95 data-[side=bottom]:f8w-slide-in-from-top-2 data-[side=left]:f8w-slide-in-from-right-2 data-[side=right]:f8w-slide-in-from-left-2 data-[side=top]:f8w-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
