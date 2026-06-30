import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";
import BarberNav from "@/components/demos/peluqueria/BarberNav";
import BarberGallery from "@/components/demos/peluqueria/BarberGallery";

export const metadata = {
  robots: "noindex, nofollow",
  title: "Blade & Co. — Barbería",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  { name: "Corte clásico", desc: "Tijera o máquina, a tu estilo", price: "$8.000" },
  { name: "Corte + barba", desc: "Combo completo con diseño de barba", price: "$12.000" },
  { name: "Afeitado clásico", desc: "Navaja, toalla caliente y loción", price: "$7.000" },
  { name: "Degradado (fade)", desc: "Degradado a máquina con detalle", price: "$9.000" },
  { name: "Tinte de barba", desc: "Cobertura natural o estilo definido", price: "$6.000" },
  { name: "Tratamiento capilar", desc: "Hidratación + masaje de cuero cabelludo", price: "$10.000" },
];

const hours = [
  { day: "Lunes — Viernes", time: "10:00 — 20:00" },
  { day: "Sábado", time: "09:00 — 18:00" },
  { day: "Domingo", time: "Cerrado" },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80", alt: "Corte clásico" },
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80", alt: "Barba diseñada" },
  { src: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=600&q=80", alt: "Fade detalle" },
  { src: "https://images.unsplash.com/photo-1593702288056-f9454dc4a681?w=600&q=80", alt: "Interior barbería" },
  { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80", alt: "Navaja afeitado" },
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", alt: "Peinado terminado" },
];

// ─── Tokens propios de la demo ────────────────────────────────────────────────
const C = {
  bg:      "#0C0B09",
  bg2:     "#141210",
  surface: "#1A1815",
  gold:    "#C9A96E",
  goldLt:  "#E8D5A3",
  text1:   "#F2EDE4",
  text2:   "#A89880",
  text3:   "#6B5F50",
  border:  "rgba(201,169,110,0.15)",
  borderS: "rgba(201,169,110,0.35)",
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BarberiaDemo({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <div style={{ background: C.bg, color: C.text1, fontFamily: "Outfit, sans-serif", minHeight: "100vh" }}>

      {/* ── Nav ──────────────────────────────────────────────────── */}
      <BarberNav lang={lang} colors={C} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        id="inicio"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&q=80"
          alt="Barbería Blade & Co."
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: "brightness(0.25)",
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, ${C.bg} 100%)`,
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, padding: "0 2rem" }}>
          {/* Decorative line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ width: "40px", height: "1px", background: C.gold, opacity: 0.6 }} />
            <span style={{ fontFamily: "Cinzel, serif", fontSize: "10px", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase" }}>
              Est. 2018
            </span>
            <div style={{ width: "40px", height: "1px", background: C.gold, opacity: 0.6 }} />
          </div>

          <h1 style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: C.text1,
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}>
            BLADE
          </h1>
          <p style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(0.8rem, 2vw, 1.1rem)",
            letterSpacing: "0.4em",
            color: C.gold,
            marginBottom: "1.5rem",
            textTransform: "uppercase",
          }}>
            &amp; C O.
          </p>
          <p style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: C.text2,
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.6,
          }}>
            El arte del buen corte. Barbería clásica con técnica moderna en el corazón de Santiago.
          </p>

          {/* CTA */}
          <a
            href="https://wa.me/56912345678?text=Hola!%20Quiero%20reservar%20una%20hora"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "Outfit, sans-serif",
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.bg,
              background: C.gold,
              borderRadius: "4px",
              padding: "14px 32px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            <WhatsAppIcon />
            Reservar por WhatsApp
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: 0.4,
        }}>
          <div style={{ width: "1px", height: "40px", background: C.gold }} />
          <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase" }}>
            Scroll
          </span>
        </div>
      </section>

      {/* ── Servicios y precios ───────────────────────────────────── */}
      <section id="servicios" style={{ padding: "100px 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel text="Nuestros servicios" color={C.gold} />
        <h2 style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 400,
          letterSpacing: "0.08em",
          color: C.text1,
          marginBottom: "3rem",
        }}>
          Servicios &amp; Precios
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1px",
          border: `1px solid ${C.border}`,
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          {services.map((s) => (
            <div
              key={s.name}
              style={{
                background: C.surface,
                padding: "1.75rem 2rem",
                borderRight: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <div>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "1rem", color: C.text1, marginBottom: "0.25rem" }}>{s.name}</p>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: C.text3, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
              <span style={{
                fontFamily: "Cinzel, serif",
                fontSize: "1rem",
                color: C.gold,
                whiteSpace: "nowrap",
                paddingTop: "2px",
              }}>{s.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Galería ───────────────────────────────────────────────── */}
      <section id="galeria" style={{ padding: "0 2rem 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel text="Nuestro trabajo" color={C.gold} />
        <h2 style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 400,
          letterSpacing: "0.08em",
          color: C.text1,
          marginBottom: "3rem",
        }}>
          Galería
        </h2>
        <BarberGallery images={galleryImages} colors={C} />
      </section>

      {/* ── Nosotros ─────────────────────────────────────────────── */}
      <section id="nosotros" style={{ background: C.bg2, padding: "100px 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <SectionLabel text="Quiénes somos" color={C.gold} />
            <h2 style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: C.text1,
              marginBottom: "1.5rem",
              lineHeight: 1.3,
            }}>
              Más de 6 años cuidando cada detalle
            </h2>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", color: C.text2, lineHeight: 1.8, marginBottom: "1rem" }}>
              Blade &amp; Co. nació del amor por la barbería clásica y la precisión de la técnica moderna. Nuestro equipo de barberos certificados combina tradición e innovación para que cada visita sea una experiencia, no solo un servicio.
            </p>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", color: C.text2, lineHeight: 1.8 }}>
              Ambiente premium, atención personalizada y los mejores productos del mercado. Tu estilo, perfectamente ejecutado.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=700&q=80"
            alt="Interior Blade & Co."
            style={{
              width: "100%",
              aspectRatio: "4/5",
              objectFit: "cover",
              borderRadius: "4px",
              filter: "brightness(0.85)",
            }}
          />
        </div>
      </section>

      {/* ── Horarios + Contacto ───────────────────────────────────── */}
      <section id="contacto" style={{ padding: "100px 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>

          {/* Horarios */}
          <div>
            <SectionLabel text="Visítanos" color={C.gold} />
            <h2 style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: C.text1,
              marginBottom: "2rem",
            }}>
              Horarios
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {hours.map((h, i) => (
                <div
                  key={h.day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem 0",
                    borderBottom: `1px solid ${C.border}`,
                    borderTop: i === 0 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: C.text2 }}>{h.day}</span>
                  <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: h.time === "Cerrado" ? C.text3 : C.gold, fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* Dirección */}
            <div style={{ marginTop: "2.5rem" }}>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Dirección</p>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "15px", color: C.text2, lineHeight: 1.6 }}>
                Av. Providencia 1234, Local 5<br />
                Providencia, Santiago
              </p>
            </div>
          </div>

          {/* Mapa + WhatsApp */}
          <div>
            <SectionLabel text="Cómo llegar" color={C.gold} />
            <h2 style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: C.text1,
              marginBottom: "2rem",
            }}>
              Ubicación
            </h2>

            {/* Map embed placeholder */}
            <div style={{
              width: "100%",
              height: "220px",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: "1.5rem",
            }}>
              <iframe
                title="Ubicación Blade & Co."
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.848627!2d-70.6482!3d-33.4316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI1JzUzLjgiUyA3MMKwMzgnNTMuNSJX!5e0!3m2!1ses!2scl!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(190deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://wa.me/56912345678?text=Hola!%20Quiero%20reservar%20una%20hora"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "Outfit, sans-serif",
                fontSize: "14px",
                letterSpacing: "0.08em",
                color: "#fff",
                background: "#25D366",
                borderRadius: "4px",
                padding: "13px 28px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <WhatsAppIcon />
              Reservar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer de la demo ─────────────────────────────────────── */}
      <footer style={{
        borderTop: `1px solid ${C.border}`,
        padding: "2rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        background: C.bg2,
      }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "14px", letterSpacing: "0.2em", color: C.gold }}>
          BLADE &amp; CO.
        </p>
        <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: C.text3 }}>
          © 2024 Blade &amp; Co. — Barbería
        </p>
        <Link
          href={`/${lang}/demos`}
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.text3,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          ← Volver a Demos
        </Link>
      </footer>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <p style={{
      fontFamily: "Outfit, sans-serif",
      fontSize: "10px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color,
      marginBottom: "0.75rem",
    }}>
      {text}
    </p>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.109 1.522 5.84L.057 23.885a.5.5 0 0 0 .611.612l6.074-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.886 9.886 0 0 1-5.031-1.375l-.36-.214-3.733.9.92-3.62-.235-.373A9.889 9.889 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.465 0 9.9 4.434 9.9 9.9 0 5.466-4.435 9.9-9.9 9.9z" />
    </svg>
  );
}
