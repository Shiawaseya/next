# Guide: Next.js Dashboard Architecture

This guide explains how scaling the application works, how to configure the nested sidebar navigation, and how to create new pages using the App Router.

## 1. App Router Basics

In Next.js 14+ with the App Router, **routing is entirely folder-based**.

- Every folder inside `src/app/` represents a potential route segment.
- A route is only publicly accessible if it contains a `page.tsx`.

### Creating a New Page
Suppose you want to add a "Payroll" screen under the HR System.
The desired URL is: `http://localhost:3000/dashboard/hr/payroll`

**Steps to create it:**
1. Create the folder structure mirroring the URL path.
   - Go to: `src/app/dashboard/`
   - Create folder: `hr/`
   - Inside `hr/`, create folder: `payroll/`
2. Create the file `page.tsx` directly inside the `payroll/` directory.

Example file: `src/app/dashboard/hr/payroll/page.tsx`
```tsx
export default function PayrollPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Payroll Headquarters</h1>
            <p className="text-muted-foreground">Manage employee salaries here.</p>

            {/* Your Custom Content / Components */}
            <div className="border border-border rounded-lg p-6 bg-card text-card-foreground">
                <p>Welcome to Payroll!</p>
            </div>
        </div>
    )
}
```

---

## 2. Connecting Pages to the Navigation

Just creating the page makes it accessible via the URL, but you still need to link it inside `src/config/navigation.ts` so users can click it in the sidebar.

Open `src/config/navigation.ts`. You will see an array named `navigationConfig`. Each object inside represents a **Primary System** (Core, HR, Sales, etc.).

### A. Flat Structure (Single click opens a page)
If your `Payroll` page doesn't have any sub-menus, you simply define it like this:

```typescript
{
    id: "hr",
    title: "HR System",
    icon: Users,
    items: [
        { title: "Employees", href: "/dashboard/hr/employees" },
        // Added standard flat link here:
        { title: "Payroll", href: "/dashboard/hr/payroll" },
    ],
}
```

### B. Nested Structure (Dropdown Accordion)
If your `Payroll` section is complex and requires multiple sub-pages (e.g., `History` and `Approvals`), you can group them using `subItems`.

**Steps:**
1. Create the sub-pages via folders:
   - `src/app/dashboard/hr/payroll/history/page.tsx`
   - `src/app/dashboard/hr/payroll/approvals/page.tsx`
2. Update the `items` array in `navigation.ts`. Instead of providing an `href` to the parent `Payroll`, you provide an array of `subItems`:

```typescript
{
    id: "hr",
    title: "HR System",
    icon: Users,
    items: [
        { title: "Employees", href: "/dashboard/hr/employees" },
        // Converted Payroll to a collapsed header with children!
        {
            title: "Payroll",
            // Notice no 'href' is needed here since it just drops down
            subItems: [
                { title: "Overview", href: "/dashboard/hr/payroll" }, // Direct link to main payroll page
                { title: "History", href: "/dashboard/hr/payroll/history" },
                { title: "Approvals", href: "/dashboard/hr/payroll/approvals" },
            ]
        },
    ],
}
```
The application will instantly detect the `subItems` property and render a clickable dropdown menu with a Chevron icon.

---

## 3. Important Notes on Client Context

As you build new pages, remember these key concepts:

### `"use client"` vs Server Components
- By default, all pages in App Router are **Server Components**. They don't have access to browser APIs (like `useState`, `onClick`, or `window`).
- They are incredibly fast and good for SEO.
- If your page needs interactivity (buttons, state, forms), append `"use client"` to the very top line of your file.

Example:
```tsx
"use client" // Needed for the button state

import { useState } from "react"

export default function InteractivePage() {
    const [count, setCount] = useState(0)
    
    return <button onClick={() => setCount(c => c + 1)}>Clicked {count} times</button>
}
```

### Layout Persistence
Any `page.tsx` created under `src/app/dashboard/` will automatically inherit the `src/app/dashboard/layout.tsx`. You do not need to re-import the Navigation Sidebars or Topbars on every single page!
