"use client";

import { AppSidebarClient } from "@/components/navigation/app-sidebar-client";
import { TopBar } from "@/components/navigation/top-bar";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/animate-ui/components/radix/sidebar";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAuthenticated } = useAuth(true);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated, the hook will redirect to /unauthorized
  // This is just a safeguard
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebarClient />
      <SidebarInset className="bg-muted/30 flex flex-col flex-1 h-screen overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <div className="mx-auto max-w-6xl w-full">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
