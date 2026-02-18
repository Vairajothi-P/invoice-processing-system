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
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <Sidebar />
            <div className="pl-64">
                <Navbar />

                <main className="p-8 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Upload Invoice</h1>
                        <p className="text-zinc-500 text-sm mt-1">Select an invoice image or PDF to start OCR extraction</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-12 dark:bg-zinc-900 dark:border-zinc-800 text-center">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto dark:bg-indigo-950/30">
                                    <Upload className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Select Invoice Image</h2>
                                    <p className="text-zinc-500 max-w-xs mx-auto">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
                                </div>

                                {!file ? (
                                    <label className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl cursor-pointer hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                                        Browse Files
                                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                                    </label>
                                ) : (
                                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl mb-4 dark:bg-zinc-800 dark:border-zinc-700">
                                            <File className="w-5 h-5 text-indigo-500 mr-3" />
                                            <span className="text-sm font-medium text-zinc-900 dark:text-white">{file.name}</span>
                                            <button onClick={() => setFile(null)} className="ml-3 p-1 hover:bg-zinc-200 rounded-full dark:hover:bg-zinc-700">
                                                <X className="w-4 h-4 text-zinc-400" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={startUpload}
                                            className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
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
                                    <div className="absolute inset-0 border-4 border-indigo-100 rounded-full dark:border-indigo-950/30" />
                                    <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-indigo-600 animate-pulse" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Extracting Text...</h2>
                                    <p className="text-zinc-500">PaddleOCR is analyzing the invoice structure and fields.</p>
                                </div>
                                <div className="max-w-xs mx-auto bg-zinc-100 rounded-full h-2 overflow-hidden dark:bg-zinc-800">
                                    <div className="h-full bg-indigo-600 animate-progress" style={{ width: '60%' }} />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 py-10 animate-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto dark:bg-emerald-950/30 border-4 border-emerald-100 dark:border-emerald-900">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Analysis Complete!</h2>
                                    <p className="text-zinc-500">We've successfully extracted the data from <strong>{file?.name}</strong>.</p>
                                </div>
                                <Link
                                    href="/purchase-entry"
                                    className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
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
                            <div key={i} className="p-6 bg-white rounded-2xl border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
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
