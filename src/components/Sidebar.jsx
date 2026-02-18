"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Upload,
    FileText,
    Settings,
    Database,
    ScanQrCode
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Upload, label: "Upload Invoice", href: "/upload" },
    { icon: ScanQrCode, label: "Template Builder", href: "/template-builder" },
    { icon: FileText, label: "Invoices", href: "/invoices" },
    { icon: Database, label: "Database", href: "/database" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 transition-all duration-300">
            <div className="flex flex-col h-full">
                <div className="flex items-center h-16 px-6 border-b border-zinc-200 dark:border-zinc-800">
                    <ScanQrCode className="w-8 h-8 text-indigo-600 mr-2" />
                    <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        OCR Invoce
                    </span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                                pathname === item.href
                                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400"
                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 mr-3 transition-colors",
                                pathname === item.href ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400 group-hover:text-zinc-500"
                            )} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                            System Health
                        </p>
                        <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                            OCR Service Online
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
