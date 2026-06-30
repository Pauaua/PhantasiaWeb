"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export interface Demo {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  href: string;         // relative slug or "#"
  preview?: string;     // optional preview image URL
}

export default function DemoCard({ demo }: { demo: Demo }) {
  const params = useParams();
  const lang = (params?.lang as string) ?? "es";
  const isPlaceholder = demo.href === "#";
  const fullHref = isPlaceholder ? "#" : `/${lang}/demos/${demo.href}`;

  const inner = (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.25s, transform 0.25s",
        cursor: isPlaceholder ? "default" : "pointer",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-s)";
        if (!isPlaceholder) el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Preview area */}
      <div
        style={{
          height: "200px",
          background: "var(--bg2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {demo.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={demo.preview}
            alt={demo.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.7)",
              transition: "filter 0.3s, transform 0.4s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.9)";
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.7)";
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            }}
          />
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                opacity: 0.5,
              }}
            />
            <span
              style={{
                position: "relative",
                fontFamily: "Outfit, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-3)",
              }}
            >
              Próximamente
            </span>
          </>
        )}

        {/* Live badge */}
        {!isPlaceholder && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontFamily: "Outfit, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#fff",
              background: "var(--brand)",
              borderRadius: "3px",
              padding: "3px 8px",
              fontWeight: 600,
            }}
          >
            Ver demo →
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--brand)",
            marginBottom: "0.4rem",
          }}
        >
          {demo.category}
        </p>
        <h3
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "1rem",
            fontWeight: 400,
            color: "var(--text-1)",
            marginBottom: "0.5rem",
            letterSpacing: "0.05em",
          }}
        >
          {demo.title}
        </h3>
        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "13px",
            color: "var(--text-3)",
            marginBottom: "1rem",
            lineHeight: 1.6,
          }}
        >
          {demo.description}
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {demo.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "var(--text-2)",
                background: "var(--accent2)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                padding: "2px 8px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (isPlaceholder) return inner;

  return (
    <Link href={fullHref} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      {inner}
    </Link>
  );
}
