"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "f8w-group/sidebar-wrapper f8w-flex f8w-min-h-svh f8w-w-full has-[[data-variant=inset]]:f8w-bg-sidebar",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "f8w-flex f8w-h-full f8w-w-[--sidebar-width] f8w-flex-col f8w-bg-sidebar f8w-text-sidebar-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="f8w-w-[--sidebar-width] f8w-bg-sidebar f8w-p-0 f8w-text-sidebar-foreground [&>button]:f8w-hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="f8w-flex f8w-h-full f8w-w-full f8w-flex-col">
              {children}
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="f8w-group f8w-peer f8w-hidden md:f8w-block f8w-text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "f8w-duration-200 f8w-relative f8w-h-svh f8w-w-[--sidebar-width] f8w-bg-transparent f8w-transition-[width] f8w-ease-linear",
            "group-data-[collapsible=offcanvas]:f8w-w-0",
            "group-data-[side=right]:f8w-rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:f8w-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:f8w-w-[--sidebar-width-icon]",
          )}
        />
        <div
          className={cn(
            "f8w-duration-200 f8w-fixed f8w-inset-y-0 f8w-z-10 f8w-hidden f8w-h-svh f8w-w-[--sidebar-width] f8w-transition-[left,right,width] f8w-ease-linear md:f8w-flex",
            side === "left"
              ? "f8w-left-0 group-data-[collapsible=offcanvas]:f8w-left-[calc(var(--sidebar-width)*-1)]"
              : "f8w-right-0 group-data-[collapsible=offcanvas]:f8w-right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "f8w-p-2 group-data-[collapsible=icon]:f8w-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:f8w-w-[--sidebar-width-icon] group-data-[side=left]:f8w-border-r group-data-[side=right]:f8w-border-l",
            className,
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="f8w-flex f8w-h-full f8w-w-full f8w-flex-col f8w-bg-sidebar group-data-[variant=floating]:f8w-rounded-lg group-data-[variant=floating]:f8w-border group-data-[variant=floating]:f8w-border-sidebar-border group-data-[variant=floating]:f8w-shadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("f8w-h-7 f8w-w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="f8w-sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "f8w-absolute f8w-inset-y-0 f8w-z-20 f8w-hidden f8w-w-4 f8w--translate-x-1/2 f8w-transition-all f8w-ease-linear after:f8w-absolute after:f8w-inset-y-0 after:f8w-left-1/2 after:f8w-w-[2px] hover:after:f8w-bg-sidebar-border group-data-[side=left]:f8w--right-4 group-data-[side=right]:f8w-left-0 sm:f8w-flex",
        "[[data-side=left]_&]:f8w-cursor-w-resize [[data-side=right]_&]:f8w-cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:f8w-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:f8w-cursor-w-resize",
        "group-data-[collapsible=offcanvas]:f8w-translate-x-0 group-data-[collapsible=offcanvas]:after:f8w-left-full group-data-[collapsible=offcanvas]:hover:f8w-bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:f8w--right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:f8w--left-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "f8w-relative f8w-flex f8w-min-h-svh f8w-flex-1 f8w-flex-col f8w-bg-background",
        "peer-data-[variant=inset]:f8w-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:f8w-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:f8w-ml-2 md:peer-data-[variant=inset]:f8w-ml-0 md:peer-data-[variant=inset]:f8w-rounded-xl md:peer-data-[variant=inset]:f8w-shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "f8w-h-8 f8w-w-full f8w-bg-background f8w-shadow-none focus-visible:f8w-ring-2 focus-visible:f8w-ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("f8w-flex f8w-flex-col f8w-gap-2 f8w-p-2", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("f8w-flex f8w-flex-col f8w-gap-2 f8w-p-2", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("f8w-mx-2 f8w-w-auto f8w-bg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "f8w-flex f8w-min-h-0 f8w-flex-1 f8w-flex-col f8w-gap-2 f8w-overflow-auto group-data-[collapsible=icon]:f8w-overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn(
        "f8w-relative f8w-flex f8w-w-full f8w-min-w-0 f8w-flex-col f8w-p-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "f8w-duration-200 f8w-flex f8w-h-8 f8w-shrink-0 f8w-items-center f8w-rounded-md f8w-px-2 f8w-text-xs f8w-font-medium f8w-text-sidebar-foreground/70 f8w-outline-none f8w-ring-sidebar-ring f8w-transition-[margin,opa] f8w-ease-linear focus-visible:f8w-ring-2 [&>svg]:f8w-size-4 [&>svg]:f8w-shrink-0",
        "group-data-[collapsible=icon]:f8w--mt-8 group-data-[collapsible=icon]:f8w-opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "f8w-absolute f8w-right-3 f8w-top-3.5 f8w-flex f8w-aspect-square f8w-w-5 f8w-items-center f8w-justify-center f8w-rounded-md f8w-p-0 f8w-text-sidebar-foreground f8w-outline-none f8w-ring-sidebar-ring f8w-transition-transform hover:f8w-bg-sidebar-accent hover:f8w-text-sidebar-accent-foreground focus-visible:f8w-ring-2 [&>svg]:f8w-size-4 [&>svg]:f8w-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:f8w-absolute after:f8w--inset-2 after:md:f8w-hidden",
        "group-data-[collapsible=icon]:f8w-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("f8w-w-full f8w-text-sm", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn(
      "f8w-flex f8w-w-full f8w-min-w-0 f8w-flex-col f8w-gap-1",
      className,
    )}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("f8w-group/menu-item f8w-relative", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "f8w-peer/menu-button f8w-flex f8w-w-full f8w-items-center f8w-gap-2 f8w-overflow-hidden f8w-rounded-md f8w-p-2 f8w-text-left f8w-text-sm f8w-outline-none f8w-ring-sidebar-ring f8w-transition-[width,height,padding] hover:f8w-bg-sidebar-accent hover:f8w-text-sidebar-accent-foreground focus-visible:f8w-ring-2 active:f8w-bg-sidebar-accent active:f8w-text-sidebar-accent-foreground disabled:f8w-pointer-events-none disabled:f8w-opacity-50 f8w-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:f8w-pointer-events-none aria-disabled:f8w-opacity-50 data-[active=true]:f8w-bg-sidebar-accent data-[active=true]:f8w-font-medium data-[active=true]:f8w-text-sidebar-accent-foreground data-[state=open]:hover:f8w-bg-sidebar-accent data-[state=open]:hover:f8w-text-sidebar-accent-foreground group-data-[collapsible=icon]:f8w-!size-8 group-data-[collapsible=icon]:f8w-!p-2 [&>span:last-child]:f8w-truncate [&>svg]:f8w-size-4 [&>svg]:f8w-shrink-0",
  {
    variants: {
      variant: {
        default:
          "hover:f8w-bg-sidebar-accent hover:f8w-text-sidebar-accent-foreground",
        outline:
          "f8w-bg-background f8w-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:f8w-bg-sidebar-accent hover:f8w-text-sidebar-accent-foreground hover:f8w-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "f8w-h-8 f8w-text-sm",
        sm: "f8w-h-7 f8w-text-xs",
        lg: "f8w-h-12 f8w-text-sm group-data-[collapsible=icon]:f8w-!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "f8w-absolute f8w-right-1 f8w-top-1.5 f8w-flex f8w-aspect-square f8w-w-5 f8w-items-center f8w-justify-center f8w-rounded-md f8w-p-0 f8w-text-sidebar-foreground f8w-outline-none f8w-ring-sidebar-ring f8w-transition-transform hover:f8w-bg-sidebar-accent hover:f8w-text-sidebar-accent-foreground focus-visible:f8w-ring-2 f8w-peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:f8w-size-4 [&>svg]:f8w-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:f8w-absolute after:f8w--inset-2 after:md:f8w-hidden",
        "f8w-peer-data-[size=sm]/menu-button:top-1",
        "f8w-peer-data-[size=default]/menu-button:top-1.5",
        "f8w-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:f8w-hidden",
        showOnHover &&
          "f8w-group-focus-within/menu-item:opacity-100 f8w-group-hover/menu-item:opacity-100 data-[state=open]:f8w-opacity-100 f8w-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:f8w-opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "f8w-absolute f8w-right-1 f8w-flex f8w-h-5 f8w-min-w-5 f8w-items-center f8w-justify-center f8w-rounded-md f8w-px-1 f8w-text-xs f8w-font-medium f8w-tabular-nums f8w-text-sidebar-foreground f8w-select-none f8w-pointer-events-none",
      "f8w-peer-hover/menu-button:text-sidebar-accent-foreground f8w-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "f8w-peer-data-[size=sm]/menu-button:top-1",
      "f8w-peer-data-[size=default]/menu-button:top-1.5",
      "f8w-peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:f8w-hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn(
        "f8w-rounded-md f8w-h-8 f8w-flex f8w-gap-2 f8w-px-2 f8w-items-center",
        className,
      )}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="f8w-size-4 f8w-rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="f8w-h-4 f8w-flex-1 f8w-max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "f8w-mx-3.5 f8w-flex f8w-min-w-0 f8w-translate-x-px f8w-flex-col f8w-gap-1 f8w-border-l f8w-border-sidebar-border f8w-px-2.5 f8w-py-0.5",
      "group-data-[collapsible=icon]:f8w-hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "f8w-flex f8w-h-7 f8w-min-w-0 f8w--translate-x-px f8w-items-center f8w-gap-2 f8w-overflow-hidden f8w-rounded-md f8w-px-2 f8w-text-sidebar-foreground f8w-outline-none f8w-ring-sidebar-ring hover:f8w-bg-sidebar-accent hover:f8w-text-sidebar-accent-foreground focus-visible:f8w-ring-2 active:f8w-bg-sidebar-accent active:f8w-text-sidebar-accent-foreground disabled:f8w-pointer-events-none disabled:f8w-opacity-50 aria-disabled:f8w-pointer-events-none aria-disabled:f8w-opacity-50 [&>span:last-child]:f8w-truncate [&>svg]:f8w-size-4 [&>svg]:f8w-shrink-0 [&>svg]:f8w-text-sidebar-accent-foreground",
        "data-[active=true]:f8w-bg-sidebar-accent data-[active=true]:f8w-text-sidebar-accent-foreground",
        size === "sm" && "f8w-text-xs",
        size === "md" && "f8w-text-sm",
        "group-data-[collapsible=icon]:f8w-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
