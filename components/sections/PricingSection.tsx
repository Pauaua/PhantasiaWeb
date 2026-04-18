"use client";

import { useEffect, useRef } from "react";

interface PricingItem {
  tier: string;
  name: string;
  price: string;
  featured: boolean;
  label?: string;
  features: string[];
}

interface PricingProps {
  dict: {
    pricing: {
      tag: string;
      title: string;
      note: string;
      items: PricingItem[];
    };
  };
}

export default function PricingSection({ dict }: PricingProps) {
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
      id="precios"
      ref={sectionRef}
      style={{ background: "var(--bg2)", padding: "7rem 2rem" }}
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
            {dict.pricing.tag}
          </span>
          <h2
            className="reveal d1"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "var(--text-1)",
              marginBottom: "0.75rem",
            }}
          >
            {dict.pricing.title}
          </h2>
          <p
            className="reveal d2"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "13px",
              color: "var(--text-3)",
              letterSpacing: "0.04em",
            }}
          >
            {dict.pricing.note}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            alignItems: "start",
          }}
          className="pricing-grid"
        >
          {dict.pricing.items.map((item, i) => (
            <PricingCard key={item.name} item={item} delay={i + 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function PricingCard({
  item,
  delay,
}: {
  item: PricingItem;
  delay: number;
}) {
  return (
    <div
      className={`reveal d${delay}`}
      style={{
        background: "var(--surface)",
        border: `${item.featured ? "1.5px" : "1px"} solid ${item.featured ? "var(--brand)" : "var(--border)"}`,
        borderRadius: "10px",
        padding: "2.5rem",
        position: "relative",
        transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 8px 32px rgba(91,33,182,0.1)";
        if (!item.featured) el.style.borderColor = "var(--border-s)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        if (!item.featured) el.style.borderColor = "var(--border)";
      }}
    >
      {item.featured && item.label && (
        <span
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "Outfit, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#fff",
            background: "var(--brand)",
            borderRadius: "20px",
            padding: "3px 14px",
            whiteSpace: "nowrap",
          }}
        >
          {item.label}
        </span>
      )}

      <span
        style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          display: "block",
          marginBottom: "0.75rem",
        }}
      >
        {item.tier}
      </span>

      <h3
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "16px",
          fontWeight: 500,
          letterSpacing: "0.06em",
          color: "var(--text-1)",
          marginBottom: "0.75rem",
        }}
      >
        {item.name}
      </h3>

      <div
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "21px",
          fontWeight: 400,
          color: item.featured ? "var(--brand)" : "var(--brand-mid)",
          marginBottom: "2rem",
          letterSpacing: "0.04em",
        }}
      >
        {item.price}
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {item.features.map((feature) => (
          <li
            key={feature}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontFamily: "Outfit, sans-serif",
              fontSize: "13px",
              color: "var(--text-2)",
              lineHeight: 1.6,
              marginBottom: "0.7rem",
            }}
          >
            <span style={{ color: "var(--brand)", fontSize: "9px", marginTop: "5px", flexShrink: 0 }}>
              ◆
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
