"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Maximize2, Loader2 } from "lucide-react";
import CategoryCard from "@/app/components/categorycard";
import { ICON_MAP } from "@/app/lib/icons";
import type { Category } from "@/app/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories?enabled=true");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSelectCategory = (id: string) => {
    router.push(`/reportissue?category=${id}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">
          ยินดีต้อนรับกลับมา
        </h1>
        <p className="text-slate-500 mt-1.5">
          เลือกประเภทบริการที่คุณต้องการแจ้งปัญหาหรือตรวจสอบสถานะ
        </p>
      </div>

      {/* Category Cards */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-7 h-7 text-slate-400 animate-spin" />
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      className="w-6 h-6"
                      style={{ color: cat.color }}
                    />
                  ) : null
                }
                color={cat.color}
                subcategories={cat.subcategories}
                onClick={() => handleSelectCategory(cat.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center">
          <p className="text-slate-400 text-sm">
            ยังไม่มีหมวดหมู่ที่เปิดใช้งาน
          </p>
          <p className="text-slate-300 text-xs mt-1">
            ไปที่หน้า Issue Categories เพื่อเพิ่มหรือเปิดใช้งานหมวดหมู่
          </p>
        </div>
      )}

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                แผนที่สถานะเรียลไทม์
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                ตรวจสอบจุดที่กำลังดำเนินการซ่อมแซมใกล้คุณ
              </p>
            </div>
            <button className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>ขยายแผนที่</span>
            </button>
          </div>
          <div className="h-64 bg-slate-100 relative p-4 flex flex-col justify-end">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-slate-200" />
            <div className="relative bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md border border-slate-200/50 w-56 space-y-2 text-xs font-medium">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-full" />
                <span className="text-slate-700">
                  จุดซ่อมแซมเร่งด่วน (0)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                <span className="text-slate-700">กำลังดำเนินการ (0)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between relative">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">
              ประวัติล่าสุด
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}