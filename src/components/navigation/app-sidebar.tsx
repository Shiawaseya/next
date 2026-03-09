"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation } from "./navigation-context";
import { navigationConfig } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronsUpDown } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@/components/animate-ui/components/radix/sidebar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const { activeProgram, setActiveProgramById } = useNavigation();
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

    const toggleMenu = (title: string, e: React.MouseEvent) => {
        e.preventDefault();
        setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu className="gap-2 pb-2 border-b border-border mb-2">
                    {navigationConfig.map((program) => {
                        const Icon = program.icon;
                        const isActive = activeProgram.id === program.id;
                        return (
                            <SidebarMenuItem key={program.id}>
                                <SidebarMenuButton
                                    isActive={isActive}
                                    onClick={() => setActiveProgramById(program.id)}
                                    tooltip={program.title}
                                    size="lg"
                                    className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="size-4" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">{program.title}</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{activeProgram.title} Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {activeProgram.items.map((item) => {
                            const hasSubItems = item.subItems && item.subItems.length > 0;

                            // Check if parent or any child is active
                            const isActive = item.href
                                ? pathname === item.href || pathname.startsWith(item.href + "/")
                                : item.subItems?.some(
                                    (sub) =>
                                        sub.href &&
                                        (pathname === sub.href ||
                                            pathname.startsWith(sub.href + "/")),
                                );

                            const isExpanded = openMenus[item.title];

                            if (hasSubItems) {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={isActive}
                                            onClick={(e) => toggleMenu(item.title, e)}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight
                                                className={cn(
                                                    "ml-auto transition-transform duration-200",
                                                    isExpanded && "rotate-90"
                                                )}
                                            />
                                        </SidebarMenuButton>
                                        {isExpanded && (
                                            <SidebarMenuSub>
                                                {item.subItems!.map((sub) => {
                                                    const isSubActive =
                                                        sub.href &&
                                                        (pathname === sub.href ||
                                                            pathname.startsWith(sub.href + "/"));
                                                    return (
                                                        <SidebarMenuSubItem key={sub.title}>
                                                            <SidebarMenuSubButton asChild isActive={!!isSubActive}>
                                                                <Link href={sub.href!}>
                                                                    <span>{sub.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        )}
                                    </SidebarMenuItem>
                                );
                            }

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={!!isActive} tooltip={item.title}>
                                        <Link href={item.href!}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold">
                                B
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Acme Inc</span>
                                <span className="truncate text-xs">Workspace</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
