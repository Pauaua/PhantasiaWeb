"use client";

import { useEffect, useRef } from "react";
import Logo from "@/components/ui/Logo";

interface HeroProps {
  dict: {
    hero: {
      title_1: string;
      title_2: string;
      subtitle: string;
      cta_primary: string;
      cta_secondary: string;
      scroll: string;
    };
  };
}

export default function HeroSection({ dict }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "93vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 2rem",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 45%, var(--glow) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Concentric rings */}
      {[320, 500, 700].map((d, i) => (
        <div
          key={d}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: d,
            height: d,
            borderRadius: "50%",
            border: "1px solid var(--border)",
            opacity: 0.4 - i * 0.1,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Breathing logo */}
      <div
        className="reveal"
        style={{ marginBottom: "2rem", animation: "breathing 4s ease-in-out infinite" }}
      >
        <Logo size={64} showWordmark={false} />
      </div>

      {/* Title */}
      <h1
        className="reveal d1"
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(1.9rem, 5.2vw, 3.3rem)",
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: "0.04em",
          color: "var(--text-1)",
          maxWidth: "820px",
          marginBottom: "1.5rem",
        }}
      >
        {dict.hero.title_1}{" "}
        <em
          style={{
            fontStyle: "normal",
            color: "var(--brand-mid)",
          }}
        >
          {dict.hero.title_2}
        </em>
      </h1>

      {/* Subtitle */}
      <p
        className="reveal d2"
        style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "clamp(13px, 1.7vw, 15px)",
          color: "var(--text-2)",
          maxWidth: "560px",
          lineHeight: 1.8,
          marginBottom: "2.5rem",
        }}
      >
        {dict.hero.subtitle}
      </p>

      {/* CTA buttons */}
      <div className="reveal d3 flex flex-wrap gap-4 justify-center">
        <a
          href="#proyecto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "Outfit, sans-serif",
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            background: "var(--brand)",
            border: "1px solid var(--brand)",
            borderRadius: "6px",
            padding: "12px 28px",
            textDecoration: "none",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--brand-mid)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--brand)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          {dict.hero.cta_primary}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a
          href="#servicios"
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontFamily: "Outfit, sans-serif",
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-2)",
            background: "transparent",
            border: "1px solid var(--border-s)",
            borderRadius: "6px",
            padding: "12px 28px",
            textDecoration: "none",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--brand)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--brand)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-s)";
          }}
        >
          {dict.hero.cta_secondary}
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className="reveal d4"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: 1,
            height: "40px",
            background: "var(--brand)",
            opacity: 0.5,
            animation: "bob 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes breathing {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
      `}</style>
    </section>
  );
}
