"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Settings } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Sidebar />
            <div className="pl-64">
                <Navbar />
                <main className="p-8">
                    <div className="flex items-center space-x-3 mb-8">
                        <Settings className="w-8 h-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center">
                        <p className="text-slate-500">System settings and preferences coming soon.</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
