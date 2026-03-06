"use client"

import * as React from "react"

type DirContextType = {
    isRtl: boolean;
    toggleRtl: () => void;
}

const DirContext = React.createContext<DirContextType | undefined>(undefined);

export function DirProvider({
    children,
    defaultRtl = false
}: {
    children: React.ReactNode,
    defaultRtl?: boolean
}) {
    const [isRtl, setIsRtl] = React.useState(defaultRtl);

    React.useEffect(() => {
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    }, [isRtl]);

    const toggleRtl = React.useCallback(() => {
        setIsRtl(prev => !prev);
    }, []);

    return (
        <DirContext.Provider value={{ isRtl, toggleRtl }}>
            <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full">
                {children}
            </div>
        </DirContext.Provider>
    )
}

export function useDir() {
    const context = React.useContext(DirContext);
    if (context === undefined) {
        throw new Error("useDir must be used within a DirProvider");
    }
    return context;
}
