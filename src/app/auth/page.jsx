"use client";

import { useState } from "react";
import {
    Mail,
    Lock,
    ArrowRight,
    CheckCircle2,
    Github,
    Chrome,
    ScanQrCode,
    User,
    Eye,
    EyeOff
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock authentication delay
        setTimeout(() => {
            // Set a mock auth cookie
            document.cookie = "auth_token=mock_token; path=/; max-age=3600";
            setIsLoading(false);
            router.push("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white antialiased">
            {/* Left Side: Branding & Info (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-90" />

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-2xl" />

                <div className="relative z-10 flex items-center space-x-3 text-white">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
                        <ScanQrCode className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Sardonyx<span className="text-blue-200">.</span></span>
                </div>

                <div className="relative z-10 space-y-6">
                    <h1 className="text-5xl font-extrabold text-white leading-tight">
                        Next-Gen <br />
                        <span className="text-blue-200">Invoice Intelligence</span>
                    </h1>
                    <p className="text-blue-100 text-lg max-w-md leading-relaxed">
                        Automate your accounts payable with enterprise-grade OCR and neural mapping technology.
                    </p>

                    <div className="pt-8 space-y-4">
                        {[
                            "99.9% Extraction Accuracy",
                            "Real-time Neural Mapping",
                            "Seamless ERP Integration"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center space-x-3 text-blue-50">
                                <CheckCircle2 className="w-5 h-5 text-blue-200" />
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 pt-12 border-t border-white/10">
                    <p className="text-blue-200 text-sm">
                        &copy; 2026 Sardonyx AI Technologies. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 lg:p-20">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <ScanQrCode className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">Sardonyx.</span>
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-slate-500 mt-2">
                            {isLogin
                                ? "Enter your credentials to access your dashboard"
                                : "Start your 14-day free trial today. No credit card required."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                                {isLogin && (
                                    <button type="button" className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider">
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full h-12 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center group disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or Continue With</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center h-12 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                            <Chrome className="w-4 h-4 mr-2 text-slate-600" />
                            <span className="text-sm font-bold text-slate-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center h-12 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                            <Github className="w-4 h-4 mr-2 text-slate-600" />
                            <span className="text-sm font-bold text-slate-700">GitHub</span>
                        </button>
                    </div>

                    <p className="text-center text-sm text-slate-500">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 font-bold hover:underline underline-offset-4"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
