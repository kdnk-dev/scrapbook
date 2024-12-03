"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Check, ChevronsUpDown, Palette } from "lucide-react";
import * as React from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// These need to match the list passed to ThemeProvider in the root layout.tsx
const themes = {
  light: "Light",
  dark: "Dark",
  colours: "Colourful",
};

//This, annoyingly, still causes a delay before showing the theme name.
// This is particularly annoying because it
const CurrentTheme = dynamic(
  () =>
    Promise.resolve((props: { theme: string }) => (
      <span className="">{themes[props.theme as keyof typeof themes]}</span>
    )),
  {
    ssr: false,
  },
);

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:f8w-bg-sidebar-accent data-[state=open]:f8w-text-sidebar-accent-foreground"
        >
          <div className="f8w-flex f8w-aspect-square f8w-size-8 f8w-items-center f8w-justify-center f8w-rounded-lg f8w-border-2">
            <Palette className="f8w-size-4" />
          </div>
          <div className="f8w-flex f8w-flex-col f8w-gap-0.5 f8w-leading-none">
            <span className="f8w-font-semibold">Theme</span>
            <CurrentTheme theme={theme ?? "unknown"} />
          </div>
          <ChevronsUpDown className="f8w-ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="f8w-w-[--radix-dropdown-menu-trigger-width]"
        align="start"
      >
        {Object.keys(themes).map((t) => (
          <DropdownMenuItem key={t} onSelect={() => setTheme(t)}>
            {themes[t as keyof typeof themes]}
            {t === theme && <Check className="f8w-ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
