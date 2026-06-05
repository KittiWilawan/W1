"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight, Loader2 } from "lucide-react";
import {
  AppNotification,
  extractStatusFromNotification,
  getNotificationTarget,
  getStatusBadgeClass,
  isNewReportNotification,
  isStatusUpdateNotification,
} from "@/app/lib/notifications";

interface NotificationBellProps {
  darkMode?: boolean;
  language?: "th" | "en";
  userRole?: string;
}

export default function NotificationBell({
  darkMode = false,
  language = "th",
  userRole = "member",
}: NotificationBellProps) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleToggle = async () => {
    if (!open) {
      setLoading(true);
      await fetchNotifications();
      setLoading(false);
    }
    setOpen((prev) => !prev);
  };

  const markAsRead = async (id: string) => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = async (notif: AppNotification) => {
    if (!notif.read) {
      await markAsRead(notif.id);
    }

    const target = getNotificationTarget(notif, userRole);
    setOpen(false);

    if (target) {
      router.push(target);
    } else {
      router.push("/Dashboard/notification");
    }
  };

  const t = {
    title: language === "th" ? "การแจ้งเตือน" : "Notifications",
    empty: language === "th" ? "ไม่มีการแจ้งเตือน" : "No notifications",
    viewAll: language === "th" ? "ดูทั้งหมด" : "View all",
    newReport: language === "th" ? "รายงานใหม่" : "New report",
    statusUpdate: language === "th" ? "อัปเดตสถานะ" : "Status update",
  };

  const recent = notifications.slice(0, 6);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={`relative p-2 rounded-xl transition cursor-pointer ${darkMode ? "text-slate-300 hover:text-white hover:bg-slate-700" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
        aria-label={t.title}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm animate-[bounceIn_300ms_ease-out]">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border shadow-xl z-50 overflow-hidden animate-[slideDown_200ms_ease-out] ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
        >
          <div
            className={`px-4 py-3 border-b flex items-center justify-between ${darkMode ? "border-slate-700" : "border-slate-100"}`}
          >
            <h3 className={`text-sm font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
              {t.title}
              {unreadCount > 0 && (
                <span className="ml-2 text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            <Link
              href="/Dashboard/notification"
              onClick={() => setOpen(false)}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800"
            >
              {t.viewAll}
            </Link>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              </div>
            ) : recent.length > 0 ? (
              recent.map((notif) => {
                const status = extractStatusFromNotification(notif);
                const typeLabel = isNewReportNotification(notif)
                  ? t.newReport
                  : isStatusUpdateNotification(notif)
                    ? t.statusUpdate
                    : null;

                return (
                  <button
                    key={notif.id}
                    type="button"
                    onClick={() => handleNotificationClick(notif)}
                    className={`w-full text-left px-4 py-3 border-b transition cursor-pointer flex gap-3 items-start ${darkMode ? "border-slate-700 hover:bg-slate-700/50" : "border-slate-50 hover:bg-blue-50/40"} ${!notif.read ? (darkMode ? "bg-slate-700/30" : "bg-blue-50/60") : ""}`}
                  >
                    {!notif.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0 animate-pulse" />
                    )}
                    <div className={`flex-1 min-w-0 ${notif.read ? "ml-5" : ""}`}>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className={`text-xs font-bold truncate ${darkMode ? "text-white" : "text-slate-800"}`}>
                          {notif.title}
                        </p>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      </div>
                      {typeLabel && (
                        <span
                          className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full border mb-1 ${status ? getStatusBadgeClass(status) : darkMode ? "bg-slate-600 text-slate-200 border-slate-500" : "bg-slate-100 text-slate-600 border-slate-200"}`}
                        >
                          {status || typeLabel}
                        </span>
                      )}
                      <p className={`text-[11px] line-clamp-2 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {notif.content}
                      </p>
                      <p className={`text-[9px] mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                        {new Date(notif.created_at).toLocaleString(
                          language === "th" ? "th-TH" : "en-US"
                        )}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className={`py-10 text-center text-xs ${darkMode ? "text-slate-400" : "text-slate-400"}`}>
                {t.empty}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
