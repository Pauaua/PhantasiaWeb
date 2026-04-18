"use client";

import { useEffect, useRef } from "react";

interface ServiceItem {
  category: string;
  name: string;
  description: string;
  tags: string[];
}

interface ServicesProps {
  dict: {
    services: {
      tag: string;
      title: string;
      items: ServiceItem[];
    };
  };
}

export default function ServicesSection({ dict }: ServicesProps) {
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
      id="servicios"
      ref={sectionRef}
      style={{
        background: "var(--bg2)",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
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
            {dict.services.tag}
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
            {dict.services.title}
          </h2>
        </div>

        {/* Service cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--border)",
          }}
          className="services-grid"
        >
          {dict.services.items.map((service, i) => (
            <ServiceCard key={service.name} service={service} delay={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({
  service,
  delay,
}: {
  service: ServiceItem;
  delay: number;
}) {
  return (
    <div
      className={`reveal d${delay + 1}`}
      style={{
        background: "var(--surface)",
        padding: "2.5rem",
        position: "relative",
        transition: "background 0.25s ease",
        overflow: "hidden",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--accent)";
        const bar = el.querySelector(".top-bar") as HTMLElement;
        if (bar) bar.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "var(--surface)";
        const bar = el.querySelector(".top-bar") as HTMLElement;
        if (bar) bar.style.opacity = "0";
      }}
    >
      {/* Top gradient bar */}
      <div
        className="top-bar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, var(--brand), var(--brand-light))",
          opacity: 0,
          transition: "opacity 0.25s ease",
        }}
      />

      <span
        style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--brand)",
          display: "block",
          marginBottom: "1rem",
        }}
      >
        {service.category}
      </span>

      <h3
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "15.5px",
          fontWeight: 500,
          letterSpacing: "0.06em",
          color: "var(--text-1)",
          marginBottom: "1rem",
        }}
      >
        {service.name}
      </h3>

      <p
        style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "12.5px",
          color: "var(--text-2)",
          lineHeight: 1.75,
          marginBottom: "1.5rem",
        }}
      >
        {service.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.04em",
              color: "var(--brand)",
              background: "var(--accent)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "3px 10px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
