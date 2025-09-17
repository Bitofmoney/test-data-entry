
import { Home, FileText, BarChart3, User, Settings, Database, LogOut, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";
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
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

interface AppSidebarProps {
  user: User;
  onLogout: () => void;
}

export function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const [location] = useLocation();

  // Base navigation items for all users
  const baseNavItems = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Data Entry", url: "/data-entry", icon: FileText },
    { title: "Records", url: "/records", icon: Database },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
    { title: "Profile", url: "/profile", icon: User },
  ];

  // Admin-only navigation items
  const adminNavItems = [
    { title: "Admin Panel", url: "/admin", icon: Shield },
  ];

  // Combine nav items based on user role
  const navItems = user.role === 'admin' 
    ? [...baseNavItems, ...adminNavItems]
    : baseNavItems;

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">DataEntry Pro</h2>
            <p className="text-xs text-muted-foreground">
              {user.role === 'admin' ? 'Administrator' : 'User'} Panel
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="space-y-2">
          <div className="text-sm">
            <p className="font-medium">{user.username}</p>
            <p className="text-muted-foreground capitalize">{user.role}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
