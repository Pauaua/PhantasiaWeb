interface QuoteBandProps {
  dict: {
    quote: {
      symbol: string;
      greek: string;
      text: string;
    };
  };
}

export default function QuoteBand({ dict }: QuoteBandProps) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "2.5rem 2rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(13px, 1.5vw, 15px)",
          color: "var(--text-3)",
          letterSpacing: "0.06em",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: 1.8,
        }}
      >
        <span style={{ color: "var(--brand)", marginRight: "0.75rem" }}>
          {dict.quote.greek}
        </span>
        — {dict.quote.text}
      </p>
    </div>
  );
}
