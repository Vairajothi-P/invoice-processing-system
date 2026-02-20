"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
    Database,
    Table,
    Activity,
    Save,
    RefreshCcw,
    HardDrive,
    ShieldCheck,
    ChevronRight,
    Search,
    Download,
    Filter,
    MoreHorizontal
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const tables = [
    { id: 'invoices', name: 'Invoices', count: 1284, fields: 12, size: '2.4 MB' },
    { id: 'templates', name: 'Templates', count: 12, fields: 6, size: '45 KB' },
    { id: 'invoice_items', name: 'Invoice Items', count: 15420, fields: 20, size: '18.2 MB' },
    { id: 'users', name: 'Users', count: 5, fields: 4, size: '12 KB' },
];

export default function DatabasePage() {
    const [activeTable, setActiveTable] = useState('invoices');
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Sidebar />
            <div className="pl-64">
                <Navbar />

                <main className="p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Database Management</h1>
                            <p className="text-slate-500 mt-1">Monitor and manage your system's relational data.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSync}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                            >
                                <RefreshCcw className={cn("w-4 h-4 text-blue-600", isSyncing && "animate-spin")} />
                                Refresh Status
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                <Save className="w-4 h-4" />
                                Export Backup
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: "Storage Used", value: "21.5 MB", icon: HardDrive, color: "blue" },
                            { label: "Total Records", value: "16,721", icon: Table, color: "indigo" },
                            { label: "System Health", value: "Optimal", icon: ShieldCheck, color: "emerald" },
                            { label: "Uptime", value: "99.9%", icon: Activity, color: "amber" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center",
                                        stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
                                            stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                                                stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                    )}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                        <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Table List */}
                        <div className="lg:col-span-4 space-y-4">
                            <h3 className="font-bold text-slate-900 px-2 flex items-center gap-2">
                                <Database className="w-4 h-4 text-blue-600" />
                                Schema Explorer
                            </h3>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                {tables.map((table) => (
                                    <button
                                        key={table.id}
                                        onClick={() => setActiveTable(table.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-4 transition-all text-left group",
                                            activeTable === table.id ? "bg-blue-50/50" : "hover:bg-slate-50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-2 rounded-lg transition-colors",
                                                activeTable === table.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                                            )}>
                                                <Table className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <span className={cn("font-bold text-sm", activeTable === table.id ? "text-blue-600" : "text-slate-700")}>
                                                    {table.name}
                                                </span>
                                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                                    <span>{table.fields} Fields</span>
                                                    <span>•</span>
                                                    <span>{table.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className={cn("w-4 h-4 transition-transform", activeTable === table.id ? "text-blue-600 translate-x-0" : "text-slate-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0")} />
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
                                <Database className="w-24 h-24 absolute -right-6 -bottom-6 text-white/10 rotate-12 transition-transform group-hover:scale-110" />
                                <h4 className="font-bold mb-2">DB Architecture</h4>
                                <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                                    Current scaling handles up to 1M items per month.
                                    Auto-indexing is enabled.
                                </p>
                                <button className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all backdrop-blur-sm">
                                    View Schema diagram
                                </button>
                            </div>
                        </div>

                        {/* Table Content Preview */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <h3 className="font-bold text-slate-900 tracking-tight">Table: {tables.find(t => t.id === activeTable)?.name}</h3>
                                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            {tables.find(t => t.id === activeTable)?.count} Rows
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Query table..."
                                                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-48 transition-all"
                                            />
                                        </div>
                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                                            <Filter className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 bg-slate-50/50">
                                                <th className="px-6 py-4">ID</th>
                                                <th className="px-6 py-4">Field Name</th>
                                                <th className="px-6 py-4">Type</th>
                                                <th className="px-6 py-4">Constraints</th>
                                                <th className="px-6 py-4 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {[
                                                { id: 1, name: 'id', type: 'INT', extra: 'PRIMARY KEY' },
                                                { id: 2, name: 'distributor', type: 'VARCHAR(255)', extra: 'NOT NULL' },
                                                { id: 3, name: 'payable', type: 'DECIMAL', extra: '' },
                                                { id: 4, name: 'invoice_no', type: 'VARCHAR(100)', extra: 'INDEXED' },
                                                { id: 5, name: 'created_at', type: 'TIMESTAMP', extra: 'DEFAULT' },
                                            ].map((column) => (
                                                <tr key={column.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 text-xs font-mono text-slate-400">{column.id}</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{column.name}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md">
                                                            {column.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-slate-500 italic">
                                                        {column.extra || '—'}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                    <p className="text-[10px] text-slate-400 font-medium">
                                        Showing 5 of {tables.find(t => t.id === activeTable)?.fields} schema definitions
                                    </p>
                                    <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Preview Data Assets</button>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-emerald-500" />
                                    Query Latency
                                </h3>
                                <div className="flex items-end gap-1 h-24 mb-2">
                                    {[30, 45, 25, 60, 40, 55, 35, 45, 20, 30, 50, 40, 35, 60, 75, 45, 30, 20, 15, 25].map((val, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-blue-100 rounded-t-sm transition-all hover:bg-blue-600 group relative"
                                            style={{ height: `${val}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none">
                                                {val}ms
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2 border-t border-slate-50">
                                    <span>T-24h</span>
                                    <span>T-12h</span>
                                    <span>Now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
