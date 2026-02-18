"use client";

import { Bell, Search, User } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full h-16 bg-white/80 border-b border-zinc-200 backdrop-blur-md dark:bg-zinc-950/80 dark:border-zinc-800">
            <div className="flex items-center justify-between h-full px-8">
                <div className="flex-1 max-w-xl">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search invoices, templates..."
                            className="w-full h-10 pl-10 pr-4 bg-zinc-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 transition-all dark:bg-zinc-900"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors dark:hover:bg-zinc-900">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full dark:border-zinc-950" />
                    </button>
                    <div className="flex items-center space-x-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Admin User</p>
                            <p className="text-xs text-zinc-500">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            AU
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
