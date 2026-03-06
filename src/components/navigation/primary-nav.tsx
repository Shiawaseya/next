"use client"

import { navigationConfig } from "@/config/navigation"
import { useNavigation } from "./navigation-context"
import { cn } from "@/lib/utils"

export function PrimaryNav() {
    const { activeProgram, setActiveProgramById, isMobileMenuOpen } = useNavigation();

    return (
        <div className={cn(
            "w-16 h-full bg-primary flex-col items-center py-4 border-r border-border shrink-0 z-50",
            "absolute md:relative inset-y-0 start-0 transition-transform shadow-xl md:shadow-none",
            isMobileMenuOpen ? "flex translate-x-0" : "hidden md:flex"
        )}>
            <div className="mb-8">
                {/* Logo placeholder */}
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-bold text-accent-foreground">
                    B
                </div>
            </div>

            <nav className="flex flex-col gap-4 w-full px-2">
                {navigationConfig.map((program) => {
                    const Icon = program.icon;
                    const isActive = activeProgram.id === program.id;

                    return (
                        <button
                            key={program.id}
                            onClick={() => setActiveProgramById(program.id)}
                            className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group relative",
                                isActive
                                    ? "bg-primary-foreground text-primary shadow-sm"
                                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                            )}
                            title={program.title}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                            {/* Tooltip */}
                            <div className="absolute ltr:left-14 rtl:right-14 opacity-0 group-hover:opacity-100 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                {program.title}
                            </div>
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}
