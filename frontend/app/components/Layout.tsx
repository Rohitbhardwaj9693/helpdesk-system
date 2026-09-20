"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    {
        label: "Dashboard",
        href: "/",
        icon: "dashboard",
    },
    {
        label: "Tickets",
        href: "/tickets",
        icon: "ticket",
        badge: 38,
    },
    {
        label: "Customers",
        href: "/customers",
        icon: "customers",
    },
    {
        label: "Agents",
        href: "/agents",
        icon: "agents",
    },
    {
        label: "Categories",
        href: "/categories",
        icon: "categories",
    },
    {
        label: "SLA Policies",
        href: "/sla-policies",
        icon: "sla",
    },
    {
        label: "Reports",
        href: "/reports",
        icon: "reports",
    },
    {
        label: "Notifications",
        href: "/notifications",
        icon: "notifications",
        badge: 4,
    },
    {
        label: "Users",
        href: "/users",
        icon: "users",
    },
];

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [profileOpen, setProfileOpen] = useState(false);
    if (pathname === "/login") {
        return <>{children}</>;
    }
    const currentPage =
        navItems.find((item) => item.href === pathname)?.label || "Dashboard";
    function handleLogout() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        window.location.href = "/login";
    }
    return (
        <div className="flex min-h-screen bg-slate-100 font-sans">

            {/* ================= SIDEBAR ================= */}

            <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-slate-200 bg-white">

                {/* Logo */}
                <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                        <svg
                            className="h-4 w-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                        </svg>
                    </div>

                    <span className="text-base font-bold text-slate-900">
                        SupportHub
                    </span>

                </div>


                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-3">

                    {navItems.map((item) => {

                        const active =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition ${active
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >

                                {active && (
                                    <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r bg-blue-600" />
                                )}

                                <span
                                    className={`shrink-0 ${active ? "text-blue-600" : "text-slate-500"
                                        }`}
                                >
                                    <NavIcon type={item.icon} />
                                </span>

                                <span>{item.label}</span>

                                {item.badge !== undefined && (
                                    <span
                                        className={`ml-auto rounded-full px-1.5 py-0.5 text-xs font-semibold ${active
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-slate-200 text-slate-600"
                                            }`}
                                    >
                                        {item.badge}
                                    </span>
                                )}

                            </Link>
                        );
                    })}

                </nav>


                {/* Bottom section */}
                <div className="border-t border-slate-200 py-3">

                    <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        <SettingsIcon />
                        <span>Settings</span>
                    </Link>


                    <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50"
                    >

                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                            PN

                            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white bg-emerald-500" />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-slate-800">
                                Priya Nair
                            </p>

                            <p className="text-[11px] text-slate-500">
                                Admin
                            </p>
                        </div>

                    </Link>

                </div>

            </aside>


            {/* ================= MAIN AREA ================= */}

            <div className="ml-60 flex min-h-screen min-w-0 flex-1 flex-col">


                {/* Header */}
                <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4">

                    {/* Breadcrumb */}
                    <div className="flex shrink-0 items-center gap-1 text-sm">
                        <span className="text-xs text-slate-400">
                            SupportHub
                        </span>

                        <span className="text-slate-400">
                            /
                        </span>

                        <span className="text-xs font-medium text-slate-900">
                            {currentPage}
                        </span>
                    </div>


                    {/* Global Search */}
                    <div className="mx-4 flex h-9 w-full max-w-md items-center rounded-lg border border-slate-200 bg-slate-50 px-3">

                        <svg
                            className="h-4 w-4 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-4-4" />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search tickets, customers, agents..."
                            className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                        />

                    </div>


                    {/* Header Right */}
                    <div className="ml-auto flex items-center gap-3">

                        {/* Connected */}
                        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Connected
                        </div>


                        {/* Notification */}
                        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100">

                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>

                            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                                4
                            </span>

                        </button>


                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100"
                            >
                                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                    PN

                                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white bg-emerald-500" />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold leading-none text-slate-800">
                                        Priya Nair
                                    </p>

                                    <p className="mt-1 text-[11px] text-slate-500">
                                        Admin
                                    </p>
                                </div>
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 top-12 z-50 w-40 rounded-xl border border-slate-200 bg-white shadow-lg">

                                    <Link
                                        href="/profile"
                                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        Profile
                                    </Link>

                                    <Link
                                        href="/settings"
                                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        Settings
                                    </Link>

                                    <div className="border-t border-slate-200" />

                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                </header>


                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}


/* ================= ICONS ================= */

function NavIcon({ type }: { type: string }) {

    const common =
        "h-4 w-4";

    if (type === "dashboard") {
        return (
            <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
        );
    }

    if (type === "ticket") {
        return (
            <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
            </svg>
        );
    }

    if (type === "customers") {
        return (
            <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        );
    }

    if (type === "agents") {
        return (
            <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
            </svg>
        );
    }

    if (type === "categories") {
        return (
            <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
            </svg>
        );
    }

    if (type === "sla") {
        return (
            <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        );
    }

    if (type === "reports") {
        return (
            <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19V9a2 2 0 012-2h2a2 2 0 012 2v10M3 19v-6a2 2 0 012-2h2a2 2 0 012 2v6M15 19V5a2 2 0 012-2h2a2 2 0 012 2v14"
                />
            </svg>
        );
    }

    if (type === "notifications") {
        return (
            <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
            </svg>
        );
    }

    return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"
            />
        </svg>
    );
}


function SettingsIcon() {
    return (
        <svg
            className="h-4 w-4 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31.826-2.37-2.37a1.724 1.724 0 001.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-2.37 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    );
}