"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useNavigation } from "./navigation-context"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"

export function SecondaryNav() {
    const { activeProgram, isSecondaryNavOpen, isMobileMenuOpen, setMobileMenuOpen } = useNavigation();
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    // Close mobile menu when pathname changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname, setMobileMenuOpen]);

    const toggleMenu = (title: string) => {
        setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
    }

    if (!isSecondaryNavOpen) return null;

    return (
        <div className={cn(
            "w-64 h-full bg-secondary/30 border-r border-border flex-col shrink-0 transition-all duration-300",
            "absolute md:relative inset-y-0 start-16 md:start-0 z-40 bg-background md:bg-secondary/30 shadow-xl md:shadow-none",
            isMobileMenuOpen ? "flex" : "hidden md:flex"
        )}>
            <div className="h-16 flex items-center px-6 border-b border-border">
                <h2 className="font-semibold text-lg tracking-tight">
                    {activeProgram.title}
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">
                <nav className="flex flex-col gap-1">
                    {activeProgram.items.map((item) => {
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isExpanded = openMenus[item.title];

                        // Check if parent or any child is active
                        const isActive = item.href
                            ? pathname === item.href || pathname.startsWith(item.href + '/')
                            : item.subItems?.some(sub => sub.href && (pathname === sub.href || pathname.startsWith(sub.href + '/')));

                        if (hasSubItems) {
                            return (
                                <div key={item.title} className="flex flex-col gap-1">
                                    <button
                                        onClick={() => toggleMenu(item.title)}
                                        className={cn(
                                            "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left",
                                            isActive && !isExpanded
                                                ? "text-primary font-semibold"
                                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                        )}
                                    >
                                        {item.title}
                                        <ChevronRight
                                            size={16}
                                            className={cn("transition-transform duration-200", isExpanded ? "rotate-90" : "rtl:-rotate-180")}
                                        />
                                    </button>

                                    {isExpanded && (
                                        <div className="flex flex-col gap-1 pl-4 rtl:pl-0 rtl:pr-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-border ml-4 rtl:ml-0 rtl:mr-4 mt-1">
                                            {item.subItems!.map((sub) => {
                                                const isSubActive = sub.href && (pathname === sub.href || pathname.startsWith(sub.href + '/'));
                                                return (
                                                    <Link
                                                        key={sub.title}
                                                        href={sub.href!}
                                                        className={cn(
                                                            "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                                                            isSubActive
                                                                ? "bg-accent/80 text-foreground font-medium shadow-sm"
                                                                : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                                                        )}
                                                    >
                                                        {sub.title}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        }

                        return (
                            <Link
                                key={item.title}
                                href={item.href!}
                                className={cn(
                                    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-accent text-accent-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                )}
                            >
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}
