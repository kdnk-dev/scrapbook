"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "f8w-flex f8w-cursor-default f8w-gap-2 f8w-select-none f8w-items-center f8w-rounded-sm f8w-px-2 f8w-py-1.5 f8w-text-sm f8w-outline-none focus:f8w-bg-accent data-[state=open]:f8w-bg-accent [&_svg]:f8w-pointer-events-none [&_svg]:f8w-size-4 [&_svg]:f8w-shrink-0",
      inset && "f8w-pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="f8w-ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "f8w-z-50 f8w-min-w-[8rem] f8w-overflow-hidden f8w-rounded-md f8w-border f8w-bg-popover f8w-p-1 f8w-text-popover-foreground f8w-shadow-lg data-[state=open]:f8w-animate-in data-[state=closed]:f8w-animate-out data-[state=closed]:f8w-fade-out-0 data-[state=open]:f8w-fade-in-0 data-[state=closed]:f8w-zoom-out-95 data-[state=open]:f8w-zoom-in-95 data-[side=bottom]:f8w-slide-in-from-top-2 data-[side=left]:f8w-slide-in-from-right-2 data-[side=right]:f8w-slide-in-from-left-2 data-[side=top]:f8w-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "f8w-z-50 f8w-min-w-[8rem] f8w-overflow-hidden f8w-rounded-md f8w-border f8w-bg-popover f8w-p-1 f8w-text-popover-foreground f8w-shadow-md data-[state=open]:f8w-animate-in data-[state=closed]:f8w-animate-out data-[state=closed]:f8w-fade-out-0 data-[state=open]:f8w-fade-in-0 data-[state=closed]:f8w-zoom-out-95 data-[state=open]:f8w-zoom-in-95 data-[side=bottom]:f8w-slide-in-from-top-2 data-[side=left]:f8w-slide-in-from-right-2 data-[side=right]:f8w-slide-in-from-left-2 data-[side=top]:f8w-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "f8w-relative f8w-flex f8w-cursor-default f8w-select-none f8w-items-center f8w-gap-2 f8w-rounded-sm f8w-px-2 f8w-py-1.5 f8w-text-sm f8w-outline-none f8w-transition-colors focus:f8w-bg-accent focus:f8w-text-accent-foreground data-[disabled]:f8w-pointer-events-none data-[disabled]:f8w-opacity-50 [&_svg]:f8w-pointer-events-none [&_svg]:f8w-size-4 [&_svg]:f8w-shrink-0",
      inset && "f8w-pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "f8w-relative f8w-flex f8w-cursor-default f8w-select-none f8w-items-center f8w-rounded-sm f8w-py-1.5 f8w-pl-8 f8w-pr-2 f8w-text-sm f8w-outline-none f8w-transition-colors focus:f8w-bg-accent focus:f8w-text-accent-foreground data-[disabled]:f8w-pointer-events-none data-[disabled]:f8w-opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="f8w-absolute f8w-left-2 f8w-flex f8w-h-3.5 f8w-w-3.5 f8w-items-center f8w-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="f8w-h-4 f8w-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "f8w-relative f8w-flex f8w-cursor-default f8w-select-none f8w-items-center f8w-rounded-sm f8w-py-1.5 f8w-pl-8 f8w-pr-2 f8w-text-sm f8w-outline-none f8w-transition-colors focus:f8w-bg-accent focus:f8w-text-accent-foreground data-[disabled]:f8w-pointer-events-none data-[disabled]:f8w-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="f8w-absolute f8w-left-2 f8w-flex f8w-h-3.5 f8w-w-3.5 f8w-items-center f8w-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="f8w-h-2 f8w-w-2 f8w-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "f8w-px-2 f8w-py-1.5 f8w-text-sm f8w-font-semibold",
      inset && "f8w-pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("f8w--mx-1 f8w-my-1 f8w-h-px f8w-bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "f8w-ml-auto f8w-text-xs f8w-tracking-widest f8w-opacity-60",
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
