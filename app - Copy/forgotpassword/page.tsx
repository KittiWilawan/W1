"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/app/lib/supabase";

export default function ForgotAccountPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("โปรดป้อนอีเมลของคุณ");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/changepassword`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSuccess("เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว");
      setEmail("");
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการส่งอีเมลรีเซ็ตรหัสผ่าน");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <Link
            href="/"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition duration-200 flex items-center space-x-1 text-sm font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับ</span>
          </Link>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleResetPassword}>
          <div className="text-left space-y-2">
            <h1 className="text-xl font-bold text-[#1c1e21]">ค้นหาบัญชีของคุณ</h1>
            <p className="text-sm font-semibold text-sky-600 tracking-wide">
              Community Connect
            </p>
            <p className="text-[15px] text-[#1c1e21] leading-normal">
              โปรดป้อนอีเมลของคุณเพื่อค้นหาบัญชีและรับลิงก์รีเซ็ตรหัสผ่าน
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center">
              {success}
            </div>
          )}

          <div className="space-y-2 text-left">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="อีเมลผู้ใช้งาน"
              className="w-full px-4 py-3.5 rounded-lg border border-slate-300 bg-white text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition shadow-sm"
              disabled={loading}
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-start space-x-3 bg-slate-50/50 -mx-6 -mb-6 p-4">
            <button
              type="submit"
              className="px-5 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-bold rounded-lg transition duration-200 shadow-sm cursor-pointer disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "กำลังค้นหา..." : "ค้นหา"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}