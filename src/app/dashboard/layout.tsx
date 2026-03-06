import { NavigationProvider } from "@/components/navigation/navigation-context"
import { PrimaryNav } from "@/components/navigation/primary-nav"
import { SecondaryNav } from "@/components/navigation/secondary-nav"
import { TopBar } from "@/components/navigation/top-bar"
import { MobileNavOverlay } from "@/components/navigation/mobile-nav-overlay"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <NavigationProvider>
            <div className="flex h-full w-full bg-background overflow-hidden relative">
                <PrimaryNav />
                <SecondaryNav />
                <MobileNavOverlay />

                <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/30">
                    <TopBar />
                    <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
                        <div className="mx-auto max-w-6xl w-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </NavigationProvider>
    )
}
