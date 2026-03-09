#!/usr/bin/env node
/**
 * Build script to generate navigation config from dashboard folder structure.
 * It creates src/config/navigation-generated.ts, which is safe to import in client code.
 */

import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const SYSTEM_ICONS = {
  core: 'LayoutDashboard',
  hr: 'Users',
  sales: 'ShoppingCart',
  comms: 'Mail',
  communication: 'Mail',
  settings: 'Settings',
  'leave-management': 'CalendarClock',
};

const ROUTE_ICONS = {
  overview: 'House',
  analytics: 'BarChart3',
  reports: 'FileText',
  employees: 'Users2',
  leaves: 'CalendarDays',
  payroll: 'Wallet',
  customers: 'Contact',
  orders: 'ShoppingBag',
  products: 'Package',
  billing: 'CreditCard',
  general: 'Settings2',
  security: 'ShieldCheck',
  requests: 'Inbox',
  pending: 'Clock3',
  history: 'History',
  policies: 'ScrollText',
  annual: 'CalendarRange',
  sick: 'Stethoscope',
};

function folderNameToTitle(folderName) {
  return folderName
    .split('-')
    .map((word) => {
      if (word === 'comms') return 'Comms';
      if (word === 'hr') return 'HR';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function getDirectories(path) {
  return readdirSync(path).filter((entry) => {
    if (entry.startsWith('.')) return false;
    const fullPath = join(path, entry);
    try {
      return statSync(fullPath).isDirectory();
    } catch {
      return false;
    }
  });
}

function hasPageFile(dirPath) {
  try {
    const files = readdirSync(dirPath);
    return files.some((f) => f.startsWith('page.'));
  } catch {
    return false;
  }
}

function iconForRouteSegment(segment) {
  return ROUTE_ICONS[segment.toLowerCase()] || 'FileText';
}

function generateConfig() {
  const dashboardPath = join(process.cwd(), 'src', 'app', 'dashboard');
  const programs = [];

  for (const systemFolder of getDirectories(dashboardPath)) {
    const systemPath = join(dashboardPath, systemFolder);
    const items = [];

    // Root route for system, if present.
    if (hasPageFile(systemPath)) {
      items.push({
        title: 'Overview',
        href: `/dashboard/${systemFolder}`,
        icon: iconForRouteSegment('overview'),
      });
    }

    // One-level nested routes under each section.
    for (const sectionFolder of getDirectories(systemPath)) {
      const sectionPath = join(systemPath, sectionFolder);
      if (!hasPageFile(sectionPath)) continue;

      const sectionItem = {
        title: folderNameToTitle(sectionFolder),
        href: `/dashboard/${systemFolder}/${sectionFolder}`,
        icon: iconForRouteSegment(sectionFolder),
      };

      const subItems = [];
      for (const nestedFolder of getDirectories(sectionPath)) {
        const nestedPath = join(sectionPath, nestedFolder);
        if (!hasPageFile(nestedPath)) continue;

        subItems.push({
          title: folderNameToTitle(nestedFolder),
          href: `/dashboard/${systemFolder}/${sectionFolder}/${nestedFolder}`,
          icon: iconForRouteSegment(nestedFolder),
        });
      }

      if (subItems.length > 0) {
        sectionItem.subItems = subItems;
      }

      items.push(sectionItem);
    }

    if (items.length > 0) {
      programs.push({
        id: systemFolder.toLowerCase(),
        title: folderNameToTitle(systemFolder),
        icon: SYSTEM_ICONS[systemFolder.toLowerCase()] || 'LayoutDashboard',
        items,
      });
    }
  }

  return programs;
}

const config = generateConfig();

const tsContent = `// Auto-generated navigation config from dashboard folder structure
// DO NOT EDIT MANUALLY - run \`npm run generate:nav\` to regenerate

import {
  LayoutDashboard,
  Users,
  Settings,
  Mail,
  ShoppingCart,
  CalendarClock,
  House,
  BarChart3,
  FileText,
  Users2,
  CalendarDays,
  Wallet,
  Contact,
  ShoppingBag,
  Package,
  CreditCard,
  Settings2,
  ShieldCheck,
  Inbox,
  Clock3,
  History,
  ScrollText,
  CalendarRange,
  Stethoscope,
} from 'lucide-react';

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

const ICON_MAP = {
  LayoutDashboard,
  Users,
  Settings,
  Mail,
  ShoppingCart,
  CalendarClock,
  House,
  BarChart3,
  FileText,
  Users2,
  CalendarDays,
  Wallet,
  Contact,
  ShoppingBag,
  Package,
  CreditCard,
  Settings2,
  ShieldCheck,
  Inbox,
  Clock3,
  History,
  ScrollText,
  CalendarRange,
  Stethoscope,
};

const RAW_CONFIG = ${JSON.stringify(config, null, 2)};

const mapNavItems = (items: any[]): NavItem[] =>
  items.map((item: any) => ({
    ...item,
    icon: item.icon ? ICON_MAP[item.icon] || FileText : undefined,
    subItems: item.subItems ? mapNavItems(item.subItems) : undefined,
  }));

export const navigationConfig: ProgramConfig[] = RAW_CONFIG.map((program: any) => ({
  ...program,
  icon: ICON_MAP[program.icon] || LayoutDashboard,
  items: mapNavItems(program.items),
}));
`;

const outputPath = resolve(process.cwd(), 'src', 'config', 'navigation-generated.ts');
writeFileSync(outputPath, tsContent, 'utf-8');

const totalItems = config.reduce((sum, system) => sum + system.items.length, 0);
console.log('Navigation config generated.');
console.log(`Output: ${outputPath}`);
console.log(`Systems: ${config.length}, Items: ${totalItems}`);
