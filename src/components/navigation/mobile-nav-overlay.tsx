"use client"

import { useNavigation } from "./navigation-context"
import { cn } from "@/lib/utils"

export function MobileNavOverlay() {
    const { isMobileMenuOpen, setMobileMenuOpen } = useNavigation();

    if (!isMobileMenuOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
        />
    )
}
