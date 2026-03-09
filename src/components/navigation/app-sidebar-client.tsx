'use client';

import * as React from 'react';
import { AppSidebar } from '@/components/navigation/app-sidebar';

export function AppSidebarClient() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid SSR/client ID mismatches from Radix/Base UI generated ids.
  if (!mounted) {
    return null;
  }

  return <AppSidebar />;
}
