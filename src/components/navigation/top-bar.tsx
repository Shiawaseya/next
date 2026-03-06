"use client"

import { useTheme } from "next-themes"
import { useDir } from "@/components/dir-provider"
import { Moon, Sun, Languages, User, Menu } from "lucide-react"
import { useNavigation } from "./navigation-context"

export function TopBar() {
    const { theme, setTheme } = useTheme()
    const { isRtl, toggleRtl } = useDir()
    const { isMobileMenuOpen, setMobileMenuOpen } = useNavigation()

    return (
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6 shrink-0 z-10 w-full relative">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Menu size={20} />
                </button>
                {/* Placeholder for breadcrumbs or title */}
                <span className="text-sm font-medium text-muted-foreground hidden sm:block">Dashboard Overview</span>
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
