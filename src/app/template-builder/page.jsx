"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
    Plus,
    Settings,
    Scan,
    ArrowRight,
    Database,
    Type,
    Hash,
    Calendar
} from "lucide-react";

export default function TemplateBuilder() {
    const [fields, setFields] = useState([
        { id: 1, label: "Distributor Name", type: "text", ocr_hint: "Header", mapping: "distributor" },
        { id: 2, label: "Invoice Number", type: "number", ocr_hint: "Top Right", mapping: "invoice_no" },
        { id: 3, label: "Invoice Date", type: "date", ocr_hint: "Near label 'Date'", mapping: "invoice_date" },
        { id: 4, label: "Net Total", type: "currency", ocr_hint: "Bottom right total", mapping: "net_amt" },
    ]);

    const addField = () => {
        setFields([...fields, { id: fields.length + 1, label: "New Field", type: "text", ocr_hint: "", mapping: "" }]);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <Sidebar />
            <div className="pl-64">
                <Navbar />

                <main className="p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Template Builder</h1>
                            <p className="text-zinc-500 text-sm mt-1">Define how OCR data maps to your database fields</p>
                        </div>
                        <button className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all flex items-center">
                            Deploy Template
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl border border-zinc-200 p-6 dark:bg-zinc-900 dark:border-zinc-800">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-zinc-900 dark:text-white flex items-center">
                                        <Database className="w-5 h-5 mr-3 text-indigo-500" />
                                        Field Mappings
                                    </h3>
                                    <button
                                        onClick={addField}
                                        className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {fields.map((field) => (
                                        <div key={field.id} className="group flex items-center space-x-4 p-4 border border-zinc-100 rounded-2xl hover:border-indigo-200 hover:shadow-sm transition-all dark:border-zinc-800 dark:hover:border-indigo-950">
                                            <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center dark:bg-zinc-800 shrink-0">
                                                {field.type === 'text' && <Type className="w-5 h-5 text-indigo-500" />}
                                                {field.type === 'number' && <Hash className="w-5 h-5 text-purple-500" />}
                                                {field.type === 'date' && <Calendar className="w-5 h-5 text-emerald-500" />}
                                                {field.type === 'currency' && <div className="text-sm font-bold text-amber-500">₹</div>}
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 flex-1">
                                                <div>
                                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Label Name</label>
                                                    <input className="w-full bg-transparent border-none p-0 text-sm font-semibold text-zinc-900 focus:ring-0 dark:text-white" defaultValue={field.label} />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">OCR OCR Logic</label>
                                                    <input className="w-full bg-transparent border-none p-0 text-sm text-zinc-500 focus:ring-0" defaultValue={field.ocr_hint} />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">DB Column</label>
                                                    <input className="w-full bg-transparent border-none p-0 text-sm text-zinc-500 focus:ring-0" defaultValue={field.mapping} />
                                                </div>
                                            </div>
                                            <button className="p-2 text-zinc-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                                                <Settings className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-emerald-50 rounded-3xl p-8 dark:bg-emerald-950/20 border-2 border-dashed border-emerald-200 dark:border-emerald-900 flex flex-col items-center justify-center min-h-[300px]">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 dark:bg-emerald-900">
                                    <Scan className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-2">Visual Mapping</h4>
                                <p className="text-emerald-700 dark:text-emerald-500 text-center max-w-sm mb-6">Upload a sample invoice to visually draw boxes and map them to fields manually.</p>
                                <button className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none">
                                    Load Sample Image
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl border border-zinc-200 p-6 dark:bg-zinc-900 dark:border-zinc-800">
                                <h3 className="font-bold text-zinc-900 dark:text-white mb-6">Template Metadata</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-zinc-500 uppercase">Template Name</label>
                                        <input type="text" className="w-full bg-zinc-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-white" defaultValue="Standard Retail Invoice" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-zinc-500 uppercase">Description</label>
                                        <textarea className="w-full bg-zinc-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-white resize-none" rows={3}>Default mapping for standard GST invoices with header and table items.</textarea>
                                    </div>
                                    <div className="p-4 bg-indigo-50 rounded-2xl dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900">
                                        <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-2 flex items-center">
                                            <Settings className="w-3 h-3 mr-2" />
                                            Auto-Detection
                                        </p>
                                        <p className="text-xs text-indigo-700 dark:text-indigo-500/80 leading-relaxed">
                                            Enable Fuzzy Matching for labels that might vary (e.g. 'Inv No' vs 'Invoice #').
                                        </p>
                                        <div className="mt-4 flex items-center">
                                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm" />
                                            </div>
                                            <span className="text-xs font-semibold text-indigo-900 ml-3 dark:text-indigo-300">Enabled</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
