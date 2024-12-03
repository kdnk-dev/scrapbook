import "./globals.css";
import "@kdnk.dev/forms/form-style.css";
import "@uiw/react-textarea-code-editor/dist.css";

import type { Metadata } from "next";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Breadcrumbs from "@/components/breadcrumbs";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "kdnk scrapbook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"light"}
          themes={["light", "dark", "colours"]}
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="f8w-flex f8w-h-16 f8w-shrink-0 f8w-items-center f8w-gap-2 f8w-border-b">
                <div className="f8w-flex f8w-items-center f8w-gap-2 f8w-px-3">
                  <SidebarTrigger />
                  <Separator
                    orientation="vertical"
                    className="f8w-mr-2 f8w-h-4"
                  />
                  <Breadcrumbs />
                </div>
              </header>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
