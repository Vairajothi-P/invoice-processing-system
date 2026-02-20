"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
    Settings,
    User,
    Shield,
    Bell,
    Globe,
    Scan,
    Palette,
    Save,
    Check,
    Cloud,
    HelpCircle,
    Smartphone,
    Monitor,
    Zap
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const categories = [
    { id: 'profile', name: 'User Profile', icon: User },
    { id: 'ocr', name: 'OCR Engine', icon: Scan },
    { id: 'system', name: 'System Settings', icon: Smartphone },
    { id: 'security', name: 'Security & API', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowSaved(true);
            setTimeout(() => setShowSaved(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Sidebar />
            <div className="pl-64">
                <Navbar />

                <main className="p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Preferences</h1>
                            <p className="text-slate-500 mt-1">Manage your account settings and processing engine configurations.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {showSaved && (
                                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm animate-in fade-in slide-in-from-right-4 duration-300">
                                    <Check className="w-4 h-4" />
                                    Changes saved successfully
                                </div>
                            )}
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70"
                            >
                                {isSaving ? <Zap className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Tabs */}
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm",
                                        activeTab === cat.id
                                            ? "bg-white text-blue-600 shadow-sm border border-slate-100"
                                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                    )}
                                >
                                    <cat.icon className={cn("w-5 h-5", activeTab === cat.id ? "text-blue-600" : "text-slate-400")} />
                                    {cat.name}
                                </button>
                            ))}

                            <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
                                <Cloud className="w-16 h-16 absolute -right-4 -bottom-4 text-white/10" />
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Server Region</p>
                                <div className="flex items-center gap-2 mb-4">
                                    <Globe className="w-4 h-4 text-blue-400" />
                                    <span className="text-xs font-bold">Mumbai (ap-south-1)</span>
                                </div>
                                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all border border-white/10">
                                    Service Status
                                </button>
                            </div>
                        </div>

                        {/* Settings Content */}
                        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 min-h-[600px]">
                            {activeTab === 'profile' && (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">General Information</h3>
                                        <p className="text-slate-500 text-sm">Update your public profile and personal bio.</p>
                                    </div>

                                    <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                                        <div className="relative group">
                                            <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 overflow-hidden border-2 border-white shadow-md transition-transform group-hover:scale-105">
                                                <User className="w-12 h-12" />
                                            </div>
                                            <button className="absolute -bottom-2 -right-2 p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600 hover:text-blue-600">
                                                <Save className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Admin Photo</h4>
                                            <p className="text-xs text-slate-500">Recommended: Square PNG or JPG (Min 400x400px)</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue="System Administrator"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                            <input
                                                type="email"
                                                defaultValue="admin@sardonyx.ai"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Organization Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Sardonyx Systems PVT LTD"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'ocr' && (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">OCR Hub configuration</h3>
                                        <p className="text-slate-500 text-sm">Fine-tune the document recognition precision parameters.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-8">
                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                                                    <Activity className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">Recognition Strategy</h4>
                                                    <p className="text-xs text-slate-500">High Precision (Best for Invoices)</p>
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
                                                Modify Strategy
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-bold text-slate-700">Confidence Threshold</label>
                                                <span className="text-blue-600 font-bold">85%</span>
                                            </div>
                                            <input type="range" className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                            <p className="text-xs text-slate-400">Lower values may result in more data but less accuracy.</p>
                                        </div>

                                        <div className="p-6 border border-amber-100 bg-amber-50/50 rounded-2xl">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Zap className="w-4 h-4 text-amber-600" />
                                                <h4 className="font-bold text-amber-900 text-sm">Performance Warning</h4>
                                            </div>
                                            <p className="text-xs text-amber-600 leading-relaxed">
                                                Enabling "Line Item Auto-Scaling" will increase processing time by approximately
                                                1.5s per page but improves grid detection on large invoices.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">API Access & Security</h3>
                                        <p className="text-slate-500 text-sm">Manage authentication protocols and system access keys.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main API Endpoint</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="https://ocr-gateway.sardonyx.cloud/v1/process"
                                                    className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-mono text-xs text-slate-600"
                                                />
                                                <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all">Copy</button>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-slate-900 text-sm">Two-Factor Authentication</h4>
                                                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                                                    <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500">Active since Oct 12, 2025</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Fallback for other tabs */}
                            {['appearance', 'system'].includes(activeTab) && (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                        <Monitor className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Interface customization coming soon</h4>
                                        <p className="text-sm text-slate-500">We're building more granular controls for your system.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <HelpCircle className="w-3 h-3" />
                            Help Center
                        </div>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            System Version: 2.4.1-Stable
                        </div>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Built with Premium OCR Pro Core
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
