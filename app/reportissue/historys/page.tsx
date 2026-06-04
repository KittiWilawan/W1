"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Trash2,
  AlertCircle,
  FileText,
  ChevronRight,
  Image as ImageIcon,
  ChevronLeft,
} from "lucide-react";
import { createClient } from "@/app/lib/supabase";

interface Report {
  id: string;
  categoryId: string;
  categoryTitle: string;
  categoryColor: string;
  subcategory: string;
  description: string;
  contact: string;
  image: string | null;
  status: string;
  timestamp: string;
}

export default function HistoryPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  // Load reports from Supabase
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Failed to load reports:", error.message);
          return;
        }

        // Format database structure to frontend structure
        const formatted: Report[] = (data || []).map((item: any) => ({
          id: item.id,
          categoryId: item.category_id,
          categoryTitle: item.category_title,
          categoryColor: item.category_color,
          subcategory: item.subcategory,
          description: item.description,
          contact: item.contact,
          image: item.image,
          status: item.status,
          timestamp: new Date(item.created_at).toLocaleString("th-TH"),
        }));

        setReports(formatted);
      } catch (err) {
        console.error("Failed to load reports from database:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDeleteReport = async (id: string) => {
    if (confirm("คุณต้องการลบประวัติการแจ้งเหตุนี้ใช่หรือไม่?")) {
      try {
        const supabase = createClient();
        const { error } = await supabase.from("reports").delete().eq("id", id);
        if (error) {
          alert("ไม่สามารถลบข้อมูลได้: " + error.message);
          return;
        }
        setReports(reports.filter((r) => r.id !== id));
      } catch (err: any) {
        alert("เกิดข้อผิดพลาดในการลบประวัติ");
      }
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B82F6]" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">
            ประวัติการแจ้งเหตุของคุณ
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            My Reported Issues History
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/Dashboard"
            className="text-black text-xs font-bold px-4 py-2.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center space-x-1.5 cursor-pointer bg-white border border-slate-200"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/reportissue"
            className="bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center space-x-1.5 cursor-pointer"
          >
            <span>แจ้งเรื่องใหม่</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      {reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row"
            >
              {/* Image Preview */}
              {report.image ? (
                <div className="w-full md:w-48 h-48 md:h-auto relative shrink-0">
                  <img
                    src={report.image}
                    alt="Report"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full md:w-48 h-32 md:h-auto bg-slate-50 border-r border-slate-100 flex flex-col items-center justify-center text-slate-300 space-y-1.5 p-4 shrink-0">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-[10px] font-semibold text-slate-400">
                    ไม่มีรูปภาพแนบ
                  </span>
                </div>
              )}

              {/* Main Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 justify-between">
                    {/* Category Label */}
                    <div className="flex items-center space-x-2">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm"
                        style={{ backgroundColor: report.categoryColor }}
                      >
                        {report.categoryTitle}
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-sm font-bold text-slate-700">
                        {report.subcategory}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center space-x-1.5 ${getStatusClass(
                        report.status
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span>{report.status}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <div className="pt-1">
                    <p className="text-sm text-slate-600 leading-relaxed break-words whitespace-pre-wrap">
                      {report.description}
                    </p>
                  </div>
                </div>

                {/* Footer Info Row */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-medium">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{report.timestamp.split(" ")[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{report.timestamp.split(" ")[1] || ""}</span>
                    </div>
                    {report.contact && (
                      <div className="flex items-center space-x-1 text-slate-500">
                        <FileText className="w-3.5 h-3.5" />
                        <span>ติดต่อ: {report.contact}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition active:scale-95 cursor-pointer"
                    title="ลบออกจากประวัติ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-16 text-center max-w-lg mx-auto px-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-700">
            ยังไม่มีประวัติการแจ้งเหตุ
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            คุณยังไม่ได้สร้างรายงานแจ้งปัญหาการใช้งานสาธารณูปโภคใดๆ
            คุณสามารถเริ่มทำรายงานได้ง่ายๆ ตอนนี้
          </p>
          <div className="mt-6">
            <Link
              href="/reportissue"
              className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition duration-200 shadow-md inline-block cursor-pointer"
            >
              แจ้งรายงานปัญหาแรก
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
