"use client"

import * as React from "react"
import { navigationConfig, ProgramConfig } from "@/config/navigation"

type NavigationContextType = {
    activeProgram: ProgramConfig;
    setActiveProgramById: (id: string) => void;
    isSecondaryNavOpen: boolean;
    setSecondaryNavOpen: (isOpen: boolean) => void;
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (isOpen: boolean) => void;
}

const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [activeProgram, setActiveProgram] = React.useState<ProgramConfig>(navigationConfig[0]);
    const [isSecondaryNavOpen, setSecondaryNavOpen] = React.useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const setActiveProgramById = React.useCallback((id: string) => {
        const program = navigationConfig.find(p => p.id === id);
        if (program) {
            setActiveProgram(program);
            setSecondaryNavOpen(true);
        }
    }, []);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <NavigationContext.Provider value={{
            activeProgram,
            setActiveProgramById,
            isSecondaryNavOpen,
            setSecondaryNavOpen,
            isMobileMenuOpen,
            setMobileMenuOpen
        }}>
            {children}
        </NavigationContext.Provider>
    )
}

export function useNavigation() {
    const context = React.useContext(NavigationContext);
    if (context === undefined) {
        throw new Error("useNavigation must be used within NavigationProvider");
    }
    return context;
}
