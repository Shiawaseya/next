// No imports needed, using standard HTML elements.

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome to the new Next.js dashboard boilerplate. Select a system from the primary navigation on the side.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Metric Cards placeholders */}
                {[
                    { title: "Total Revenue", value: "$45,231.89", trend: "+20.1% from last month" },
                    { title: "Subscriptions", value: "+2350", trend: "+180.1% from last month" },
                    { title: "Sales", value: "+12,234", trend: "+19% from last month" },
                    { title: "Active Now", value: "+573", trend: "+201 since last hour" }
                ].map((metric, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
                        <div className="p-6 flex flex-col gap-1">
                            <h3 className="text-sm font-medium tracking-tight text-muted-foreground">{metric.title}</h3>
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{metric.trend}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm min-h-[400px]">
                    <div className="p-6">
                        <h3 className="font-semibold leading-none tracking-tight">Overview</h3>
                        <p className="text-sm text-muted-foreground mt-2">Activity across systems.</p>
                        {/* Chart placeholder */}
                        <div className="w-full h-[300px] mt-4 flex items-center justify-center border-2 border-dashed border-border rounded-lg text-muted-foreground font-medium">
                            Chart Placeholder
                        </div>
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
                        <p className="text-sm text-muted-foreground mt-2">Latest actions performed.</p>
                        {/* List placeholder */}
                        <div className="mt-6 space-y-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-accent animate-pulse" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">System Notification {i}</p>
                                        <p className="text-sm text-muted-foreground">Action completed successfully.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
