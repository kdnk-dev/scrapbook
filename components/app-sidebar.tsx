import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { dirNameToDisplayName } from "@/lib/utils";
import ThemeSelector from "@/components/theme-selector";

// const getRoutes = () =>
//   fs
//     .readdirSync(path.resolve("./app/(component-demos)"))
//     .sort()
//     .map((dir) => ({
//       section: dir,
//       components: fs.readdirSync(path.resolve("./app/(component-demos)", dir)),
//     }));

const getRoutes = () => [
  {
    section: "1_forms",
    components: [
      "1_client-action",
      "2_server-action",
      "3_navigate-action",
      "4~create-&-edit-records",
      "arrays",
      "groups",
      "handle",
    ],
  },
  {
    section: "2_form-inputs",
    components: ["1_built-in", "date-picker", "google-maps-address-box"],
  },
  {
    section: "3_login-&-signup",
    components: ["1_login", "2_signup", "forgot-password", "set-password"],
  },
  {
    section: "4_dynamic-forms",
    components: ["1~create-&-edit-records", "builder", "dynamic-array"],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeSelector />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {getRoutes().map((group) => (
              <SidebarMenuItem key={group.section}>
                <SidebarMenuButton asChild>
                  <span className="f8w-font-medium f8w-capitalize">
                    {dirNameToDisplayName(group.section)}
                  </span>
                </SidebarMenuButton>
                {group.components?.length ? (
                  <SidebarMenuSub>
                    {group.components.map((component) => (
                      <SidebarMenuSubItem key={component}>
                        <SidebarMenuSubButton asChild>
                          <a
                            href={`${component.match(/^[0-9]+~/) ? "/auth" : ""}/${group.section}/${component}`}
                            className={"f8w-capitalize"}
                          >
                            {dirNameToDisplayName(component)}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
