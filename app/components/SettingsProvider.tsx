"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/app/lib/supabase";
import { isAuthPage } from "@/app/lib/auth-pages";

interface SettingsContextType {
  darkMode: boolean;
  largeText: boolean;
  language: "th" | "en";
  setDarkMode: (val: boolean) => Promise<void>;
  setLargeText: (val: boolean) => Promise<void>;
  setLanguage: (val: "th" | "en") => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function applyThemeToDocument(darkMode: boolean, largeText: boolean, pathname: string) {
  if (isAuthPage(pathname)) {
    document.documentElement.classList.remove("dark", "large-text");
    document.documentElement.style.colorScheme = "light";
    return;
  }

  document.documentElement.style.colorScheme = darkMode ? "dark" : "light";

  if (darkMode) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");

  if (largeText) document.documentElement.classList.add("large-text");
  else document.documentElement.classList.remove("large-text");
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [darkMode, setDarkModeState] = useState(false);
  const [largeText, setLargeTextState] = useState(false);
  const [language, setLanguageState] = useState<"th" | "en">("th");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Initialize from localStorage and fetch from DB
  useEffect(() => {
    const initSettings = async () => {
      // 1. Fallback / Immediate load from localStorage
      const localDark = localStorage.getItem("settings_dark_mode") === "true";
      const localLarge = localStorage.getItem("settings_large_text") === "true";
      const localLang = (localStorage.getItem("settings_language") as "th" | "en") || "th";

      setDarkModeState(localDark);
      setLargeTextState(localLarge);
      setLanguageState(localLang);

      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);
          // Fetch settings from profiles
          const { data: profile } = await supabase
            .from("profiles")
            .select("dark_mode, large_text, language")
            .eq("id", user.id)
            .single();

          if (profile) {
            // If DB values are non-null, use them and update localStorage
            if (profile.dark_mode !== null) {
              setDarkModeState(profile.dark_mode);
              localStorage.setItem("settings_dark_mode", String(profile.dark_mode));
            }
            if (profile.large_text !== null) {
              setLargeTextState(profile.large_text);
              localStorage.setItem("settings_large_text", String(profile.large_text));
            }
            if (profile.language !== null) {
              const lang = profile.language as "th" | "en";
              setLanguageState(lang);
              localStorage.setItem("settings_language", lang);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load settings from DB:", err);
      } finally {
        setLoading(false);
      }
    };

    initSettings();

    // Listen for auth state changes to load user settings
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        const { data: profile } = await supabase
          .from("profiles")
          .select("dark_mode, large_text, language")
          .eq("id", session.user.id)
          .single();
        if (profile) {
          if (profile.dark_mode !== null) {
            setDarkModeState(profile.dark_mode);
            localStorage.setItem("settings_dark_mode", String(profile.dark_mode));
          }
          if (profile.large_text !== null) {
            setLargeTextState(profile.large_text);
            localStorage.setItem("settings_large_text", String(profile.large_text));
          }
          if (profile.language !== null) {
            const lang = profile.language as "th" | "en";
            setLanguageState(lang);
            localStorage.setItem("settings_language", lang);
          }
        }
      } else {
        setUserId(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    applyThemeToDocument(darkMode, largeText, pathname);
  }, [darkMode, largeText, pathname]);

  const setDarkMode = async (val: boolean) => {
    setDarkModeState(val);
    localStorage.setItem("settings_dark_mode", String(val));

    if (userId) {
      const supabase = createClient();
      await supabase.from("profiles").update({ dark_mode: val }).eq("id", userId);
    }
  };

  const setLargeText = async (val: boolean) => {
    setLargeTextState(val);
    localStorage.setItem("settings_large_text", String(val));

    if (userId) {
      const supabase = createClient();
      await supabase.from("profiles").update({ large_text: val }).eq("id", userId);
    }
  };

  const setLanguage = async (val: "th" | "en") => {
    setLanguageState(val);
    localStorage.setItem("settings_language", val);

    if (userId) {
      const supabase = createClient();
      await supabase.from("profiles").update({ language: val }).eq("id", userId);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        largeText,
        language,
        setDarkMode,
        setLargeText,
        setLanguage,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
