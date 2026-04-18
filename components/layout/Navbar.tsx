"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import type { Locale } from "@/lib/dictionaries";

interface NavbarProps {
  dict: {
    nav: {
      services: string;
      portfolio: string;
      process: string;
      pricing: string;
      contact: string;
      cta: string;
    };
  };
  lang: Locale;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: `/${lang}#servicios`, label: dict.nav.services },
    { href: `/${lang}#proceso`, label: dict.nav.process },
    { href: `/${lang}#precios`, label: dict.nav.pricing },
    { href: `/${lang}#proyecto`, label: dict.nav.contact },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "58px",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          height: "100%",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        {/* Logo */}
        <Link href={`/${lang}`} style={{ textDecoration: "none" }}>
          <Logo size={28} showWordmark orientation="horizontal" />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          style={{ flex: 1, justifyContent: "center" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "13px",
                letterSpacing: "0.06em",
                color: "var(--text-2)",
                textDecoration: "none",
                transition: "color 0.2s",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--brand)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-2)")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher current={lang} />
          <ThemeToggle />
          <a
            href={`/${lang}#proyecto`}
            className="hidden md:inline-flex items-center"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-1)",
              background: "var(--accent2)",
              border: "1px solid var(--border-s)",
              borderRadius: "6px",
              padding: "6px 16px",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--brand)";
              el.style.color = "#fff";
              el.style.borderColor = "var(--brand)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--accent2)";
              el.style.color = "var(--text-1)";
              el.style.borderColor = "var(--border-s)";
            }}
          >
            {dict.nav.cta}
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "20px",
                  height: "1px",
                  background: "var(--text-2)",
                  transition: "transform 0.2s",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: "1.5rem 2rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "Outfit, sans-serif",
                fontSize: "14px",
                letterSpacing: "0.06em",
                color: "var(--text-1)",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                textTransform: "uppercase",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`/${lang}#proyecto`}
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-block",
              marginTop: "1rem",
              fontFamily: "Outfit, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#fff",
              background: "var(--brand)",
              borderRadius: "6px",
              padding: "8px 20px",
              textDecoration: "none",
            }}
          >
            {dict.nav.cta}
          </a>
        </div>
      )}
    </header>
  );
}
