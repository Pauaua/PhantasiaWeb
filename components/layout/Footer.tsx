"use client";

import Logo from "@/components/ui/Logo";

interface FooterProps {
  dict: {
    nav: {
      services: string;
      process: string;
      pricing: string;
      contact: string;
    };
    footer: {
      tagline: string;
      email: string;
      site: string;
      rights: string;
    };
  };
}

export default function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "4rem 2rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "2rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Logo size={32} showWordmark orientation="horizontal" />
            <p
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "13px",
                color: "var(--text-3)",
                lineHeight: 1.7,
                marginTop: "1rem",
                maxWidth: "260px",
              }}
            >
              {dict.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <div>
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--text-3)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Navegación
            </span>
            {[
              { label: dict.nav.services, href: "#servicios" },
              { label: dict.nav.process, href: "#proceso" },
              { label: dict.nav.pricing, href: "#precios" },
              { label: dict.nav.contact, href: "#proyecto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "13px",
                  color: "var(--text-2)",
                  textDecoration: "none",
                  marginBottom: "0.6rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--brand)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-2)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--text-3)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Contacto
            </span>
            <a
              href={`mailto:${dict.footer.email}`}
              style={{
                display: "block",
                fontFamily: "Outfit, sans-serif",
                fontSize: "13px",
                color: "var(--text-2)",
                textDecoration: "none",
                marginBottom: "0.6rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--brand)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-2)")
              }
            >
              {dict.footer.email}
            </a>
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "13px",
                color: "var(--text-3)",
              }}
            >
              {dict.footer.site}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "12px",
              color: "var(--text-3)",
            }}
          >
            © {year} Phantasia. {dict.footer.rights}
          </span>
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--brand)",
              opacity: 0.6,
            }}
          >
            φ
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
