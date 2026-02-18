"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Upload, File, X, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [step, setStep] = useState(1); // 1: Select, 2: Uploading, 3: Success

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const startUpload = () => {
        setUploading(true);
        setStep(2);
        // Mock upload delay
        setTimeout(() => {
            setUploading(false);
            setStep(3);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-white">
            <Sidebar />
            <div className="pl-64">
                <Navbar />

                <main className="p-8 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Upload Invoice</h1>
                        <p className="text-slate-500 text-sm mt-1">Select an invoice image or PDF to start OCR extraction</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                                    <Upload className="w-10 h-10 text-blue-600" />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-slate-900">Select Invoice Image</h2>
                                    <p className="text-slate-500 max-w-xs mx-auto">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
                                </div>

                                {!file ? (
                                    <label className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl cursor-pointer hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                        Browse Files
                                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                                    </label>
                                ) : (
                                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl mb-4">
                                            <File className="w-5 h-5 text-blue-500 mr-3" />
                                            <span className="text-sm font-medium text-slate-900">{file.name}</span>
                                            <button onClick={() => setFile(null)} className="ml-3 p-1 hover:bg-slate-200 rounded-full">
                                                <X className="w-4 h-4 text-slate-400" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={startUpload}
                                            className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                                        >
                                            Process with PaddleOCR
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 py-10 animate-in fade-in duration-500">
                                <div className="relative w-24 h-24 mx-auto">
                                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-blue-600 animate-pulse" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Extracting Text...</h2>
                                    <p className="text-slate-500">PaddleOCR is analyzing the invoice structure and fields.</p>
                                </div>
                                <div className="max-w-xs mx-auto bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div className="h-full bg-blue-600 animate-progress" style={{ width: '60%' }} />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 py-10 animate-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-100">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-slate-900">Analysis Complete!</h2>
                                    <p className="text-slate-500">We've successfully extracted the data from <strong>{file?.name}</strong>.</p>
                                </div>
                                <Link
                                    href="/invoices"
                                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
                                >
                                    Review & Save
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Automated Mapping", desc: "Our AI automatically maps OCR text to invoice fields." },
                            { title: "Batch Processing", desc: "Upload multiple invoices at once for faster entry." },
                            { title: "Template Learning", desc: "Systems learn new formats every time you edit." }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
                                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <style jsx>{`
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 3s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
