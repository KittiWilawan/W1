"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface ProfileAvatarProps {
  darkMode?: boolean;
  size?: string;
  textSize?: string;
}

export default function ProfileAvatar({
  darkMode = false,
  size = "w-8 h-8",
  textSize = "text-xs",
}: ProfileAvatarProps) {
  const [profile, setProfile] = useState<{
    avatar_url?: string;
    display_name?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          setProfile(await res.json());
        }
      } catch {
        // ignore
      }
    };

    loadProfile();

    const onFocus = () => loadProfile();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const initial =
    profile?.display_name?.charAt(0)?.toUpperCase() ||
    profile?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <Link href="/reportissue/profile" className="group">
      {profile?.avatar_url ? (
        <div
          className={`${size} rounded-full overflow-hidden flex items-center justify-center shrink-0 border-2 group-hover:border-blue-400 transition shadow-sm ${darkMode ? "border-slate-600" : "border-slate-200"}`}
        >
          <img
            src={profile.avatar_url}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`${size} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold ${textSize} border-2 group-hover:border-blue-400 transition shadow-sm shrink-0 ${darkMode ? "border-slate-600" : "border-slate-200"}`}
        >
          {initial}
        </div>
      )}
    </Link>
  );
}
