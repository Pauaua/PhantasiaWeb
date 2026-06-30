import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";
import RestaurantNav from "@/components/demos/restauran/RestaurantNav";
import MenuSection from "@/components/demos/restauran/MenuSection";

export const metadata = {
  robots: "noindex, nofollow",
  title: "Alma — Cocina & Café",
};

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg:      "#0F120C",
  bg2:     "#131710",
  surface: "#191E15",
  green:   "#7A9E6E",
  greenDk: "#4F6B44",
  cream:   "#F2EBD9",
  text1:   "#EDE6D3",
  text2:   "#9A9484",
  text3:   "#5C5748",
  border:  "rgba(122,158,110,0.15)",
  borderS: "rgba(122,158,110,0.40)",
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
const menuCategories = [
  {
    id: "desayunos",
    label: "Desayunos",
    emoji: "☕",
    items: [
      { name: "Tostadas artesanales", desc: "Pan de masa madre, palta, tomate cherry y aceite de oliva", price: "$5.500" },
      { name: "Bowl de granola", desc: "Avena tostada, frutas frescas de temporada, yogur natural y miel", price: "$6.200", tag: "vegano" },
      { name: "Huevos Benedict", desc: "Huevos poché, jamón serrano, salsa holandesa sobre pan brioche", price: "$7.800" },
      { name: "Pancakes de avena", desc: "Con maple syrup, frutos del bosque y crema chantilly", price: "$6.900" },
      { name: "Croissant + café", desc: "Croissant de mantequilla francés acompañado de café de especialidad", price: "$4.500" },
      { name: "Acai bowl", desc: "Acai orgánico, banana, granola artesanal, coco rallado y semillas", price: "$7.200", tag: "popular" },
    ],
  },
  {
    id: "almuerzo",
    label: "Almuerzo",
    emoji: "🍽️",
    items: [
      { name: "Risotto de champiñones", desc: "Arroz arborio, mix de hongos, parmesano añejo y trufa negra", price: "$11.900" },
      { name: "Filete de salmón", desc: "Con quinoa tricolor, verduras salteadas y salsa de limón y alcaparras", price: "$13.500", tag: "popular" },
      { name: "Pasta al pesto", desc: "Espaguetti artesanal, pesto de albahaca, piñones y parmesano", price: "$9.800", tag: "vegano" },
      { name: "Hamburguesa Alma", desc: "200g de vacuno, cheddar artesanal, cebolla caramelizada y papas fritas caseras", price: "$10.500" },
      { name: "Ensalada Niçoise", desc: "Atún sellado, huevo, aceitunas negras, tomate y vinagreta de mostaza", price: "$9.200" },
      { name: "Lomo saltado", desc: "Clásico peruano con arroz blanco, papas fritas y salsa criolla", price: "$11.200" },
    ],
  },
  {
    id: "cafeteria",
    label: "Cafetería",
    emoji: "🫖",
    items: [
      { name: "Espresso simple", desc: "Blend de origen único, extracción de 25ml a 93°C", price: "$1.800" },
      { name: "Flat white", desc: "Doble ristretto con leche vaporizada texturizada en micro-foam", price: "$3.200", tag: "popular" },
      { name: "Pour over", desc: "Filtrado manual, origen Etiopía Yirgacheffe. Notas de durazno y jazmín", price: "$3.800" },
      { name: "Matcha latte", desc: "Matcha ceremonial japonés con leche de avena y jarabe de vainilla", price: "$3.500" },
      { name: "Chocolate caliente", desc: "Cacao 70%, leche entera y canela", price: "$2.900" },
      { name: "Té de hierbas", desc: "Selección de hierbas orgánicas, servido en tetera individual", price: "$2.400", tag: "vegano" },
    ],
  },
  {
    id: "pasteleria",
    label: "Pastelería",
    emoji: "🥐",
    items: [
      { name: "Torta de chocolate", desc: "Tres capas de brownie húmedo, ganache y frambuesas frescas", price: "$4.900", tag: "popular" },
      { name: "Cheesecake de maracuyá", desc: "Base de galleta, crema Philadelphia y coulis de maracuyá", price: "$4.500" },
      { name: "Muffin de arándano", desc: "Receta casera con arándanos frescos y toping crumble", price: "$2.800" },
      { name: "Croissant de almendra", desc: "Croissant de mantequilla relleno de crema de almendras y laminadas", price: "$3.200" },
      { name: "Eclair de vainilla", desc: "Masa choux, crema pastelera de vainilla de Madagascar y glasé", price: "$3.600" },
      { name: "Tarta de frutas", desc: "Base de masa sablée, crema frangipane y frutas de temporada", price: "$4.200" },
    ],
  },
];

const hours = [
  { day: "Lunes — Viernes", time: "08:00 — 22:00" },
  { day: "Sábado", time: "09:00 — 23:00" },
  { day: "Domingo", time: "10:00 — 20:00" },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", alt: "Plato principal" },
  { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", alt: "Pastelería" },
  { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", alt: "Café de especialidad" },
  { src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80", alt: "Interior restaurante" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function RestaurantDemo({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <div style={{ background: C.bg, color: C.text1, fontFamily: "Outfit, sans-serif", minHeight: "100vh" }}>

      <RestaurantNav lang={lang} colors={C} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        id="inicio"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85"
          alt="Alma Cocina & Café"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            filter: "brightness(0.3)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, ${C.bg} 0%, rgba(15,18,12,0.6) 50%, transparent 100%)`,
        }} />

        <div style={{ position: "relative", zIndex: 1, padding: "0 2rem 80px", maxWidth: "700px", margin: "0 auto", width: "100%" }}>
          {/* Tagline */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "30px", height: "1px", background: C.green, opacity: 0.7 }} />
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: C.green, textTransform: "uppercase" }}>
              Cocina de autor · Santiago
            </span>
          </div>

          <h1 style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: C.cream,
            lineHeight: 0.9,
            marginBottom: "0.3rem",
          }}>
            ALMA
          </h1>
          <p style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            letterSpacing: "0.35em",
            color: C.green,
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>
            Cocina &amp; Café
          </p>

          <p style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: C.text2,
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "460px",
          }}>
            Ingredientes de temporada, técnica honesta y un espacio donde el tiempo pasa más despacio.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="#menu"
              style={{
                fontFamily: "Outfit, sans-serif", fontSize: "12px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.bg, background: C.green,
                borderRadius: "3px", padding: "13px 28px",
                textDecoration: "none", fontWeight: 600,
              }}
            >
              Ver menú
            </a>
            <a
              href="https://wa.me/56912345678?text=Hola!%20Quisiera%20reservar%20una%20mesa"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "Outfit, sans-serif", fontSize: "12px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.cream,
                border: `1px solid ${C.borderS}`,
                borderRadius: "3px", padding: "13px 28px",
                textDecoration: "none",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}
            >
              <WhatsAppIcon /> Reservar mesa
            </a>
          </div>
        </div>
      </section>

      {/* ── Tres pilares ─────────────────────────────────────────── */}
      <section style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{
          maxWidth: "1000px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
        }}>
          {[
            { icon: "🌿", label: "Ingredientes de temporada", desc: "Productores locales y orgánicos" },
            { icon: "👨‍🍳", label: "Cocina de autor", desc: "Técnica clásica con alma contemporánea" },
            { icon: "☕", label: "Café de especialidad", desc: "Origen único, preparación manual" },
          ].map((p, i) => (
            <div key={p.label} style={{
              padding: "2rem 2.5rem",
              textAlign: "center",
              borderRight: i < 2 ? `1px solid ${C.border}` : "none",
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{p.icon}</div>
              <p style={{ fontFamily: "Cinzel, serif", fontSize: "13px", letterSpacing: "0.06em", color: C.text1, marginBottom: "0.3rem" }}>{p.label}</p>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: C.text3 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Menú ─────────────────────────────────────────────────── */}
      <section id="menu" style={{ padding: "100px 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <Label text="Lo que preparamos" color={C.green} />
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <h2 style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400, letterSpacing: "0.08em",
            color: C.text1,
          }}>
            Nuestra Carta
          </h2>
          <a
            href="/carta-alma.pdf"
            style={{
              fontFamily: "Outfit, sans-serif", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.green,
              border: `1px solid ${C.borderS}`,
              borderRadius: "3px", padding: "8px 16px",
              textDecoration: "none",
              display: "flex", alignItems: "center", gap: "0.4rem",
            }}
          >
            <PdfIcon /> Descargar carta PDF
          </a>
        </div>

        <MenuSection categories={menuCategories} colors={C} />
      </section>

      {/* ── Galería ───────────────────────────────────────────────── */}
      <section style={{ padding: "0 2rem 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <Label text="Nuestro espacio" color={C.green} />
        <h2 style={{
          fontFamily: "Cinzel, serif",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 400, letterSpacing: "0.08em",
          color: C.text1, marginBottom: "3rem",
        }}>
          Galería
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}>
          {gallery.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              style={{
                width: "100%",
                aspectRatio: i === 0 ? "16/9" : "4/3",
                gridColumn: i === 0 ? "1 / -1" : "auto",
                objectFit: "cover",
                borderRadius: "4px",
                border: `1px solid ${C.border}`,
                filter: "brightness(0.85)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Nosotros ─────────────────────────────────────────────── */}
      <section id="nosotros" style={{ background: C.bg2, borderTop: `1px solid ${C.border}`, padding: "100px 2rem" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "5rem", alignItems: "center",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=80"
            alt="Interior Alma"
            style={{
              width: "100%", aspectRatio: "4/5",
              objectFit: "cover", borderRadius: "4px",
              border: `1px solid ${C.border}`,
              filter: "brightness(0.8)",
            }}
          />
          <div>
            <Label text="Nuestra historia" color={C.green} />
            <h2 style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 400, letterSpacing: "0.06em",
              color: C.text1, marginBottom: "1.5rem", lineHeight: 1.3,
            }}>
              Un rincón donde el<br />
              <span style={{ color: C.green }}>sabor tiene historia</span>
            </h2>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", color: C.text2, lineHeight: 1.8, marginBottom: "1rem" }}>
              Alma nació en 2019 con una idea simple: ofrecer comida real, hecha con cariño y buenos ingredientes, en un espacio que invitara a quedarse. Hoy somos un equipo de 12 personas apasionadas por la cocina honesta.
            </p>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", color: C.text2, lineHeight: 1.8 }}>
              Trabajamos con productores locales, cambiamos el menú con las estaciones y creemos que un buen café puede cambiar el día.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", gap: "2rem" }}>
              {[["6+", "Años"], ["4.8", "★ Google"], ["12", "Personas"]].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: "Cinzel, serif", fontSize: "1.8rem", color: C.green, lineHeight: 1 }}>{num}</p>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: C.text3, textTransform: "uppercase" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Horarios + Ubicación ──────────────────────────────────── */}
      <section id="horarios" style={{ padding: "100px 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>

          {/* Horarios */}
          <div>
            <Label text="Cuándo visitarnos" color={C.green} />
            <h2 style={{
              fontFamily: "Cinzel, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400, letterSpacing: "0.06em", color: C.text1, marginBottom: "2rem",
            }}>Horarios</h2>

            {hours.map((h, i) => (
              <div key={h.day} style={{
                display: "flex", justifyContent: "space-between",
                padding: "1rem 0",
                borderBottom: `1px solid ${C.border}`,
                borderTop: i === 0 ? `1px solid ${C.border}` : "none",
              }}>
                <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: C.text2 }}>{h.day}</span>
                <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: C.green, fontWeight: 500 }}>{h.time}</span>
              </div>
            ))}

            <div style={{ marginTop: "2.5rem", padding: "1.25rem", background: C.surface, borderRadius: "6px", border: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: C.green, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                Reservas
              </p>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: C.text2, lineHeight: 1.6 }}>
                Recomendamos reservar con anticipación, especialmente los fines de semana. Grupos de más de 6 personas llamar directo.
              </p>
              <a
                href="https://wa.me/56912345678?text=Hola!%20Quisiera%20reservar%20una%20mesa"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  marginTop: "1rem",
                  fontFamily: "Outfit, sans-serif", fontSize: "12px",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#fff", background: "#25D366",
                  borderRadius: "3px", padding: "9px 20px",
                  textDecoration: "none", fontWeight: 500,
                }}
              >
                <WhatsAppIcon /> Reservar por WhatsApp
              </a>
            </div>
          </div>

          {/* Ubicación */}
          <div id="ubicacion">
            <Label text="Dónde estamos" color={C.green} />
            <h2 style={{
              fontFamily: "Cinzel, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400, letterSpacing: "0.06em", color: C.text1, marginBottom: "2rem",
            }}>Ubicación</h2>

            <div style={{
              width: "100%", height: "260px",
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: "4px", overflow: "hidden", marginBottom: "1.25rem",
            }}>
              <iframe
                title="Ubicación Alma"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.848627!2d-70.6482!3d-33.4316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI1JzUzLjgiUyA3MMKwMzgnNTMuNSJX!5e0!3m2!1ses!2scl!4v1234567890"
                width="100%" height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(190deg) saturate(0.5)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "15px", color: C.text2, lineHeight: 1.7 }}>
              📍 Av. Providencia 2346, Local 8<br />
              Providencia, Santiago — Metro Pedro de Valdivia
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{
        borderTop: `1px solid ${C.border}`,
        padding: "2rem",
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between",
        gap: "1rem", background: C.bg2,
      }}>
        <div>
          <p style={{ fontFamily: "Cinzel, serif", fontSize: "14px", letterSpacing: "0.2em", color: C.green }}>ALMA</p>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: C.text3, letterSpacing: "0.15em" }}>COCINA &amp; CAFÉ</p>
        </div>
        <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: C.text3 }}>
          © 2024 Alma Cocina &amp; Café — Santiago
        </p>
        <Link href={`/${lang}/demos`} style={{
          fontFamily: "Outfit, sans-serif", fontSize: "11px",
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: C.text3, textDecoration: "none",
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.109 1.522 5.84L.057 23.885a.5.5 0 0 0 .611.612l6.074-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.886 9.886 0 0 1-5.031-1.375l-.36-.214-3.733.9.92-3.62-.235-.373A9.889 9.889 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.465 0 9.9 4.434 9.9 9.9 0 5.466-4.435 9.9-9.9 9.9z"/>
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  );
}
