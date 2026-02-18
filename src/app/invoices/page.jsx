"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
    Save,
    Trash2,
    Printer,
    Plus,
    FileCheck,
    History
} from "lucide-react";

export default function InvoicesPage() {
    const [lineItems, setLineItems] = useState([
        { sno: 1, code: "1001", description: "NESCAFE SUNRISE 45GM (J)\nCost: 149.70 PrvCost: 168.24", qty: 10, free: 0, rate: 142.50, netCost: 149.69, selling: 174.00, mrp: 180.00, netAmt: 1496.99, dis1: 0, dis1Amt: 0.00, tax: 5.00, taxAmt: 71.29, amount: 1425.70, taxS: 0, taxSAmt: 0, roi: 16.23, profit: 13.97 },
    ]);

    const addRow = () => {
        setLineItems([...lineItems, {
            sno: lineItems.length + 1, code: "", description: "", qty: 0, free: 0, rate: 0, netCost: 0, selling: 0, mrp: 0, netAmt: 0, dis1: 0, dis1Amt: 0, tax: 0, taxAmt: 0, amount: 0, taxS: 0, taxSAmt: 0, roi: 0, profit: 0
        }]);
    };

    const removeRow = (idx) => {
        setLineItems(lineItems.filter((_, i) => i !== idx));
    };

    return (
        <div className="min-h-screen bg-white">
            <Sidebar />
            <div className="pl-64">
                <Navbar />

                <main className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
                            <p className="text-slate-500 text-sm mt-1">Review and verify extracted invoice data</p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                <Printer className="w-4 h-4 mr-2" />
                                Print
                            </button>
                            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-shadow shadow-md shadow-blue-200">
                                <Save className="w-4 h-4 mr-2" />
                                Save Entry
                            </button>
                        </div>
                    </div>

                    {/* Header Fields Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Distributor</label>
                            <input type="text" className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" defaultValue="NESCAFE DISTRIBUTORS" />
                        </div>
                        <div className="space-y-1.5 lg:col-span-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Address</label>
                            <input type="text" className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" defaultValue="Main Street, City Center, PIN - 500001" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Phone</label>
                            <input type="text" className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Gst No</label>
                            <input type="text" className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Invoice Date</label>
                            <input type="date" className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" defaultValue="2025-11-12" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Invoice No</label>
                            <input type="text" className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" defaultValue="INV-9921" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Invoice Amt</label>
                            <input type="number" className="w-full bg-emerald-50 text-emerald-700 font-bold border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500" defaultValue="1496.99" />
                        </div>
                    </div>

                    {/* Line Items Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[1200px]">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sno</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Code</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Description</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Qty</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Free</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Rate</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">NetCost</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Selling</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">MRP</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Net Amt</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Tax %</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Amount</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {lineItems.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-4 py-3 text-sm text-slate-600 font-medium">{item.sno}</td>
                                            <td className="px-4 py-3">
                                                <input className="w-20 bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-900" defaultValue={item.code} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <input className="w-64 bg-transparent border-none p-0 text-sm font-medium focus:ring-0 text-slate-900" defaultValue={item.description.split('\n')[0]} />
                                                    <span className="text-[10px] text-slate-400 mt-1">{item.description.split('\n')[1]}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <input className="w-12 bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-900" defaultValue={item.qty} />
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <input className="w-10 bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-900 text-center" defaultValue={item.free} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input className="w-20 bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-900" defaultValue={item.rate.toFixed(2)} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm font-semibold text-slate-900">{item.netCost.toFixed(2)}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <input className="w-20 bg-transparent border-none p-0 text-sm focus:ring-0 text-blue-600 font-bold" defaultValue={item.selling.toFixed(2)} />
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-900">{item.mrp.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-sm font-bold text-slate-900">{item.netAmt.toFixed(2)}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center">
                                                    <span className="text-sm text-slate-600 mr-1">{item.tax}</span>
                                                    <span className="text-[10px] text-slate-400">%</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-bold text-slate-900">{item.amount.toFixed(2)}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => removeRow(idx)}
                                                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50/30">
                            <button
                                onClick={addRow}
                                className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Item
                            </button>
                        </div>
                    </div>

                    {/* Footer Totals */}
                    <div className="mt-8 flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                            <div className="flex space-x-4">
                                <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <FileCheck className="w-4 h-4 mr-2" />
                                    Tax Breakup
                                </button>
                                <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                                    <History className="w-4 h-4 mr-2" />
                                    Show Previous History
                                </button>
                            </div>
                            <div className="p-4 bg-slate-100 rounded-xl">
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Remarks</p>
                                <textarea className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-900 resize-none" rows={2} placeholder="Add any notes here..." defaultValue="" />
                            </div>
                        </div>

                        <div className="w-full md:w-80 space-y-3 bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                            <div className="flex justify-between text-slate-400 text-sm">
                                <span>Gross Amount</span>
                                <span>1425.70</span>
                            </div>
                            <div className="flex justify-between text-slate-400 text-sm">
                                <span>Tax Amount</span>
                                <span>71.29</span>
                            </div>
                            <div className="flex justify-between text-slate-400 text-sm">
                                <span>Item Discount</span>
                                <span>0.00</span>
                            </div>
                            <div className="pt-3 border-t border-slate-700 flex justify-between items-center">
                                <span className="font-bold">Net Total</span>
                                <span className="text-2xl font-bold text-blue-400">₹ 1496.99</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
