"use client";

import { Bell, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        router.push("/auth");
    };

    return (
        <header className="sticky top-0 z-40 w-full h-16 bg-white/80 border-b border-slate-200 backdrop-blur-md">
            <div className="flex items-center justify-between h-full px-8">
                <div className="flex-1 max-w-xl">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search invoices, templates..."
                            className="w-full h-10 pl-10 pr-4 bg-slate-50 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full" />
                    </button>
                    <div className="flex items-center space-x-3 pl-4 border-l border-slate-200 group relative cursor-pointer" onClick={handleLogout} title="Click to Logout">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">Admin User</p>
                            <p className="text-xs text-slate-500">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold group-hover:shadow-md group-hover:scale-105 transition-all">
                            AU
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
