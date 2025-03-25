import {
  Joystick,
  LayoutDashboard,
  AlertTriangle,
  WandSparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Control Panel",
    url: "/dashboard",
    sub: [
      {
        title: "Alerts",
        url: "/dashboard/alerts",
        icon: AlertTriangle,
      },
      {
        title: "Optimization",
        url: "/dashboard/optimization",
        icon: WandSparkles,
      },
    ],
    icon: LayoutDashboard,
  },
  {
    title: "Luma Assistant",
    url: "/assistant",
    icon: Joystick,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="pt-14">
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.sub && (
                    <SidebarMenuSub>
                      {item.sub.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <subItem.icon />
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
