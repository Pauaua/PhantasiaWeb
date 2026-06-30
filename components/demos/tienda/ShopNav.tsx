"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";

interface Colors {
  bg: string; surface: string;
  ink: string; inkLt: string;
  text1: string; text2: string; text3: string;
  border: string; borderS: string;
}

export default function ShopNav({ lang, colors: C }: { lang: Locale; colors: Colors }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#catalogo", label: "Catálogo" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#envios", label: "Envíos" },
    { href: "#contacto", label: "Contacto" },
  ];

  const navBg = scrolled
    ? "rgba(252,250,247,0.96)"
    : "transparent";

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: "62px",
      background: navBg,
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", height: "100%",
        padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Brand */}
        <div>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: "17px", letterSpacing: "0.28em", color: C.ink, fontWeight: 600 }}>
            MAREN
          </span>
        </div>

        {/* Desktop links */}
        <nav className="hidden md:flex" style={{ display: "flex", gap: "2rem" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{
              fontFamily: "Outfit, sans-serif", fontSize: "12px",
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: C.text2, textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
              onMouseLeave={e => (e.currentTarget.style.color = C.text2)}
            >{l.label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="#contacto" style={{
            fontFamily: "Outfit, sans-serif", fontSize: "11px",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.bg, background: C.ink,
            borderRadius: "2px", padding: "7px 18px",
            textDecoration: "none", fontWeight: 600,
          }} className="hidden md:inline-block">
            Comprar
          </a>

          <Link href={`/${lang}/demos`} style={{
            fontFamily: "Outfit, sans-serif", fontSize: "10px",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.text3, textDecoration: "none",
            border: `1px solid ${C.border}`,
            borderRadius: "2px", padding: "5px 10px",
          }}>
            ← Demos
          </Link>

          <button className="md:hidden" onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            aria-label="Menú">
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ display: "block", width: "18px", height: "1px", background: C.ink }} />
              ))}
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "1.5rem 2rem" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: "block", fontFamily: "Outfit, sans-serif", fontSize: "13px",
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: C.text2, textDecoration: "none",
              padding: "10px 0", borderBottom: `1px solid ${C.border}`,
            }}>{l.label}</a>
          ))}
          <a href="#contacto" style={{
            display: "inline-block", marginTop: "1rem",
            fontFamily: "Outfit, sans-serif", fontSize: "12px",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.bg, background: C.ink,
            borderRadius: "2px", padding: "8px 20px",
            textDecoration: "none", fontWeight: 600,
          }}>Comprar</a>
        </div>
      )}
    </header>
  );
}
