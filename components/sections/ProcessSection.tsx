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

function StepCard({ step, isLeft }: { step: ProcessStep; isLeft: boolean }) {
  return (
    <div
      className="process-card"
      style={{
        flex: 1,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "1.75rem",
        transition: "border-color 0.25s, box-shadow 0.25s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border-s)";
        el.style.boxShadow = "0 4px 24px rgba(91,33,182,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Connector arrow toward center line */}
      <div
        className="process-arrow"
        style={{
          position: "absolute",
          top: "50%",
          [isLeft ? "right" : "left"]: "-7px",
          transform: "translateY(-50%)",
          width: "7px",
          height: "7px",
          borderTop: "1px solid var(--border)",
          borderRight: isLeft ? "none" : "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          borderLeft: isLeft ? "1px solid var(--border)" : "none",
          background: "var(--surface)",
          rotate: isLeft ? "45deg" : "-45deg",
        }}
      />
      {/* Number with orbital ring */}
      <div className="process-number-wrap" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", width: "36px", height: "36px", marginBottom: "0.75rem" }}>
        {/* Orbital ring */}
        <div
          className="process-ring"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid var(--border-s)",
            transition: "border-color 0.25s",
          }}
        >
          {/* Orbiting dot */}
          <div style={{
            position: "absolute",
            top: "-3px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "var(--brand)",
            opacity: 0.7,
          }} />
        </div>
        <span
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "var(--brand)",
            opacity: 0.9,
            zIndex: 1,
          }}
        >
          {step.number}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          color: "var(--text-1)",
          marginBottom: "0.5rem",
          lineHeight: 1.4,
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
          margin: 0,
        }}
      >
        {step.description}
      </p>
    </div>
  );
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

  // Group steps in pairs: [[0,1], [2,3], [4,5]]
  const pairs: [ProcessStep, ProcessStep | null][] = [];
  for (let i = 0; i < dict.process.steps.length; i += 2) {
    pairs.push([dict.process.steps[i], dict.process.steps[i + 1] ?? null]);
  }

  return (
    <section
      id="proceso"
      ref={sectionRef}
      style={{ background: "var(--bg)", padding: "7rem 2rem" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
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

        {/* Timeline — pairs of cards with center line */}
        <div className="process-timeline" style={{ position: "relative" }}>

          {/* Vertical center line */}
          <div
            className="process-line"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              transform: "translateX(-50%)",
              background: "linear-gradient(to bottom, transparent, var(--border-s) 6%, var(--border-s) 94%, transparent)",
              pointerEvents: "none",
            }}
          >
            {/* Single travelling dot */}
            <div
              className="process-traveller"
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--bg)",
                border: "1px solid var(--brand)",
              }}
            >
              <div style={{
                position: "absolute",
                inset: "2px",
                borderRadius: "50%",
                background: "var(--brand)",
                opacity: 0.7,
              }} />
            </div>
          </div>

          {pairs.map(([left, right], rowIdx) => (
            <div
              key={left.number}
              className={`reveal d${(rowIdx % 3) + 1} process-row`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                marginBottom: rowIdx < pairs.length - 1 ? "2rem" : 0,
              }}
            >
              {/* Left card */}
              <StepCard step={left} isLeft={true} />

              {/* Center spacer (line passes through here) */}
              <div
                className="process-center"
                style={{ width: "1px", flexShrink: 0 }}
              />

              {/* Right card or empty placeholder */}
              {right ? (
                <StepCard step={right} isLeft={false} />
              ) : (
                <div style={{ flex: 1 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes process-travel {
          0%   { top: 4%; }
          50%  { top: 96%; }
          100% { top: 4%; }
        }
        .process-traveller {
          animation: process-travel 11s ease-in-out infinite;
        }
        @keyframes process-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .process-card:hover .process-ring {
          animation: process-spin 2.5s linear infinite;
          border-color: var(--brand) !important;
        }
        @media (max-width: 700px) {
          .process-timeline {
            padding-left: 1.5rem;
          }
          .process-line {
            left: 0 !important;
            transform: none !important;
          }
          .process-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          .process-center {
            display: none !important;
          }
          .process-arrow {
            display: none !important;
          }
          .process-card {
            border-left: 1px solid var(--brand) !important;
            border-left-width: 2px !important;
          }
        }
      `}</style>
    </section>
  );
}
