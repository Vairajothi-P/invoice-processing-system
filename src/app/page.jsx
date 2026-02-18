"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
    FileText,
    TrendingUp,
    AlertCircle,
    Clock,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const stats = [
        { label: "Total Invoices", value: "1,284", icon: FileText, change: "+12.5%", trendingUp: true, color: "indigo" },
        { label: "Pending Verification", value: "24", icon: Clock, change: "-3.2%", trendingUp: false, color: "amber" },
        { label: "Total Value", value: "₹ 4.2M", icon: TrendingUp, change: "+18.4%", trendingUp: true, color: "emerald" },
        { label: "Extraction Errors", value: "2", icon: AlertCircle, change: "-50%", trendingUp: false, color: "rose" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Sidebar />
            <div className="pl-64">
                <Navbar />

                <main className="p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                            <p className="text-slate-500 text-sm mt-1">Welcome back, here's what's happening today.</p>
                        </div>
                        <Link
                            href="/upload"
                            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                            New Upload
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02] cursor-default">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color === 'indigo' ? 'bg-blue-50 text-blue-600' : stat.color === 'amber' ? 'bg-amber-50 text-amber-600' : stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div className={`flex items-center text-xs font-bold ${stat.trendingUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {stat.trendingUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-slate-900">Recent Invoices</h3>
                                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                                            <th className="px-6 py-4">Invoice No</th>
                                            <th className="px-6 py-4">Distributor</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {[
                                            { no: "INV-9921", dist: "NESCAFE DISTRIBUTORS", date: "12 Nov 2025", amt: "₹ 1,496.99", status: "Verified" },
                                            { no: "INV-8832", dist: "BRITANNIA INDUSTRIES", date: "10 Nov 2025", amt: "₹ 12,450.00", status: "Pending" },
                                            { no: "INV-7741", dist: "AMUL DAIRY", date: "09 Nov 2025", amt: "₹ 4,320.50", status: "Verified" },
                                            { no: "INV-6655", dist: "PEPSICO PVT LTD", date: "08 Nov 2025", amt: "₹ 8,900.00", status: "Verified" },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer">
                                                <td className="px-6 py-4 font-semibold text-slate-900">{row.no}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{row.dist}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-900">{row.amt}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${row.status === 'Verified'
                                                        ? 'bg-emerald-50 text-emerald-600'
                                                        : 'bg-amber-50 text-amber-600'
                                                        }`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-6">Extraction Accuracy</h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Header Fields", acc: 98, color: "blue" },
                                    { label: "Line Items", acc: 94, color: "purple" },
                                    { label: "Tax Calculation", acc: 99, color: "emerald" },
                                    { label: "Handwritten Notes", acc: 72, color: "rose" },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-600 font-medium">{item.label}</span>
                                            <span className="text-slate-900 font-bold">{item.acc}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${item.color === 'blue' ? 'bg-blue-600' : item.color === 'purple' ? 'bg-purple-600' : item.color === 'emerald' ? 'bg-emerald-600' : 'bg-rose-600'}`}
                                                style={{ width: `${item.acc}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
                                <p className="text-xs text-blue-600 leading-relaxed">
                                    <strong>Tip:</strong> Clear lighting and flat document placement improve extraction accuracy by up to 15%.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
