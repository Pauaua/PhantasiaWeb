import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";
import ShopNav from "@/components/demos/tienda/ShopNav";
import Catalog, { type Product } from "@/components/demos/tienda/Catalog";
import SocialLinks from "@/components/demos/tienda/SocialLinks";

export const metadata = {
  robots: "noindex, nofollow",
  title: "Maren — Boutique",
};

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg:      "#FCFAF7",
  bg2:     "#F5F1EB",
  surface: "#EEEAE3",
  ink:     "#1C1A17",
  inkLt:   "#3D3A35",
  rose:    "#F2D5C8",
  text1:   "#1C1A17",
  text2:   "#7A756C",
  text3:   "#B0A99E",
  border:  "rgba(28,26,23,0.10)",
  borderS: "rgba(28,26,23,0.25)",
} as const;

// ─── Productos ────────────────────────────────────────────────────────────────
const products: Product[] = [
  { id: "p01", name: "Vestido lino natural", category: "Ropa", price: "$49.900", tag: "Nuevo", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80" },
  { id: "p02", name: "Bolso cuero tote", category: "Accesorios", price: "$89.900", tag: "Destacado", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" },
  { id: "p03", name: "Collar duna", category: "Joyería", price: "$28.500", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80" },
  { id: "p04", name: "Blazer oversize beige", category: "Ropa", price: "$67.900", tag: "Nuevo", img: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80" },
  { id: "p05", name: "Vela de cera de soja", category: "Hogar", price: "$14.900", img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80" },
  { id: "p06", name: "Pulsera tejida arena", category: "Joyería", price: "$12.900", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80" },
  { id: "p07", name: "Falda midi terracota", category: "Ropa", price: "$42.900", tag: "Nuevo", img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80" },
  { id: "p08", name: "Canasto palma trenzado", category: "Hogar", price: "$32.500", img: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=500&q=80" },
];

const shippingInfo = [
  { icon: "🚚", title: "Despacho a domicilio", desc: "Cobertura en todo Chile. 3 a 5 días hábiles en regiones, 1 a 2 días en Santiago.", price: "Desde $3.990" },
  { icon: "🏪", title: "Retiro en tienda", desc: "Disponible el mismo día si realizas tu pedido antes de las 14:00 hrs.", price: "Gratis" },
  { icon: "📦", title: "Envío express", desc: "Entrega el mismo día dentro de Santiago. Disponible lunes a viernes.", price: "Desde $6.990" },
  { icon: "🌎", title: "Internacional", desc: "Enviamos a Argentina, Perú y Colombia. Consulta costos según destino.", price: "A consultar" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function TiendaDemo({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <div style={{ background: C.bg, color: C.text1, fontFamily: "Outfit, sans-serif", minHeight: "100vh" }}>

      <ShopNav lang={lang} colors={C} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section id="inicio" style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
        {/* Split layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%" }}>
          {/* Left — imagen */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=85"
              alt="Maren Boutique"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </div>

          {/* Right — texto */}
          <div style={{
            display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "4rem 5rem 4rem 4rem",
            background: C.bg,
          }}>
            <p style={{
              fontFamily: "Outfit, sans-serif", fontSize: "10px",
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: C.text3, marginBottom: "2rem",
            }}>
              Colección 2024 — Santiago, Chile
            </p>

            <h1 style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 600, letterSpacing: "0.12em",
              color: C.ink, lineHeight: 1,
              marginBottom: "0.5rem",
            }}>
              MAREN
            </h1>
            <p style={{
              fontFamily: "Outfit, sans-serif", fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
              letterSpacing: "0.35em", color: C.text2,
              textTransform: "uppercase", marginBottom: "2rem",
            }}>
              Boutique &amp; Lifestyle
            </p>

            <p style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: C.text2, lineHeight: 1.8,
              maxWidth: "380px", marginBottom: "2.5rem",
            }}>
              Piezas pensadas para durar. Materiales naturales, diseño atemporal y producción consciente desde Chile.
            </p>

            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="#catalogo" style={{
                fontFamily: "Outfit, sans-serif", fontSize: "11px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.bg, background: C.ink,
                borderRadius: "2px", padding: "13px 30px",
                textDecoration: "none", fontWeight: 600,
              }}>
                Ver colección
              </a>
              <a href="#nosotros" style={{
                fontFamily: "Outfit, sans-serif", fontSize: "11px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.ink, border: `1px solid ${C.borderS}`,
                borderRadius: "2px", padding: "13px 30px",
                textDecoration: "none",
              }}>
                Nuestra historia
              </a>
            </div>

            {/* Indicadores */}
            <div style={{ display: "flex", gap: "2.5rem", marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid ${C.border}` }}>
              {[["200+", "Piezas únicas"], ["100%", "Producción local"], ["3 días", "Despacho promedio"]].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: "Cinzel, serif", fontSize: "1.3rem", color: C.ink, lineHeight: 1 }}>{num}</p>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "10px", letterSpacing: "0.08em", color: C.text3, textTransform: "uppercase", marginTop: "0.2rem" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Catálogo ──────────────────────────────────────────────── */}
      <section id="catalogo" style={{ padding: "100px 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Label text="Explorar colección" color={C.text3} />
        <h2 style={{
          fontFamily: "Cinzel, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 400, letterSpacing: "0.08em", color: C.ink,
          marginBottom: "3rem",
        }}>
          Catálogo
        </h2>
        <Catalog products={products} colors={C} />
      </section>

      {/* ── Nosotros ─────────────────────────────────────────────── */}
      <section id="nosotros" style={{ background: C.bg2, borderTop: `1px solid ${C.border}`, padding: "100px 2rem" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "6rem", alignItems: "center",
        }}>
          <div>
            <Label text="Quiénes somos" color={C.text3} />
            <h2 style={{
              fontFamily: "Cinzel, serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 400, letterSpacing: "0.06em", color: C.ink,
              marginBottom: "1.5rem", lineHeight: 1.3,
            }}>
              Moda consciente,<br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>hecha en Chile</span>
            </h2>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", color: C.text2, lineHeight: 1.8, marginBottom: "1rem" }}>
              Maren nació en 2020 como un proyecto de dos amigas apasionadas por el diseño sostenible. Trabajamos con talleres locales, telas naturales y procesos transparentes.
            </p>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", color: C.text2, lineHeight: 1.8, marginBottom: "2rem" }}>
              Cada pieza se produce en pequeñas series para evitar el exceso y garantizar la atención al detalle. Creemos en el slow fashion: comprar menos, pero mejor.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Materiales 100% naturales (lino, algodón, lana)",
                "Producción en talleres locales certificados",
                "Sin stock masivo — colecciones limitadas",
                "Embalaje 100% reciclable",
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: C.ink, marginTop: "2px", fontSize: "12px" }}>◇</span>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: C.text2 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen doble */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "end" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
              alt="Taller Maren"
              style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", borderRadius: "2px" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&q=80"
              alt="Detalle de tela"
              style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", borderRadius: "2px", marginTop: "2rem" }}
            />
          </div>
        </div>
      </section>

      {/* ── Envíos ───────────────────────────────────────────────── */}
      <section id="envios" style={{ padding: "100px 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Label text="Logística" color={C.text3} />
          <h2 style={{
            fontFamily: "Cinzel, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400, letterSpacing: "0.08em", color: C.ink,
            marginBottom: "3rem",
          }}>
            Envíos &amp; Retiro
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1px",
            border: `1px solid ${C.border}`,
            borderRadius: "4px",
            overflow: "hidden",
          }}>
            {shippingInfo.map((s) => (
              <div key={s.title} style={{
                padding: "2rem",
                background: C.bg,
                borderRight: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <p style={{
                  fontFamily: "Outfit, sans-serif", fontWeight: 600,
                  fontSize: "14px", color: C.ink, marginBottom: "0.5rem",
                }}>{s.title}</p>
                <p style={{
                  fontFamily: "Outfit, sans-serif", fontSize: "13px",
                  color: C.text2, lineHeight: 1.6, marginBottom: "0.75rem",
                }}>{s.desc}</p>
                <span style={{
                  fontFamily: "Cinzel, serif", fontSize: "13px",
                  color: C.inkLt, letterSpacing: "0.04em",
                }}>{s.price}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "1.5rem", padding: "1.25rem 1.5rem",
            background: C.bg2, border: `1px solid ${C.border}`,
            borderRadius: "4px", display: "flex",
            alignItems: "center", gap: "0.75rem",
          }}>
            <span style={{ fontSize: "1rem" }}>ℹ️</span>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: C.text2 }}>
              Los envíos se realizan de lunes a viernes. Recibirás un correo con el número de seguimiento una vez despachado tu pedido. Para cambios o devoluciones tienes 15 días.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contacto ─────────────────────────────────────────────── */}
      <section id="contacto" style={{ background: C.ink, padding: "100px 2rem" }}>
        <div style={{
          maxWidth: "700px", margin: "0 auto", textAlign: "center",
        }}>
          <p style={{
            fontFamily: "Outfit, sans-serif", fontSize: "10px",
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem",
          }}>
            Consultas &amp; Pedidos
          </p>
          <h2 style={{
            fontFamily: "Cinzel, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400, letterSpacing: "0.08em", color: C.bg,
            marginBottom: "1rem",
          }}>
            Hablemos
          </h2>
          <p style={{
            fontFamily: "Outfit, sans-serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "3rem",
          }}>
            Consulta disponibilidad de tallas, pedidos personalizados o cualquier duda sobre tu compra.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <a
              href="https://wa.me/56912345678?text=Hola!%20Me%20interesa%20un%20producto%20de%20Maren"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                fontFamily: "Outfit, sans-serif", fontSize: "13px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: C.ink, background: "#25D366",
                borderRadius: "2px", padding: "14px 36px",
                textDecoration: "none", fontWeight: 600,
              }}
            >
              <WhatsAppIcon /> Escribir por WhatsApp
            </a>

            <a
              href="mailto:hola@maren.cl"
              style={{
                fontFamily: "Outfit, sans-serif", fontSize: "13px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: "2px",
              }}
            >
              hola@maren.cl
            </a>
          </div>

          {/* Redes */}
          <SocialLinks />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{
        borderTop: `1px solid rgba(255,255,255,0.06)`,
        padding: "1.75rem 2rem",
        background: C.ink,
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: "1rem",
      }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "13px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)" }}>
          MAREN
        </p>
        <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
          © 2024 Maren Boutique — Santiago, Chile
        </p>
        <Link href={`/${lang}/demos`} style={{
          fontFamily: "Outfit, sans-serif", fontSize: "11px",
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)", textDecoration: "none",
        }}>
          ← Volver a Demos
        </Link>
      </footer>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Label({ text, color }: { text: string; color: string }) {
  return (
    <p style={{
      fontFamily: "Outfit, sans-serif", fontSize: "10px",
      letterSpacing: "0.2em", textTransform: "uppercase",
      color, marginBottom: "0.75rem",
    }}>{text}</p>
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
