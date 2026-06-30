"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";

interface Colors {
  bg: string; bg2: string; surface: string;
  gold: string; goldLt: string;
  text1: string; text2: string; text3: string;
  border: string; borderS: string;
}

export default function BarberNav({ lang, colors: C }: { lang: Locale; colors: Colors }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#servicios", label: "Servicios" },
    { href: "#galeria", label: "Galería" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: "58px",
      background: scrolled ? `rgba(12,11,9,0.95)` : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", height: "100%",
        padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Brand */}
        <span style={{ fontFamily: "Cinzel, serif", fontSize: "16px", letterSpacing: "0.25em", color: C.gold, fontWeight: 700 }}>
          BLADE <span style={{ color: C.text2, fontWeight: 400 }}>&amp; CO.</span>
        </span>

        {/* Desktop links */}
        <nav style={{ display: "flex", gap: "2rem" }} className="hidden md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{
              fontFamily: "Outfit, sans-serif", fontSize: "12px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.text2, textDecoration: "none",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = C.text2)}
            >{l.label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="https://wa.me/56912345678"
            target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex"
            style={{
              fontFamily: "Outfit, sans-serif", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.bg, background: C.gold,
              borderRadius: "3px", padding: "6px 16px",
              textDecoration: "none", fontWeight: 600,
            }}
          >
            Reservar
          </a>

          {/* Back to demos */}
          <Link href={`/${lang}/demos`} style={{
            fontFamily: "Outfit, sans-serif", fontSize: "10px",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.text3, textDecoration: "none",
            border: `1px solid ${C.border}`,
            borderRadius: "3px", padding: "5px 10px",
          }}>
            ← Demos
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            aria-label="Menú"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ display: "block", width: "18px", height: "1px", background: C.text2 }} />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: C.bg2, borderTop: `1px solid ${C.border}`, padding: "1.5rem 2rem" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: "block", fontFamily: "Outfit, sans-serif", fontSize: "13px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.text2, textDecoration: "none",
              padding: "10px 0", borderBottom: `1px solid ${C.border}`,
            }}>{l.label}</a>
          ))}
          <a
            href="https://wa.me/56912345678"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block", marginTop: "1rem",
              fontFamily: "Outfit, sans-serif", fontSize: "12px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.bg, background: C.gold,
              borderRadius: "3px", padding: "8px 20px",
              textDecoration: "none", fontWeight: 600,
            }}
          >
            Reservar por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
