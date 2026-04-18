"use client";

import { useEffect, useRef } from "react";

interface AboutProps {
  dict: {
    about: {
      tag: string;
      title: string;
      body_1: string;
      body_2: string;
      etymology: string;
    };
  };
}

export default function AboutSection({ dict }: AboutProps) {
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
      id="sobre"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "7rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="grid-cols-about"
      >
        {/* Text side */}
        <div>
          <span
            className="reveal"
            style={{
              display: "inline-block",
              fontFamily: "Outfit, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--brand)",
              marginBottom: "1.5rem",
            }}
          >
            {dict.about.tag}
          </span>
          <h2
            className="reveal d1"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "var(--text-1)",
              marginBottom: "1.5rem",
              lineHeight: 1.3,
            }}
          >
            {dict.about.title}
          </h2>
          <p
            className="reveal d2"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "15px",
              color: "var(--text-2)",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
            dangerouslySetInnerHTML={{ __html: dict.about.body_1 }}
          />
          <p
            className="reveal d3"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "15px",
              color: "var(--text-2)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            {dict.about.body_2}
          </p>
          <p
            className="reveal d4"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              letterSpacing: "0.04em",
              color: "var(--text-3)",
              borderTop: "1px solid var(--border)",
              paddingTop: "1.25rem",
              fontStyle: "italic",
            }}
          >
            {dict.about.etymology}
          </p>
        </div>

        {/* Phi diagram */}
        <div
          className="reveal d2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "260px",
              height: "260px",
            }}
          >
            {/* Outer orbit */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px solid var(--border-s)",
                animation: "spin-slow 28s linear infinite",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "-3px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--brand)",
                  transform: "translateY(-50%)",
                  opacity: 0.7,
                }}
              />
            </div>
            {/* Inner orbit */}
            <div
              style={{
                position: "absolute",
                inset: "40px",
                borderRadius: "50%",
                border: "1px solid var(--border)",
                animation: "spin-slow 18s linear infinite reverse",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-3px",
                  left: "50%",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--brand-light)",
                  transform: "translateX(-50%)",
                  opacity: 0.7,
                }}
              />
            </div>
            {/* Center phi */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "4rem",
                  color: "var(--brand)",
                  opacity: 0.25,
                  userSelect: "none",
                }}
              >
                φ
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .grid-cols-about {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
