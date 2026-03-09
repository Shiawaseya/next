// Auto-generated navigation config from dashboard folder structure
// DO NOT EDIT MANUALLY - run `npm run generate:nav` to regenerate

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

const RAW_CONFIG = [
  {
    "id": "core",
    "title": "Core",
    "icon": "LayoutDashboard",
    "items": [
      {
        "title": "Analytics",
        "href": "/dashboard/core/analytics",
        "icon": "BarChart3"
      },
      {
        "title": "Reports",
        "href": "/dashboard/core/reports",
        "icon": "FileText"
      }
    ]
  },
  {
    "id": "hr",
    "title": "HR",
    "icon": "Users",
    "items": [
      {
        "title": "Employees",
        "href": "/dashboard/hr/employees",
        "icon": "Users2"
      },
      {
        "title": "Leaves",
        "href": "/dashboard/hr/leaves",
        "icon": "CalendarDays"
      },
      {
        "title": "Payroll",
        "href": "/dashboard/hr/payroll",
        "icon": "Wallet"
      }
    ]
  },
  {
    "id": "leave-management",
    "title": "Leave Management",
    "icon": "CalendarClock",
    "items": [
      {
        "title": "Overview",
        "href": "/dashboard/leave-management",
        "icon": "House"
      },
      {
        "title": "Policies",
        "href": "/dashboard/leave-management/policies",
        "icon": "ScrollText",
        "subItems": [
          {
            "title": "Annual",
            "href": "/dashboard/leave-management/policies/annual",
            "icon": "CalendarRange"
          },
          {
            "title": "Sick",
            "href": "/dashboard/leave-management/policies/sick",
            "icon": "Stethoscope"
          }
        ]
      },
      {
        "title": "Requests",
        "href": "/dashboard/leave-management/requests",
        "icon": "Inbox",
        "subItems": [
          {
            "title": "History",
            "href": "/dashboard/leave-management/requests/history",
            "icon": "History"
          },
          {
            "title": "Pending",
            "href": "/dashboard/leave-management/requests/pending",
            "icon": "Clock3"
          }
        ]
      }
    ]
  },
  {
    "id": "sales",
    "title": "Sales",
    "icon": "ShoppingCart",
    "items": [
      {
        "title": "Customers",
        "href": "/dashboard/sales/customers",
        "icon": "Contact"
      },
      {
        "title": "Orders",
        "href": "/dashboard/sales/orders",
        "icon": "ShoppingBag"
      },
      {
        "title": "Products",
        "href": "/dashboard/sales/products",
        "icon": "Package"
      }
    ]
  },
  {
    "id": "settings",
    "title": "Settings",
    "icon": "Settings",
    "items": [
      {
        "title": "Billing",
        "href": "/dashboard/settings/billing",
        "icon": "CreditCard"
      },
      {
        "title": "General",
        "href": "/dashboard/settings/general",
        "icon": "Settings2"
      },
      {
        "title": "Security",
        "href": "/dashboard/settings/security",
        "icon": "ShieldCheck"
      }
    ]
  }
];

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
