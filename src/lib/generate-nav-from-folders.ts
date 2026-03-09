import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import {
  LayoutDashboard,
  Users,
  Settings,
  Mail,
  ShoppingCart,
  Home,
  LucideIcon,
} from 'lucide-react';

// Map folder names to icons
const SYSTEM_ICONS: Record<string, LucideIcon> = {
  core: LayoutDashboard,
  hr: Users,
  sales: ShoppingCart,
  comms: Mail,
  communication: Mail,
  settings: Settings,
  home: Home,
};

// Convert folder names to readable titles
function folderNameToTitle(folderName: string): string {
  return folderName
    .split('-')
    .map((word) => {
      // Handle special cases
      if (word === 'comms') return 'Comms';
      if (word === 'hr') return 'HR';
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// Check if a path has a page.tsx file (is a route)
function hasPageFile(dirPath: string): boolean {
  try {
    const files = readdirSync(dirPath);
    return files.includes('page.tsx') || files.includes('page.ts') || files.includes('page.jsx') || files.includes('page.js');
  } catch {
    return false;
  }
}

// Get all valid page routes from a directory
function getRoutes(dirPath: string, basePath: string = ''): Array<{ name: string; path: string }> {
  const routes: Array<{ name: string; path: string }> = [];

  try {
    const items = readdirSync(dirPath);

    for (const item of items) {
      // Skip hidden files and special folders
      if (item.startsWith('.') || item === 'node_modules') continue;

      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        const newBasePath = basePath ? `${basePath}/${item}` : item;

        // If this folder has a page.tsx, it's a route
        if (hasPageFile(fullPath)) {
          routes.push({
            name: folderNameToTitle(item),
            path: newBasePath,
          });
        }

        // Recursively check subdirectories
        const subRoutes = getRoutes(fullPath, newBasePath);
        routes.push(...subRoutes);
      }
    }
  } catch (error) {
    console.warn(`Error reading directory ${dirPath}:`, error);
  }

  return routes;
}

export type NavItem = {
  title: string;
  href?: string;
  icon?: any;
  subItems?: Omit<NavItem, 'subItems'>[];
};

export type ProgramConfig = {
  id: string;
  title: string;
  icon: any;
  items: NavItem[];
};

/**
 * Generate navigation config from dashboard folder structure
 * Each top-level folder becomes a "system" in the switcher
 * Nested folders become sub-items
 */
export function generateNavigationConfig(): ProgramConfig[] {
  const dashboardPath = join(process.cwd(), 'src', 'app', 'dashboard');
  const programs: ProgramConfig[] = [];

  try {
    const systemFolders = readdirSync(dashboardPath).filter((item) => {
      const fullPath = join(dashboardPath, item);
      const stat = statSync(fullPath);
      return stat.isDirectory() && !item.startsWith('.');
    });

    for (const systemFolder of systemFolders) {
      const systemPath = join(dashboardPath, systemFolder);
      const routes = getRoutes(systemPath, systemFolder);

      if (routes.length > 0) {
        // Separate routes by depth
        const topLevelRoutes = routes.filter((r) => !r.path.includes('/'));
        const nestedRoutes = routes.filter((r) => r.path.includes('/'));

        // Group nested routes by their parent
        const grouped: Record<string, NavItem[]> = {};
        for (const route of nestedRoutes) {
          const parts = route.path.split('/');
          if (parts.length > 1) {
            const parentName = folderNameToTitle(parts[0]);
            if (!grouped[parentName]) {
              grouped[parentName] = [];
            }
            grouped[parentName].push({
              title: route.name,
              href: `/dashboard/${route.path}`,
            });
          }
        }

        // Build items array
        const items: NavItem[] = [];

        for (const route of topLevelRoutes) {
          const title = route.name;
          const parentItem: NavItem = {
            title,
            href: `/dashboard/${route.path}`,
          };

          // Add sub-items if this is a parent
          if (grouped[title]) {
            parentItem.subItems = grouped[title];
          }

          items.push(parentItem);
        }

        // Only add to programs if it has items
        if (items.length > 0) {
          const systemIcon = SYSTEM_ICONS[systemFolder.toLowerCase()] || LayoutDashboard;

          programs.push({
            id: systemFolder.toLowerCase(),
            title: folderNameToTitle(systemFolder),
            icon: systemIcon,
            items,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error generating navigation config:', error);
  }

  return programs;
}
