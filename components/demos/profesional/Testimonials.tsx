"use client";

import { useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
}

interface Colors {
  bg: string; surface: string;
  blue: string; slate: string;
  text1: string; text2: string; text3: string;
  border: string;
}

export default function Testimonials({ items, colors: C }: { items: Testimonial[]; colors: Colors }) {
  const [active, setActive] = useState(0);
  const t = items[active];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
      {/* Stars */}
      <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "2rem" }}>
        {Array.from({ length: t.stars }).map((_, i) => (
          <span key={i} style={{ color: C.blue, fontSize: "1rem" }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <blockquote style={{
        fontFamily: "Cinzel, serif",
        fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
        fontWeight: 400, letterSpacing: "0.03em",
        color: C.text1, lineHeight: 1.7,
        marginBottom: "2rem",
        fontStyle: "italic",
      }}>
        &ldquo;{t.text}&rdquo;
      </blockquote>

      {/* Author */}
      <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "14px", color: C.slate }}>{t.name}</p>
      <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: C.text3, letterSpacing: "0.06em" }}>{t.role}</p>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "2.5rem" }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width: i === active ? "24px" : "8px",
            height: "8px",
            borderRadius: "4px",
            background: i === active ? C.blue : C.border,
            border: "none", cursor: "pointer",
            transition: "all 0.3s ease",
            padding: 0,
          }} />
        ))}
      </div>
    </div>
  );
}
