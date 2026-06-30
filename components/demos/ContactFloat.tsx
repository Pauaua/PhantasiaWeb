"use client";

import { useState } from "react";

type Locale = "es" | "en" | "fr";

const tx: Record<Locale, { wa: string; label: string }> = {
  es: { wa: "Escribir por WhatsApp", label: "Cerrar" },
  en: { wa: "Chat on WhatsApp",      label: "Close"  },
  fr: { wa: "Écrire sur WhatsApp",   label: "Fermer" },
};

export default function ContactFloat({ lang = "es" }: { lang?: Locale }) {
  const [open, setOpen] = useState(false);
  const copy = tx[lang];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.75rem",
      }}
    >
      {/* Options — visible when open */}
      {open && (
        <>
          <a
            href="mailto:hola@phantasia.cl"
            title="Enviar correo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "Outfit, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: "var(--text-1)",
              background: "var(--surface)",
              border: "1px solid var(--border-s)",
              borderRadius: "8px",
              padding: "10px 16px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              whiteSpace: "nowrap",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--brand)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-s)")}
          >
            <MailIcon />
            hola@phantasia.cl
          </a>

          <a
            href="https://wa.me/56912345678?text=Hola!%20Vi%20los%20demos%20de%20Phantasia%20y%20me%20interesa%20un%20sitio%20web"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "Outfit, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: "#fff",
              background: "#25D366",
              border: "1px solid #1fad54",
              borderRadius: "8px",
              padding: "10px 16px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            <WhatsAppIcon />
            {copy.wa}
          </a>
        </>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? copy.label : "Contactar"}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: open ? "var(--surface)" : "var(--brand)",
          border: "1px solid var(--border-s)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: open
            ? "0 4px 16px rgba(0,0,0,0.10)"
            : "0 4px 20px rgba(139,92,246,0.35)",
          transition: "background 0.25s, box-shadow 0.25s, transform 0.2s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = open ? "rotate(45deg) scale(1.08)" : "scale(1.08)")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = open ? "rotate(45deg)" : "rotate(0deg)")}
      >
        {open ? (
          <CloseIcon color={open ? "var(--text-2)" : "#fff"} />
        ) : (
          <ChatIcon />
        )}
      </button>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.109 1.522 5.84L.057 23.885a.5.5 0 0 0 .611.612l6.074-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.886 9.886 0 0 1-5.031-1.375l-.36-.214-3.733.9.92-3.62-.235-.373A9.889 9.889 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.465 0 9.9 4.434 9.9 9.9 0 5.466-4.435 9.9-9.9 9.9z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
