"use client"

import { useTheme } from "next-themes"
import { useDir } from "@/components/dir-provider"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Moon, Sun, Languages, User } from "lucide-react"
import { SidebarTrigger } from "@/components/animate-ui/components/radix/sidebar"
import { Separator } from "@/components/ui/separator"
import { navigationConfig } from "@/config/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function TopBar() {
    const { theme, setTheme } = useTheme()
    const { toggleRtl } = useDir()
    const pathname = usePathname()

    const activeProgram = navigationConfig.find((program) => pathname.includes(`/${program.id}`)) ?? navigationConfig[0]

    const matched = (() => {
        if (!activeProgram) return { item: undefined as any, subItem: undefined as any }

        let bestItem: any = undefined
        let bestSubItem: any = undefined
        let bestLen = -1

        for (const item of activeProgram.items) {
            if (item.href && (pathname === item.href || pathname.startsWith(item.href + "/"))) {
                const len = item.href.length
                if (len > bestLen) {
                    bestItem = item
                    bestSubItem = undefined
                    bestLen = len
                }
            }

            for (const subItem of item.subItems ?? []) {
                if (subItem.href && (pathname === subItem.href || pathname.startsWith(subItem.href + "/"))) {
                    const len = subItem.href.length
                    if (len > bestLen) {
                        bestItem = item
                        bestSubItem = subItem
                        bestLen = len
                    }
                }
            }
        }

        return { item: bestItem, subItem: bestSubItem }
    })()

    const rootHref = activeProgram?.items?.[0]?.href ?? "/dashboard"

    return (
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6 shrink-0 z-10 w-full relative">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink asChild>
                                <Link href={rootHref}>{activeProgram?.title || "Dashboard"}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {matched.item && (
                            <>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    {matched.subItem ? (
                                        <BreadcrumbLink asChild>
                                            <Link href={matched.item.href || "#"}>{matched.item.title}</Link>
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>{matched.item.title}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                            </>
                        )}

                        {matched.subItem && (
                            <>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{matched.subItem.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={toggleRtl}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                    title="Toggle RTL"
                >
                    <Languages size={20} />
                    <span className="sr-only">Toggle RTL</span>
                </button>

                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                    title="Toggle Theme"
                >
                    <Sun size={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </button>

                <div className="h-8 w-px bg-border mx-1"></div>

                <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium hover:bg-primary/20 transition-colors">
                    <User size={20} />
                </button>
            </div>
        </header>
    )
}
