"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Maximize2,
  Loader2,
  Image as ImageIcon,
  Calendar,
  Clock,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react";
import CategoryCard from "@/app/components/categorycard";
import { ICON_MAP } from "@/app/lib/icons";
import type { Category } from "@/app/lib/types";
import { createClient } from "@/app/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [reports, setReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories?enabled=true");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const fetchReports = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch reports:", error.message);
        return;
      }
      setReports(data || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoadingReports(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchReports();
  }, [fetchCategories, fetchReports]);

  const handleUpdateStatus = async (reportId: string, newStatus: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("reports")
        .update({ status: newStatus })
        .eq("id", reportId);

      if (error) {
        alert("ไม่สามารถอัปเดตสถานะได้: " + error.message);
        return;
      }

      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
      );
    } catch (err: any) {
      alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (confirm("คุณต้องการลบรายงานปัญหานี้ออกจากระบบใช่หรือไม่?")) {
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("reports")
          .delete()
          .eq("id", reportId);

        if (error) {
          alert("ไม่สามารถลบรายงานได้: " + error.message);
          return;
        }

        setReports((prev) => prev.filter((r) => r.id !== reportId));
      } catch (err: any) {
        alert("เกิดข้อผิดพลาดในการลบรายการ");
      }
    }
  };

  const pendingCount = reports.filter((r) => r.status === "รอดำเนินการ").length;
  const processingCount = reports.filter(
    (r) => r.status === "กำลังดำเนินการ"
  ).length;
  const completedCount = reports.filter((r) => r.status === "เสร็จสิ้น").length;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "เสร็จสิ้น":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
      case "กำลังดำเนินการ":
        return "bg-blue-50 text-blue-700 border-blue-200/50";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200/50";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">แผงควบคุมหลัก</h1>
        <p className="text-slate-500 mt-1.5">
          จัดการหมวดหมู่บริการ และตรวจสอบสถานะรายการแจ้งเหตุจากคนในชุมชน
        </p>
      </div>

      {/* Categories Grid */}
      {loadingCategories ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-7 h-7 text-slate-400 animate-spin" />
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName];
            return (
              <CategoryCard
                key={cat.id}
                title={`${cat.subtitle}\n(${cat.title})`}
                description={cat.description}
                icon={
                  IconComponent ? (
                    <IconComponent
                      className="w-16 h-16"
                      style={{ color: cat.color }}
                    />
                  ) : null
                }
                color={cat.color}
                subcategories={cat.subcategories}
                onClick={() => {}}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center">
          <p className="text-slate-400 text-sm">ยังไม่มีหมวดหมู่ที่เปิดใช้งาน</p>
          <p className="text-slate-300 text-xs mt-1">
            ไปที่หน้า Issue Categories เพื่อเพิ่มหรือเปิดใช้งานหมวดหมู่
          </p>
        </div>
      )}

      {/* Real-time map placeholder with dynamic stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                สรุปสถานะเรียลไทม์
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                ปริมาณปัญหาแยกตามขั้นตอนการดำเนินงาน
              </p>
            </div>
          </div>
          <div className="p-6 space-y-4 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="flex items-center space-x-2.5">
                <span className="w-3 h-3 bg-amber-500 rounded-full" />
                <span className="text-sm font-semibold text-slate-700">
                  รอดำเนินการ
                </span>
              </div>
              <span className="text-lg font-bold text-amber-700">
                {pendingCount}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <div className="flex items-center space-x-2.5">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-slate-700">
                  กำลังดำเนินการ
                </span>
              </div>
              <span className="text-lg font-bold text-blue-700">
                {processingCount}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div className="flex items-center space-x-2.5">
                <span className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-sm font-semibold text-slate-700">
                  เสร็จสิ้น
                </span>
              </div>
              <span className="text-lg font-bold text-emerald-700">
                {completedCount}
              </span>
            </div>
          </div>
        </div>

        {/* List of Reports */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4 border-b border-slate-100 pb-2">
              รายการแจ้งเหตุทั้งหมด ({reports.length})
            </h3>

            {loadingReports ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
              </div>
            ) : reports.length > 0 ? (
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col sm:flex-row gap-4 hover:shadow-sm transition"
                  >
                    {report.image ? (
                      <img
                        src={report.image}
                        alt="Preview"
                        className="w-full sm:w-24 h-24 object-cover rounded-lg border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-full sm:w-24 h-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 shrink-0 border border-slate-300">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                            style={{ backgroundColor: report.category_color }}
                          >
                            {report.category_title}
                          </span>
                          <span className="text-xs font-bold text-slate-600">
                            {report.subcategory}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusClass(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 break-words whitespace-pre-wrap leading-relaxed">
                        {report.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] text-slate-400 pt-1 border-t border-slate-200/50">
                        <div className="flex items-center space-x-3">
                          <span>
                            ผู้แจ้ง: {report.contact || "ไม่ได้ระบุชื่อ"}
                          </span>
                          <span>|</span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-0.5" />
                            {new Date(report.created_at).toLocaleDateString(
                              "th-TH"
                            )}
                          </span>
                        </div>

                        {/* Status Manager Dropdown / Buttons */}
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() =>
                              handleUpdateStatus(report.id, "รอดำเนินการ")
                            }
                            className={`px-2 py-1 rounded text-[9px] font-bold border transition cursor-pointer ${
                              report.status === "รอดำเนินการ"
                                ? "bg-amber-100 border-amber-300 text-amber-800"
                                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            รอ
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(report.id, "กำลังดำเนินการ")
                            }
                            className={`px-2 py-1 rounded text-[9px] font-bold border transition cursor-pointer ${
                              report.status === "กำลังดำเนินการ"
                                ? "bg-blue-100 border-blue-300 text-blue-800"
                                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            ทำอยู่
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(report.id, "เสร็จสิ้น")
                            }
                            className={`px-2 py-1 rounded text-[9px] font-bold border transition cursor-pointer ${
                              report.status === "เสร็จสิ้น"
                                ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            เสร็จ
                          </button>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="p-1 text-slate-300 hover:text-red-600 transition cursor-pointer ml-1"
                            title="ลบรายการ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-400 text-xs">ยังไม่มีรายงานแจ้งเข้ามาในระบบ</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}