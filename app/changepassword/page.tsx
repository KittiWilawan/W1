"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ChangePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password change logic here
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-xl shadow-md w-full max-w-2xl overflow-hidden border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
                    <Link
                        href="./forgotpassword"
                        className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition duration-200 flex items-center space-x-1 text-sm font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>กลับ</span>
                    </Link>
                </div>

                <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                    <div className="text-left space-y-2">
                        <h1 className="text-xl font-bold text-[#1c1e21]">เปลี่ยนรหัสผ่าน</h1>
                        <p className="text-sm font-semibold text-sky-600 tracking-wide">Community Connect</p>
                        <p className="text-[15px] text-[#1c1e21] leading-normal">
                            โปรดป้อนรหัสผ่านใหม่
                        </p>
                    </div>

                    <div className="space-y-2 text-left">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="รหัสผ่านใหม่"
                            className="w-full px-4 py-3.5 rounded-lg border border-slate-300 bg-white text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition shadow-sm"
                        />
                    </div>

                    <div className="space-y-2 text-left">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="ยืนยันรหัสผ่าน"
                            className="w-full px-4 py-3.5 rounded-lg border border-slate-300 bg-white text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition shadow-sm"
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-left space-x-3 bg-slate-50/50 -mx-6 -mb-6 p-4">
                        <button
                            type="submit"
                            className="px-5 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-black text-sm font-bold rounded-lg transition duration-200 shadow-sm"
                        >
                            บันทึกรหัสผ่าน
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
