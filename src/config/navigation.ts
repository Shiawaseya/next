import { LayoutDashboard, Users, Settings, FileText, ShoppingCart, Mail } from "lucide-react";

export type NavItem = {
    title: string;
    href?: string; // Optional if it's just a parent toggle
    icon?: any;
    subItems?: Omit<NavItem, 'subItems'>[]; // Nested children
};

export type ProgramConfig = {
    id: string;
    title: string;
    icon: any;
    items: NavItem[];
};

export const navigationConfig: ProgramConfig[] = [
    {
        id: "core",
        title: "Core System",
        icon: LayoutDashboard,
        items: [
            { title: "Dashboard", href: "/dashboard" },
            { title: "Analytics", href: "/dashboard/core/analytics" },
            { title: "Reports", href: "/dashboard/core/reports" },
        ],
    },
    {
        id: "hr",
        title: "HR System",
        icon: Users,
        items: [
            { title: "Employees", href: "/dashboard/hr/employees" },
            { title: "Payroll", href: "/dashboard/hr/payroll" },
            { title: "Leave Requests", href: "/dashboard/hr/leaves" },
        ],
    },
    {
        id: "sales",
        title: "Sales System",
        icon: ShoppingCart,
        items: [
            { title: "Orders", href: "/dashboard/sales/orders" },
            { title: "Customers", href: "/dashboard/sales/customers" },
            { title: "Products", href: "/dashboard/sales/products" },
        ],
    },
    {
        id: "communication",
        title: "Comms",
        icon: Mail,
        items: [
            { title: "Inbox", href: "/dashboard/comms/inbox" },
            { title: "Campaigns", href: "/dashboard/comms/campaigns" },
        ],
    },
    {
        id: "settings",
        title: "Settings",
        icon: Settings,
        items: [
            { title: "General", href: "/dashboard/settings/general" },
            { title: "Security", href: "/dashboard/settings/security" },
            { title: "Billing", href: "/dashboard/settings/billing" },
        ],
    },
];
