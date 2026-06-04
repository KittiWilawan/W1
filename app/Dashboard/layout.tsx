"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut } from "lucide-react";
import { createClient } from "@/app/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const getLinkClass = (path: string) => {
    const baseClass =
      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition duration-200 ";
    if (pathname === path) {
      return baseClass + "bg-[#3B82F6] text-white shadow-sm";
    }
    return (
      baseClass + "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shrink-0">
          <Link
            href="/Dashboard"
            className="text-xl font-bold text-[#0F172A]"
          >
            Community Connect
          </Link>

          <div className="flex items-center space-x-6 text-sm font-medium text-slate-600">
            <Link
              href="/reportissue"
              className="hover:text-slate-900 transition"
            >
              Report an Issue
            </Link>
            <Link
              href="/reportissue/historys"
              className="hover:text-slate-900 transition"
            >
              My History
            </Link>
            <Link
              href="/reportissue/profile"
              className="hover:text-slate-900 transition"
            >
              Profile
            </Link>

            <button className="relative p-1 text-slate-400 hover:text-slate-600 transition cursor-pointer">
              <Link href="/Dashboard/notification">
                <Bell className="w-6 h-6" />
              </Link>
            </button>

            {user && (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                <span
                  className="text-slate-500 hidden md:inline-block max-w-[150px] truncate"
                  title={user.email}
                >
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">ออกจากระบบ</span>
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}