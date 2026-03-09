import { AppSidebarClient } from "@/components/navigation/app-sidebar-client"
import { TopBar } from "@/components/navigation/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/animate-ui/components/radix/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebarClient />
            <SidebarInset className="bg-muted/30 flex flex-col flex-1 h-screen overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
                    <div className="mx-auto max-w-6xl w-full">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
