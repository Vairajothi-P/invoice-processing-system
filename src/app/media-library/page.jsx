"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
    Search,
    Upload,
    FileText,
    Image as ImageIcon,
    File,
    MoreVertical,
    Download,
    Trash2,
    Filter,
    Grid,
    List,
    Plus,
    X,
    FolderOpen,
    FileCode,
    FileType
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const INITIAL_FILES = [
    { id: 1, name: "invoice_101.pdf", type: "pdf", size: "1.2 MB", date: "2025-11-12", color: "red" },
    { id: 2, name: "company_logo.png", type: "image", size: "450 KB", date: "2025-11-10", color: "blue" },
    { id: 3, name: "tax_report_2024.docx", type: "doc", size: "2.8 MB", date: "2025-11-09", color: "blue" },
    { id: 4, name: "product_catalog.pdf", type: "pdf", size: "5.4 MB", date: "2025-11-08", color: "red" },
    { id: 5, name: "team_photo.jpg", type: "image", size: "3.2 MB", date: "2025-11-05", color: "blue" },
    { id: 6, name: "receipt_backup.zip", type: "other", size: "12.1 MB", date: "2025-11-01", color: "amber" },
    { id: 7, name: "vendor_list.xlsx", type: "doc", size: "890 KB", date: "2025-10-28", color: "emerald" },
    { id: 8, name: "billing_script.js", type: "other", size: "45 KB", date: "2025-10-25", color: "indigo" },
];

export default function MediaLibrary() {
    const [files, setFiles] = useState(INITIAL_FILES);
    const [view, setView] = useState("grid"); // grid or list
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Fetch real files from public/uploads via API
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('/api/files');
                const data = await response.json();
                if (Array.isArray(data)) {
                    // Prepend new files while keeping INITIAL_FILES as defaults
                    setFiles(prev => {
                        const existingIds = new Set(data.map(f => f.id));
                        const filteredInitial = INITIAL_FILES.filter(f => !existingIds.has(f.id));
                        return [...data, ...filteredInitial];
                    });
                }
            } catch (err) {
                console.error("Failed to fetch files:", err);
            }
        };

        fetchFiles();
        // Polling every 5 seconds to catch system context menu uploads
        const interval = setInterval(fetchFiles, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredFiles = files.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || file.type === filter;
        return matchesSearch && matchesFilter;
    });

    const getFileIcon = (type) => {
        switch (type) {
            case "image": return <ImageIcon className="w-8 h-8 text-blue-500" />;
            case "pdf": return <FileText className="w-8 h-8 text-rose-500" />;
            case "doc": return <File className="w-8 h-8 text-indigo-500" />;
            default: return <FileCode className="w-8 h-8 text-slate-500" />;
        }
    };

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    const handleAction = (e, action, file) => {
        e.stopPropagation();
        setActiveMenuId(null);

        switch (action) {
            case 'download':
                alert(`Starting download for: ${file.name}`);
                break;
            case 'view':
                setSelectedFile(file);
                break;
            case 'delete':
                if (confirm(`Are you sure you want to delete ${file.name}?`)) {
                    setFiles(files.filter(f => f.id !== file.id));
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50" onClick={() => setActiveMenuId(null)}>
            <Sidebar />
            <div className="pl-64">
                <Navbar />

                <main className="p-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Media Library</h1>
                            <p className="text-slate-500 mt-1">Manage and organize your documents and assets.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsUploadModalOpen(true)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                            >
                                <Plus className="w-5 h-5" />
                                Upload Files
                            </button>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search files..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setFilter("all")}
                                    className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-all", filter === "all" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter("image")}
                                    className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-all", filter === "image" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                                >
                                    Images
                                </button>
                                <button
                                    onClick={() => setFilter("pdf")}
                                    className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-all", filter === "pdf" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                                >
                                    PDFs
                                </button>
                                <button
                                    onClick={() => setFilter("doc")}
                                    className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-all", filter === "doc" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                                >
                                    Docs
                                </button>
                            </div>

                            <div className="h-8 w-px bg-slate-200 hidden md:block" />

                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setView("grid")}
                                    className={cn("p-1.5 rounded-md transition-all", view === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500")}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={cn("p-1.5 rounded-md transition-all", view === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500")}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Files Section */}
                    {filteredFiles.length > 0 ? (
                        view === "grid" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {filteredFiles.map((file) => (
                                    <div
                                        key={file.id}
                                        onClick={(e) => handleAction(e, 'view', file)}
                                        className="group bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer relative overflow-visible"
                                    >
                                        <div className="aspect-square rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                                            {getFileIcon(file.type)}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-slate-900 truncate text-sm">{file.name}</h3>
                                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                                <span>{file.size}</span>
                                                <span>{file.date}</span>
                                            </div>
                                        </div>

                                        {/* Hover Overlay Actions */}
                                        <div className={cn(
                                            "absolute top-2 right-2 transition-opacity",
                                            activeMenuId === file.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                        )}>
                                            <button
                                                onClick={(e) => toggleMenu(e, file.id)}
                                                className="p-1.5 bg-white/90 backdrop-blur shadow-sm rounded-lg hover:bg-slate-50 text-slate-600 border border-slate-100"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {activeMenuId === file.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-[60] animate-in zoom-in-95 duration-200">
                                                    <button
                                                        onClick={(e) => handleAction(e, 'download', file)}
                                                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                    >
                                                        <Download className="w-4 h-4" /> Download
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleAction(e, 'view', file)}
                                                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                    >
                                                        <FileText className="w-4 h-4" /> View Details
                                                    </button>
                                                    <hr className="my-1 border-slate-100" />
                                                    <button
                                                        onClick={(e) => handleAction(e, 'delete', file)}
                                                        className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-right">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Type</th>
                                            <th className="px-6 py-4">Size</th>
                                            <th className="px-6 py-4">Date Modified</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredFiles.map((file) => (
                                            <tr
                                                key={file.id}
                                                className="hover:bg-slate-50 transition-colors group cursor-pointer"
                                                onClick={(e) => handleAction(e, 'view', file)}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-slate-50 rounded-lg">
                                                            {getFileIcon(file.type)}
                                                        </div>
                                                        <span className="font-semibold text-slate-900">{file.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-slate-500 capitalize">{file.type}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{file.size}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{file.date}</td>
                                                <td className="px-6 py-4 text-right relative">
                                                    <button
                                                        onClick={(e) => toggleMenu(e, file.id)}
                                                        className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-colors"
                                                    >
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>

                                                    {/* List View Dropdown */}
                                                    {activeMenuId === file.id && (
                                                        <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-[60] animate-in zoom-in-95 duration-200">
                                                            <button
                                                                onClick={(e) => handleAction(e, 'download', file)}
                                                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                            >
                                                                <Download className="w-4 h-4" /> Download
                                                            </button>
                                                            <button
                                                                onClick={(e) => handleAction(e, 'view', file)}
                                                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                            >
                                                                <FileText className="w-4 h-4" /> View Details
                                                            </button>
                                                            <hr className="my-1 border-slate-100" />
                                                            <button
                                                                onClick={(e) => handleAction(e, 'delete', file)}
                                                                className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                                                            >
                                                                <Trash2 className="w-4 h-4" /> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FolderOpen className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">No files found</h3>
                            <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
                            <button
                                onClick={() => { setSearchTerm(""); setFilter("all"); }}
                                className="mt-6 text-blue-600 font-semibold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Detail Modal */}
            {selectedFile && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedFile(null)} />
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">File Details</h2>
                            <button onClick={() => setSelectedFile(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    {getFileIcon(selectedFile.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-slate-900 truncate mb-1">{selectedFile.name}</h3>
                                    <p className="text-slate-500 text-sm capitalize">{selectedFile.type} Document</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">File Size</p>
                                    <p className="text-slate-900 font-semibold">{selectedFile.size}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Created At</p>
                                    <p className="text-slate-900 font-semibold">{selectedFile.date}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={(e) => handleAction(e, 'download', selectedFile)}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Download
                                </button>
                                <button
                                    onClick={(e) => handleAction(e, 'delete', selectedFile)}
                                    className="px-6 py-3 border border-rose-100 text-rose-600 font-semibold rounded-xl hover:bg-rose-50 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal (Simplified) */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)} />
                    <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">Upload Assets</h2>
                            <button onClick={() => setIsUploadModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">Click to upload or drag and drop</h3>
                                <p className="text-sm text-slate-500">Max file size 50MB. Support for images, PDFs, and Documents.</p>
                                <input type="file" className="hidden" multiple />
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        alert("Mock upload started...");
                                        setIsUploadModalOpen(false);
                                    }}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                >
                                    Start Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


