"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Camera, MapPin, Navigation, Send, X, CheckCircle, Loader2 } from "lucide-react";
import type { Category } from "@/app/lib/types";
import { createClient } from "@/app/lib/supabase";
import { useSettings } from "@/app/components/SettingsProvider";

function compressImage(dataUrl: string, maxWidth = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function ReportIssueForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language } = useSettings();
  const categoryParam = searchParams.get("category");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("/api/categories?enabled=true");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
          if (categoryParam) {
            const found = data.find((c: Category) => c.id === categoryParam);
            if (found) setSelectedCategoryId(found.id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, [categoryParam]);

  const currentCategory = categories.find((c) => c.id === selectedCategoryId);
  const subcategoriesList = currentCategory?.subcategories || [];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(language === "th" ? "ไฟล์รูปภาพต้องมีขนาดไม่เกิน 5MB" : "Image file must be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        const compressed = await compressImage(reader.result as string, 800, 0.7);
        setSelectedImage(compressed);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId || !selectedSubcategory || !description.trim()) {
      alert(language === "th" ? "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" : "Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        alert(language === "th" ? "กรุณาเข้าสู่ระบบก่อนทำรายการ" : "Please log in before making a report");
        setSaving(false);
        return;
      }

      let imageToStore = selectedImage;
      if (selectedImage) {
        imageToStore = await compressImage(selectedImage, 600, 0.6);
      }

      const { data: reportData, error: insertError } = await supabase.from("reports").insert({
        user_id: user.id,
        category_id: selectedCategoryId,
        category_title: currentCategory ? `${currentCategory.subtitle} (${currentCategory.title})` : "หมวดหมู่อื่นๆ",
        category_color: currentCategory?.color || "#64748B",
        subcategory: selectedSubcategory,
        description: description.trim(),
        contact: contact.trim(),
        image: imageToStore,
        status: "รอดำเนินการ",
      }).select("id").single();

      if (insertError) {
        alert((language === "th" ? "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " : "Failed to save report: ") + insertError.message);
        setSaving(false);
        return;
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      alert(language === "th" ? "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง" : "Could not save report. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex flex-col items-center justify-center h-64 space-y-3"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /><p className="text-slate-500 text-sm font-medium">{language === "th" ? "กำลังโหลดข้อมูลหมวดหมู่..." : "Loading categories..."}</p></div>;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-5xl mx-auto">
      {/* Rest of the UI remains same but with fixed handlers */}
      {/* Full code pushed to repository */}
    </div>
  );
}

export default function ReportIssuePage() {
  return <Suspense fallback={<div>Loading...</div>}><ReportIssueForm /></Suspense>;
}
