"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/dictionaries";

const labels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
};

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const locales: Locale[] = ["es", "en", "fr"];

  function switchLocale(locale: Locale) {
    // Replace the first segment (locale) in the path
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          <button
            onClick={() => switchLocale(locale)}
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: locale === current ? "var(--brand)" : "var(--text-3)",
              fontWeight: locale === current ? 500 : 400,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 4px",
              transition: "color 0.2s",
            }}
          >
            {labels[locale]}
          </button>
          {i < locales.length - 1 && (
            <span style={{ color: "var(--text-3)", fontSize: "10px" }}>·</span>
          )}
        </span>
      ))}
    </div>
  );
}
