"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
    Save,
    Trash2,
    Printer,
    Plus,
    FileCheck,
    History,
    ChevronDown,
    Calendar,
    X
} from "lucide-react";

export default function InvoicesPage() {
    // Header State
    const [header, setHeader] = useState({
        distributor: "NESCAFE DISTRIBUTORS",
        address: "Main Street, Block 4, Industrial Area",
        phone: "+91 9876543210",
        gstNo: "33AABCN1234D1Z5",
        payable: "0.00",
        gundalaDue: "0.00",
        invoiceDate: "11/12/2025",
        grnDate: "11/12/2025",
        invoiceNo: "INV-2025-001",
        grnNo: "GRN-9921",
    });

    // Line Items State
    const [lineItems, setLineItems] = useState([
        {
            id: 1,
            sno: 1,
            code: "1001",
            description: "NESCAFE SUNRISE 45GM (J)",
            subDesc: "Cost : 149.70   PrvCost : 168.24",
            qty: 10,
            free: 0,
            rate: 142.57,
            netCost: 149.699,
            selling: 174.00,
            mrp: 180.00,
            netAmt: 1496.99,
            dis1: 0,
            dis1Amt: 0,
            tax: 5,
            taxAmt: 71.29,
            amount: 1425.70,
            taxS: 0,
            taxSAmt: 0,
            roi: 16.23,
            profit: 13.97
        }
    ]);

    const [totals, setTotals] = useState({
        gross: 1425.70,
        disc: 0,
        tax: 71.29,
        net: 1496.99
    });

    const [showTaxModal, setShowTaxModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);

    // Add empty rows for the UI (exactly like the legacy look)
    const EMPTY_ROWS_COUNT = 12;

    const handleHeaderChange = (field, value) => {
        setHeader(prev => ({ ...prev, [field]: value }));
    };

    const handleRowChange = (id, field, value) => {
        setLineItems(prev => prev.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                // Basic auto-calculation logic for relevant fields
                if (field === 'qty' || field === 'rate' || field === 'tax') {
                    const q = parseFloat(updated.qty) || 0;
                    const r = parseFloat(updated.rate) || 0;
                    const t = parseFloat(updated.tax) || 0;
                    updated.amount = (q * r);
                    updated.taxAmt = (updated.amount * t) / 100;
                    updated.netAmt = updated.amount + updated.taxAmt;
                    updated.netCost = updated.netAmt / q;
                }
                return updated;
            }
            return item;
        }));
    };

    const addRow = () => {
        const newId = Date.now();
        setLineItems(prev => [
            ...prev,
            {
                id: newId,
                sno: prev.length + 1,
                code: "",
                description: "",
                subDesc: "",
                qty: 0,
                free: 0,
                rate: 0,
                netCost: 0,
                selling: 0,
                mrp: 0,
                netAmt: 0,
                dis1: 0,
                dis1Amt: 0,
                tax: 0,
                taxAmt: 0,
                amount: 0,
                taxS: 0,
                taxSAmt: 0,
                roi: 0,
                profit: 0
            }
        ]);
    };

    const deleteRow = (id) => {
        setLineItems(prev => prev.filter(item => item.id !== id).map((item, idx) => ({ ...item, sno: idx + 1 })));
    };

    useEffect(() => {
        const gross = lineItems.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
        const tax = lineItems.reduce((acc, curr) => acc + (parseFloat(curr.taxAmt) || 0), 0);
        const disc = lineItems.reduce((acc, curr) => acc + (parseFloat(curr.dis1Amt) || 0), 0);
        const net = gross + tax - disc;

        setTotals({
            gross: parseFloat(gross.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            disc: parseFloat(disc.toFixed(2)),
            net: parseFloat(net.toFixed(2))
        });
    }, [lineItems]);

    const handleSave = () => {
        alert("Invoice Data Saved Successfully!");
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Sidebar />
            <div className="pl-64">
                <Navbar />

                <main className="p-2 bg-[#f0f9ff] min-h-[calc(100vh-64px)] overflow-hidden text-[11px] font-sans print:p-0 print:bg-white">
                    {/* Top Title Bar */}
                    <div className="bg-[#1e3a8a] text-white text-center py-1 font-bold mb-2 shadow-sm uppercase tracking-wider flex justify-between px-4 items-center">
                        <div className="w-24"></div>
                        <span>Purchase Entry</span>
                        <div className="flex gap-2">
                            <button onClick={handlePrint} className="hover:bg-white/10 p-0.5 rounded transition-all"><Printer className="w-3.5 h-3.5" /></button>
                            <button onClick={handleSave} className="hover:bg-white/10 p-0.5 rounded transition-all"><Save className="w-3.5 h-3.5" /></button>
                        </div>
                    </div>

                    {/* Header Input Section */}
                    <div className="grid grid-cols-12 gap-x-6 gap-y-2 mb-4 px-2 print:grid-cols-2">
                        {/* Left Side Inputs */}
                        <div className="col-span-12 lg:col-span-5 space-y-1">
                            {[
                                { label: "Distributor", field: "distributor" },
                                { label: "Address", field: "address" },
                            ].map(item => (
                                <div key={item.field} className="flex items-center">
                                    <label className="w-20 font-medium">{item.label}</label>
                                    <input
                                        type="text"
                                        className="flex-1 bg-white border border-blue-100 px-2 py-0.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        value={header[item.field]}
                                        onChange={(e) => handleHeaderChange(item.field, e.target.value)}
                                    />
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <div className="flex flex-1 items-center">
                                    <label className="w-20 font-medium">Phone</label>
                                    <input type="text" className="flex-1 bg-white border border-blue-100 px-2 py-0.5 outline-none" value={header.phone} onChange={(e) => handleHeaderChange('phone', e.target.value)} />
                                </div>
                                <div className="flex flex-1 items-center">
                                    <label className="w-20 font-medium text-center">Gst No</label>
                                    <input type="text" className="flex-1 bg-white border border-blue-100 px-2 py-0.5 outline-none" value={header.gstNo} onChange={(e) => handleHeaderChange('gstNo', e.target.value)} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-1 items-center">
                                    <label className="w-20 font-medium">Payable</label>
                                    <input type="text" className="flex-1 bg-white border border-blue-100 px-2 py-0.5 outline-none" value={header.payable} onChange={(e) => handleHeaderChange('payable', e.target.value)} />
                                </div>
                                <div className="flex flex-1 items-center">
                                    <label className="w-24 font-medium pl-2">Gundala Due</label>
                                    <input type="text" className="flex-1 bg-white border border-blue-100 px-2 py-0.5 outline-none" value={header.gundalaDue} onChange={(e) => handleHeaderChange('gundalaDue', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Right Side Inputs */}
                        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-x-8 gap-y-1">
                            <div className="flex items-center justify-end gap-2">
                                <label className="font-medium">Invoice Date</label>
                                <div className="relative w-32">
                                    <input type="text" className="w-full bg-white border border-blue-100 px-2 py-0.5 outline-none" value={header.invoiceDate} onChange={(e) => handleHeaderChange('invoiceDate', e.target.value)} />
                                    <Calendar className="absolute right-1 top-1 w-3 h-3 text-blue-400" />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <label className="font-medium">GRN Date</label>
                                <div className="relative w-32">
                                    <input type="text" className="w-full px-2 py-0.5 border border-transparent bg-transparent outline-none text-blue-900 font-bold" value={header.grnDate} disabled />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <label className="font-medium">Invoice No</label>
                                <input type="text" className="w-32 bg-white border border-blue-100 px-2 py-0.5 outline-none" value={header.invoiceNo} onChange={(e) => handleHeaderChange('invoiceNo', e.target.value)} />
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <label className="font-medium">GRN No</label>
                                <input type="text" className="w-32 bg-white border border-blue-100 px-2 py-0.5 outline-none" value={header.grnNo} onChange={(e) => handleHeaderChange('grnNo', e.target.value)} />
                            </div>
                            <div className="flex items-center justify-end gap-2 text-right">
                                <label className="font-medium">Invoice Amt</label>
                                <input type="text" className="w-32 bg-white border border-blue-100 px-2 py-0.5 outline-none text-right font-bold text-blue-600" value={totals.net} readOnly />
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <label className="font-medium">GRN Amt</label>
                                <input type="text" className="w-32 bg-[#e0f2fe] border border-blue-100 px-2 py-0.5 outline-none text-right font-bold text-blue-900" value={totals.net} readOnly />
                            </div>
                        </div>
                    </div>

                    {/* Line Items Table */}
                    <div className="bg-white border border-blue-200 overflow-x-auto shadow-sm min-h-[300px]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#1e3a8a] text-white font-bold h-7 sticky top-0">
                                    <th className="border border-white/40 px-1 w-8">Sno</th>
                                    <th className="border border-white/40 px-1 w-16">Code</th>
                                    <th className="border border-white/40 px-2 text-left">Description</th>
                                    <th className="border border-white/40 px-1 w-12">Qty</th>
                                    <th className="border border-white/40 px-1 w-12 text-center">Free</th>
                                    <th className="border border-white/40 px-1 w-16">Rate</th>
                                    <th className="border border-white/40 px-1 w-20">NetCost</th>
                                    <th className="border border-white/40 px-1 w-16">Selling</th>
                                    <th className="border border-white/40 px-1 w-16">Mrp</th>
                                    <th className="border border-white/40 px-1 w-20">Net Amt</th>
                                    <th className="border border-white/40 px-1 w-14">Dis1 %</th>
                                    <th className="border border-white/40 px-1 w-14 text-xs">Dis1 Amt</th>
                                    <th className="border border-white/40 px-1 w-14">Tax %</th>
                                    <th className="border border-white/40 px-1 w-16">Tax Amt</th>
                                    <th className="border border-white/40 px-1 w-20">Amount</th>
                                    <th className="border border-white/40 px-1 w-14">Tax_S%</th>
                                    <th className="border border-white/40 px-1 w-16 text-xs">Tax_S Amt</th>
                                    <th className="border border-white/40 px-1 w-14">ROI %</th>
                                    <th className="border border-white/40 px-1 w-14">Profit %</th>
                                    <th className="border border-white/40 px-1 w-8 print:hidden"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {lineItems.map((item, idx) => (
                                    <tr key={item.id} className="h-6 hover:bg-blue-50/50 group">
                                        <td className="border border-blue-200 px-1 text-center font-medium bg-[#f0f9ff] text-blue-900">{item.sno}</td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-center outline-none" value={item.code} onChange={e => handleRowChange(item.id, 'code', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-2 leading-tight">
                                            <input className="w-full bg-transparent border-none p-0 font-bold text-gray-800 outline-none" value={item.description} onChange={e => handleRowChange(item.id, 'description', e.target.value)} />
                                            <input className="w-full bg-transparent border-none p-0 text-[10px] text-gray-400 outline-none" value={item.subDesc} onChange={e => handleRowChange(item.id, 'subDesc', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none" value={item.qty} onChange={e => handleRowChange(item.id, 'qty', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-center outline-none" value={item.free} onChange={e => handleRowChange(item.id, 'free', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none" value={item.rate} onChange={e => handleRowChange(item.id, 'rate', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1 text-right text-gray-500 select-none">{parseFloat(item.netCost).toFixed(4)}</td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none text-blue-600 font-bold" value={item.selling} onChange={e => handleRowChange(item.id, 'selling', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none" value={item.mrp} onChange={e => handleRowChange(item.id, 'mrp', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1 text-right font-bold text-blue-800 select-none">{parseFloat(item.netAmt).toFixed(2)}</td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none" value={item.dis1} onChange={e => handleRowChange(item.id, 'dis1', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none text-gray-400" value={item.dis1Amt} onChange={e => handleRowChange(item.id, 'dis1Amt', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none" value={item.tax} onChange={e => handleRowChange(item.id, 'tax', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1 text-right text-orange-600 select-none">{parseFloat(item.taxAmt).toFixed(2)}</td>
                                        <td className="border border-blue-200 px-1 text-right font-bold text-gray-900 select-none">{parseFloat(item.amount).toFixed(2)}</td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none" value={item.taxS} onChange={e => handleRowChange(item.id, 'taxS', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none text-gray-400" value={item.taxSAmt} onChange={e => handleRowChange(item.id, 'taxSAmt', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none text-[10px] text-gray-400" value={item.roi} onChange={e => handleRowChange(item.id, 'roi', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1">
                                            <input className="w-full bg-transparent border-none p-0 text-right outline-none text-[10px] text-gray-400" value={item.profit} onChange={e => handleRowChange(item.id, 'profit', e.target.value)} />
                                        </td>
                                        <td className="border border-blue-200 px-1 text-center print:hidden">
                                            <button onClick={() => deleteRow(item.id)} className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {/* Empty Rows to fill height */}
                                {[...Array(Math.max(0, EMPTY_ROWS_COUNT - lineItems.length))].map((_, i) => (
                                    <tr key={`empty-${i}`} className="h-6">
                                        <td className="border border-blue-200 bg-[#f0f9ff]/50"></td>
                                        {[...Array(18)].map((_, j) => <td key={j} className="border border-blue-200"></td>)}
                                        <td className="border border-blue-200 print:hidden"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="bg-[#dbeafe] border border-blue-200 mt-0.5 flex items-center px-1 py-0.5 space-x-4">
                        <div className="flex items-center gap-1 group cursor-pointer" onClick={addRow}>
                            <Plus className="w-3 h-3 text-blue-600 bg-white rounded-full p-0.5 shadow-sm group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-blue-900">{lineItems.length} Items</span>
                        </div>
                        <div className="text-blue-700 font-bold hover:underline cursor-pointer flex items-center gap-1">
                            Click here for SalesValue
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className="font-medium text-blue-800">Remarks :</span>
                            <input type="text" className="w-96 bg-white border border-blue-200 h-4 px-2 outline-none focus:ring-1 focus:ring-blue-400 text-[10px]" />
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="mt-2 grid grid-cols-12 gap-4 items-start px-2">
                        {/* Summary & History */}
                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-2">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-blue-900">Payment</span>
                                    <div className="relative">
                                        <select className="bg-white border border-blue-200 px-6 py-0.5 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold text-blue-900 rounded shadow-sm">
                                            <option>Credit</option>
                                            <option>Cash</option>
                                        </select>
                                        <ChevronDown className="absolute right-1 top-1 w-3 h-3 text-blue-500 pointer-events-none" />
                                    </div>
                                    <div className="flex items-center gap-1 ml-4 group">
                                        <input type="checkbox" defaultChecked className="w-3 h-3 accent-blue-600 cursor-pointer" id="print-chk" />
                                        <label htmlFor="print-chk" className="cursor-pointer group-hover:text-blue-600 transition-colors">Print</label>
                                    </div>
                                    <div className="flex items-center gap-1 ml-2 group">
                                        <input type="checkbox" className="w-3 h-3 accent-blue-600 cursor-pointer" id="remarks-chk" />
                                        <label htmlFor="remarks-chk" className="cursor-pointer group-hover:text-blue-600 transition-colors">Remarks Dist</label>
                                    </div>
                                </div>

                                <div className="flex gap-2 ml-auto">
                                    <button
                                        onClick={() => setShowTaxModal(true)}
                                        className="bg-white border border-blue-200 text-blue-900 px-6 py-1 font-bold shadow-sm hover:bg-blue-600 hover:text-white transition-all rounded"
                                    >
                                        2. Tax Breakup
                                    </button>
                                    <button
                                        onClick={() => setShowHistoryModal(true)}
                                        className="bg-white border border-blue-200 text-blue-900 px-6 py-1 font-bold shadow-sm hover:bg-blue-600 hover:text-white transition-all rounded flex items-center gap-2"
                                    >
                                        <span className="text-blue-500 group-hover:text-white transition-colors tracking-tighter">1.</span> Show Previous History
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Calculations */}
                        <div className="col-span-12 lg:col-span-4 bg-white/50 border border-blue-100 p-3 rounded-lg shadow-inner">
                            <div className="flex flex-col gap-1.5 font-bold text-blue-900">
                                <div className="flex justify-between items-center border-b border-blue-100/50 pb-1">
                                    <span className="text-blue-700/70">Gross Amount</span>
                                    <span className="text-right w-24 tabular-nums">{totals.gross.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-blue-100/50 pb-1">
                                    <span className="text-blue-700/70">Item Disc Amt</span>
                                    <span className="text-right w-24 tabular-nums">{totals.disc.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-blue-100/50 pb-1">
                                    <span className="text-blue-700/70">Tax Amount</span>
                                    <span className="text-right w-24 tabular-nums">{totals.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-1 font-black text-sm text-blue-900">
                                    <span className="uppercase tracking-tighter">Net Total</span>
                                    <span className="text-right w-28 text-lg bg-blue-900 text-white px-2 py-0.5 rounded shadow-lg tabular-nums">
                                        ₹ {totals.net.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Modals */}
                {showTaxModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl w-[400px] overflow-hidden border border-blue-100 animate-in zoom-in duration-200">
                            <div className="bg-[#1e3a8a] p-4 text-white font-bold flex justify-between items-center">
                                <h3 className="flex items-center gap-2">
                                    <FileCheck className="w-4 h-4" />
                                    Tax Breakup Summary
                                </h3>
                                <button onClick={() => setShowTaxModal(false)} className="hover:bg-white/10 p-1 rounded-full"><X className="w-4 h-4" /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                                    <span className="font-bold text-blue-900">GST 5%</span>
                                    <span className="font-mono text-blue-600">₹ {totals.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-slate-400 italic">
                                    <span>GST 12%</span>
                                    <span>₹ 0.00</span>
                                </div>
                                <div className="pt-4 border-t flex justify-between font-black text-blue-900">
                                    <span>TOTAL TAX</span>
                                    <span>₹ {totals.tax.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showHistoryModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl w-[600px] overflow-hidden border border-blue-100 animate-in slide-in-from-bottom-4">
                            <div className="bg-[#1e3a8a] p-4 text-white font-bold flex justify-between items-center">
                                <h3 className="flex items-center gap-2">
                                    <History className="w-4 h-4" />
                                    Distributor Purchase History
                                </h3>
                                <button onClick={() => setShowHistoryModal(false)} className="hover:bg-white/10 p-1 rounded-full"><X className="w-4 h-4" /></button>
                            </div>
                            <div className="p-8 text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                                    <History className="w-8 h-8 text-blue-300" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">No recent history found</p>
                                    <p className="text-slate-400 text-sm">Previous transactions for {header.distributor} will appear here.</p>
                                </div>
                                <button onClick={() => setShowHistoryModal(false)} className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all">Close history</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
