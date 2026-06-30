"use client";

const redes = ["Instagram", "TikTok", "Pinterest"];

export default function SocialLinks() {
  return (
    <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
      {redes.map(red => (
        <a key={red} href="#" style={{
          fontFamily: "Outfit, sans-serif", fontSize: "10px",
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)", textDecoration: "none",
          transition: "color 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
        >{red}</a>
      ))}
    </div>
  );
}
