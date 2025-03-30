
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Bug, Map, FileExport, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items for the main navigation
const menuItems = [
  {
    title: "User Management",
    icon: User,
    path: "/dashboard/users",
  },
  {
    title: "Issues",
    icon: Bug,
    path: "/dashboard/issues",
  },
  {
    title: "All Tours",
    icon: Map,
    path: "/dashboard/tours",
  },
  {
    title: "Exports",
    icon: FileExport,
    path: "/dashboard/exports",
  },
];

export const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout, user } = useAuth();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4">
        <h2 className="text-xl font-bold text-purple-900">Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleMenuClick(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          {user && (
            <div className="mb-4 text-sm text-sidebar-foreground">
              <p className="font-medium">Logged in as:</p>
              <p>{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
            </div>
          )}
          <SidebarMenuButton 
            onClick={handleLogout} 
            className="w-full justify-start"
            variant="outline"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
