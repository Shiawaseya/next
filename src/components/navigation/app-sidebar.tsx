"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/animate-ui/primitives/radix/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  LogOut,
  Plus,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { navigationConfig } from "@/config/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { env } from "@/config/env";

export const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Call backend logout endpoint
        await fetch(`${env.apiUrl}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local storage and redirect
      logout();
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.substring(0, 2).toUpperCase();
  };

  // Auto-detect active system from current pathname
  const activeProgram = React.useMemo(() => {
    for (const program of navigationConfig) {
      if (pathname.includes(`/${program.id}`)) {
        return program;
      }
    }
    // Default to first program
    return navigationConfig[0];
  }, [pathname]);

  // Check if link is active based on pathname
  const isLinkActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const imageStyle = {
    // borderRadius: "50%",
    // border: "1px solid #fff",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            bounce: 0.5,
          }}
          className="mx-auto bg-primary/10 text-primary rounded-2xl flex flex-col items-center justify-center font-bold text-xl mb-6 ring-1 ring-primary/20 backdrop-blur-md p-2"
        >
          <Image
            src="/logo.png"
            width={500}
            height={500}
            alt="n2a1"
            preload={true}
          />
        </motion.div>
      </SidebarHeader> */}

      <SidebarHeader>
        {/* System Switcher - Dynamic from navigationConfig */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <activeProgram.icon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeProgram.title}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Systems
                </DropdownMenuLabel>
                {navigationConfig.map((system, index) => (
                  <DropdownMenuItem
                    key={system.id}
                    asChild
                    className="gap-2 p-2"
                  >
                    <Link href={system.items[0]?.href || "/dashboard"}>
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <system.icon className="size-4 shrink-0" />
                      </div>
                      {system.title}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Nav Main - Auto from active system */}
        <SidebarGroup>
          <SidebarGroupLabel>{activeProgram.title}</SidebarGroupLabel>
          <SidebarMenu>
            {activeProgram.items.map((item) => {
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isActive = isLinkActive(item.href);

              // If no subItems, render as simple button
              if (!hasSubItems) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link href={item.href || "#"}>
                        {item.icon && <item.icon className="size-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              // If has subItems, render with collapsible
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive}>
                        {item.icon && <item.icon className="size-4" />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems!.map((subItem) => {
                          const isSubActive = isLinkActive(subItem.href);
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isSubActive}
                              >
                                <Link href={subItem.href || "#"}>
                                  {subItem.icon && (
                                    <subItem.icon className="size-4" />
                                  )}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* User Profile */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.employee_id || "User"}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email || "Not logged in"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.employee_id || "User"}
                      </span>
                      <span className="truncate text-xs">
                        {user?.email || "Not logged in"}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
