"use client";

import { useState } from "react";

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
}

interface Colors {
  surface: string; bg2: string;
  green: string; cream: string;
  text1: string; text2: string; text3: string;
  border: string; borderS: string;
}

export default function MenuSection({ categories, colors: C }: { categories: MenuCategory[]; colors: Colors }) {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find(c => c.id === active)!;

  return (
    <div>
      {/* Category tabs */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        marginBottom: "2.5rem",
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: active === cat.id ? C.bg2 : C.text2,
              background: active === cat.id ? C.green : "transparent",
              border: `1px solid ${active === cat.id ? C.green : C.border}`,
              borderRadius: "4px",
              padding: "8px 18px",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span>{cat.emoji}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1px",
        border: `1px solid ${C.border}`,
        borderRadius: "6px",
        overflow: "hidden",
      }}>
        {current.items.map((item) => (
          <div
            key={item.name}
            style={{
              background: C.surface,
              padding: "1.5rem",
              borderRight: `1px solid ${C.border}`,
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
              <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "15px", color: C.text1 }}>
                {item.name}
                {item.tag && (
                  <span style={{
                    marginLeft: "0.5rem",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.green,
                    border: `1px solid ${C.green}`,
                    borderRadius: "3px",
                    padding: "1px 5px",
                    verticalAlign: "middle",
                    opacity: 0.85,
                  }}>{item.tag}</span>
                )}
              </p>
              <span style={{ fontFamily: "Cinzel, serif", fontSize: "14px", color: C.green, whiteSpace: "nowrap", paddingLeft: "1rem" }}>
                {item.price}
              </span>
            </div>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: C.text3, lineHeight: 1.6 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
