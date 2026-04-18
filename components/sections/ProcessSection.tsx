"use client";

import { useEffect, useRef } from "react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessProps {
  dict: {
    process: {
      tag: string;
      title: string;
      steps: ProcessStep[];
    };
  };
}

export default function ProcessSection({ dict }: ProcessProps) {
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
      id="proceso"
      ref={sectionRef}
      style={{ background: "var(--bg)", padding: "7rem 2rem" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
              marginBottom: "1rem",
            }}
          >
            {dict.process.tag}
          </span>
          <h2
            className="reveal d1"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "var(--text-1)",
            }}
          >
            {dict.process.title}
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="process-grid"
        >
          {dict.process.steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal d${(i % 4) + 1}`}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "2rem",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border-s)";
                el.style.boxShadow = "0 2px 16px rgba(91,33,182,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "none";
              }}
            >
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: "var(--brand)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                {step.number}
              </span>
              <h3
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--text-1)",
                  marginBottom: "0.5rem",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "13px",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
