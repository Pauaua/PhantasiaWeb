"use client";

import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  img: string;
  tag?: string;
}

interface Colors {
  bg: string; surface: string;
  ink: string; inkLt: string;
  rose: string;
  text1: string; text2: string; text3: string;
  border: string; borderS: string;
}

const CATS = ["Todos", "Ropa", "Accesorios", "Hogar", "Joyería"];

export default function Catalog({ products, colors: C }: { products: Product[]; colors: Colors }) {
  const [active, setActive] = useState("Todos");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = active === "Todos" ? products : products.filter(p => p.category === active);

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
        {CATS.map(cat => (
          <button key={cat} onClick={() => setActive(cat)} style={{
            fontFamily: "Outfit, sans-serif", fontSize: "11px",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: active === cat ? C.bg : C.text2,
            background: active === cat ? C.ink : "transparent",
            border: `1px solid ${active === cat ? C.ink : C.border}`,
            borderRadius: "2px", padding: "7px 18px",
            cursor: "pointer", transition: "all 0.2s",
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.5rem",
      }}>
        {filtered.map(p => (
          <div
            key={p.id}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Image */}
            <div style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              borderRadius: "2px",
              background: C.surface,
              marginBottom: "1rem",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.name}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  transform: hovered === p.id ? "scale(1.06)" : "scale(1)",
                }}
              />
              {p.tag && (
                <span style={{
                  position: "absolute", top: "12px", left: "12px",
                  fontFamily: "Outfit, sans-serif", fontSize: "9px",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: p.tag === "Nuevo" ? C.bg : C.ink,
                  background: p.tag === "Nuevo" ? C.ink : C.rose,
                  borderRadius: "2px", padding: "3px 8px", fontWeight: 600,
                }}>{p.tag}</span>
              )}
              {/* Quick action overlay */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "1rem",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                transform: hovered === p.id ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.3s ease",
                display: "flex", justifyContent: "center",
              }}>
                <a href="#contacto" style={{
                  fontFamily: "Outfit, sans-serif", fontSize: "11px",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#fff", textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.5)",
                  borderRadius: "2px", padding: "7px 20px",
                  width: "100%", textAlign: "center",
                }}>
                  Consultar disponibilidad
                </a>
              </div>
            </div>

            {/* Info */}
            <div>
              <p style={{
                fontFamily: "Outfit, sans-serif", fontSize: "10px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.text3, marginBottom: "0.25rem",
              }}>{p.category}</p>
              <p style={{
                fontFamily: "Outfit, sans-serif", fontSize: "15px",
                color: C.text1, marginBottom: "0.3rem", fontWeight: 500,
              }}>{p.name}</p>
              <p style={{
                fontFamily: "Cinzel, serif", fontSize: "14px",
                color: C.ink, letterSpacing: "0.05em",
              }}>{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
