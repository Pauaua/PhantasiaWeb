import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";
import ProNav from "@/components/demos/profesional/ProNav";
import Testimonials from "@/components/demos/profesional/Testimonials";

export const metadata = {
  robots: "noindex, nofollow",
  title: "Valentina Ríos — Psicóloga",
};

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg:      "#F8F9FC",
  bg2:     "#EFF1F8",
  surface: "#FFFFFF",
  slate:   "#2D3561",
  slateLt: "#4A5490",
  blue:    "#4F6AF0",
  blueLt:  "#EEF1FE",
  text1:   "#1A1E35",
  text2:   "#6B7194",
  text3:   "#A4A8C4",
  border:  "rgba(45,53,97,0.10)",
  borderS: "rgba(79,106,240,0.30)",
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "🧠",
    name: "Terapia individual",
    desc: "Proceso terapéutico personalizado basado en enfoque cognitivo-conductual. Sesiones semanales de 50 minutos presenciales u online.",
    duration: "50 min",
    price: "$45.000",
    modes: ["Presencial", "Online"],
  },
  {
    icon: "👫",
    name: "Terapia de pareja",
    desc: "Espacio seguro para trabajar la comunicación, resolver conflictos y fortalecer el vínculo. Con o sin crisis previa.",
    duration: "60 min",
    price: "$60.000",
    modes: ["Presencial", "Online"],
  },
  {
    icon: "🌱",
    name: "Orientación vocacional",
    desc: "Proceso de autoconocimiento y exploración de intereses para jóvenes que buscan claridad sobre su camino profesional.",
    duration: "4 sesiones",
    price: "$140.000",
    modes: ["Online"],
  },
  {
    icon: "😰",
    name: "Manejo de ansiedad",
    desc: "Protocolo estructurado en 8 sesiones para comprender y reducir la ansiedad a través de técnicas validadas científicamente.",
    duration: "8 sesiones",
    price: "$320.000",
    modes: ["Presencial", "Online"],
  },
  {
    icon: "💼",
    name: "Acompañamiento laboral",
    desc: "Apoyo psicológico para profesionales que enfrentan estrés laboral, burnout o transiciones de carrera.",
    duration: "50 min",
    price: "$45.000",
    modes: ["Online"],
  },
  {
    icon: "🌙",
    name: "Intervención en crisis",
    desc: "Atención prioritaria para momentos de alta intensidad emocional. Agendamiento en 24-48 hrs.",
    duration: "60 min",
    price: "$55.000",
    modes: ["Presencial", "Online"],
  },
];

const steps = [
  { n: "01", title: "Primer contacto", desc: "Escríbeme por WhatsApp o el formulario con tu nombre, motivo de consulta y disponibilidad horaria." },
  { n: "02", title: "Sesión de evaluación", desc: "Primera sesión gratuita de 20 minutos para conocernos y evaluar si somos una buena dupla terapéutica." },
  { n: "03", title: "Plan de trabajo", desc: "Definimos juntos el enfoque, frecuencia y objetivos del proceso. Todo es flexible y revisable." },
  { n: "04", title: "Inicio del proceso", desc: "Comenzamos el trabajo terapéutico. Cada sesión es un espacio seguro, confidencial y sin juicios." },
];

const testimonials = [
  {
    name: "Sofía M.",
    role: "Diseñadora, 29 años",
    text: "Llegué sin saber muy bien qué esperar y terminé encontrando herramientas que nunca imaginé que necesitaba. El proceso con Valentina cambió mi forma de relacionarme conmigo misma.",
    stars: 5,
  },
  {
    name: "Andrés P.",
    role: "Ingeniero, 35 años",
    text: "Estaba escéptico de la terapia online, pero la comodidad y la calidad de las sesiones me convencieron desde el primer día. Llevamos 8 meses trabajando juntos.",
    stars: 5,
  },
  {
    name: "Camila y Rodrigo",
    role: "Pareja, terapia de pareja",
    text: "Llegamos en un momento muy difícil y Valentina nos dio el espacio y las herramientas para volver a comunicarnos de verdad. Sin ella no lo habríamos logrado.",
    stars: 5,
  },
  {
    name: "Martina F.",
    role: "Estudiante universitaria, 22 años",
    text: "El proceso de orientación vocacional me ayudó a dejar de paralizarme por la incertidumbre. Por primera vez me siento segura de hacia dónde voy.",
    stars: 5,
  },
];

const faqs = [
  { q: "¿Cómo sé si la terapia es para mí?", a: "La terapia es útil para cualquier persona que quiera conocerse mejor, trabajar dificultades emocionales o simplemente tener un espacio de apoyo. No es necesario estar en crisis." },
  { q: "¿Cuántas sesiones necesitaré?", a: "Depende de cada proceso. Algunos objetivos se trabajan en pocas sesiones; otros requieren mayor profundidad. Lo definimos juntos en la evaluación inicial." },
  { q: "¿Cómo funciona la sesión de evaluación gratuita?", a: "Es una videollamada de 20 minutos donde conversamos sobre tu motivo de consulta y evaluamos si hay afinidad para trabajar juntos. Sin compromiso." },
  { q: "¿Las sesiones online son igual de efectivas?", a: "Sí. La evidencia científica muestra que la terapia online tiene resultados comparables a la presencial. Además, ofrece mayor comodidad y flexibilidad." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProfesionalDemo({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <div style={{ background: C.bg, color: C.text1, fontFamily: "Outfit, sans-serif", minHeight: "100vh" }}>

      <ProNav lang={lang} colors={C} />

      {/* ── Hero / Presentación personal ─────────────────────────── */}
      <section id="inicio" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 2rem 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Fondo decorativo */}
        <div style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "600px", height: "600px", borderRadius: "50%",
          background: `radial-gradient(circle, ${C.blueLt} 0%, transparent 70%)`,
          opacity: 0.6, pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: "1100px", margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "6rem", alignItems: "center",
        }}>
          {/* Texto */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <span style={{
                fontFamily: "Outfit, sans-serif", fontSize: "10px",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: C.blue, background: C.blueLt,
                borderRadius: "4px", padding: "4px 12px",
              }}>
                Psicóloga · Reg. 18.472
              </span>
              <span style={{
                fontFamily: "Outfit, sans-serif", fontSize: "10px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.text3,
              }}>
                Presencial &amp; Online
              </span>
            </div>

            <h1 style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 600, letterSpacing: "0.06em",
              color: C.slate, lineHeight: 1.1, marginBottom: "0.5rem",
            }}>
              Valentina
            </h1>
            <h1 style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 400, letterSpacing: "0.06em",
              color: C.blue, lineHeight: 1.1, marginBottom: "1.75rem",
            }}>
              Ríos
            </h1>

            <p style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: C.text2, lineHeight: 1.8,
              maxWidth: "440px", marginBottom: "1.5rem",
            }}>
              Psicóloga clínica con más de 8 años de experiencia. Trabajo desde un enfoque cognitivo-conductual para acompañarte en procesos de cambio reales y duraderos.
            </p>

            <div style={{ display: "flex", gap: "3rem", marginBottom: "2.5rem" }}>
              {[["8+", "Años de experiencia"], ["400+", "Pacientes acompañados"], ["4.9", "★ en Google"]].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: "Cinzel, serif", fontSize: "1.6rem", color: C.slate, lineHeight: 1 }}>{num}</p>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "10px", letterSpacing: "0.08em", color: C.text3, textTransform: "uppercase", marginTop: "0.2rem" }}>{label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#contacto" style={{
                fontFamily: "Outfit, sans-serif", fontSize: "12px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#fff", background: C.blue,
                borderRadius: "6px", padding: "14px 30px",
                textDecoration: "none", fontWeight: 600,
              }}>
                Agendar hora gratuita
              </a>
              <a href="#servicios" style={{
                fontFamily: "Outfit, sans-serif", fontSize: "12px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: C.slate, border: `1px solid ${C.borderS}`,
                borderRadius: "6px", padding: "14px 30px",
                textDecoration: "none",
              }}>
                Ver servicios
              </a>
            </div>

            {/* Formación */}
            <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.text3, marginBottom: "0.75rem" }}>
                Formación
              </p>
              {[
                "Psicóloga clínica — U. de Chile",
                "Magíster en Psicoterapia Cognitivo-Conductual — PUC",
                "Diplomado en Mindfulness — U. Adolfo Ibáñez",
              ].map(item => (
                <p key={item} style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: C.text2, marginBottom: "0.3rem" }}>
                  · {item}
                </p>
              ))}
            </div>
          </div>

          {/* Foto */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", inset: "-12px",
              borderRadius: "16px",
              border: `1px solid ${C.borderS}`,
              opacity: 0.4,
            }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=85"
              alt="Valentina Ríos — Psicóloga"
              style={{
                width: "100%", aspectRatio: "3/4",
                objectFit: "cover", objectPosition: "center top",
                borderRadius: "12px",
                border: `1px solid ${C.border}`,
                position: "relative", zIndex: 1,
              }}
            />
            {/* Badge flotante */}
            <div style={{
              position: "absolute", bottom: "1.5rem", left: "-1.5rem", zIndex: 2,
              background: C.surface, borderRadius: "10px",
              border: `1px solid ${C.border}`,
              padding: "0.75rem 1.25rem",
              boxShadow: "0 8px 24px rgba(45,53,97,0.10)",
            }}>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: C.text3, marginBottom: "2px" }}>Próxima disponibilidad</p>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", fontWeight: 600, color: C.slate }}>Esta semana · Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Servicios ─────────────────────────────────────────────── */}
      <section id="servicios" style={{ background: C.bg2, borderTop: `1px solid ${C.border}`, padding: "100px 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Label text="Lo que ofrezco" color={C.blue} />
          <h2 style={{
            fontFamily: "Cinzel, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400, letterSpacing: "0.06em", color: C.slate, marginBottom: "3rem",
          }}>
            Servicios
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}>
            {services.map(s => (
              <div key={s.name} style={{
                background: C.surface, borderRadius: "10px",
                border: `1px solid ${C.border}`, padding: "1.75rem",
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "16px", color: C.slate, marginBottom: "0.5rem" }}>{s.name}</p>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: C.text2, lineHeight: 1.7, marginBottom: "1.25rem" }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {s.modes.map(m => (
                      <span key={m} style={{
                        fontFamily: "Outfit, sans-serif", fontSize: "9px",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        color: C.blue, background: C.blueLt,
                        borderRadius: "3px", padding: "2px 8px",
                      }}>{m}</span>
                    ))}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "Cinzel, serif", fontSize: "15px", color: C.slate }}>{s.price}</p>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "10px", color: C.text3 }}>{s.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nota seguros */}
          <div style={{
            marginTop: "2rem", padding: "1.25rem 1.5rem",
            background: C.blueLt, borderRadius: "8px",
            border: `1px solid ${C.borderS}`,
            display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <span style={{ fontSize: "1rem" }}>💡</span>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: C.slateLt }}>
              Trabajo con <strong>Fonasa tramo B, C y D</strong> para sesiones presenciales. Consulta cobertura de tu Isapre para modalidad online.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cómo agendar ─────────────────────────────────────────── */}
      <section id="agendar" style={{ padding: "100px 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Label text="Proceso" color={C.blue} />
          <h2 style={{
            fontFamily: "Cinzel, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400, letterSpacing: "0.06em", color: C.slate, marginBottom: "3rem",
          }}>
            Cómo agendar
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0" }}>
            {steps.map((step, i) => (
              <div key={step.n} style={{
                padding: "2rem",
                borderRight: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                borderTop: `1px solid ${C.border}`,
                borderLeft: i === 0 ? `1px solid ${C.border}` : "none",
                position: "relative",
              }}>
                {/* Número */}
                <p style={{
                  fontFamily: "Cinzel, serif", fontSize: "3rem",
                  color: C.blueLt, lineHeight: 1, marginBottom: "1rem",
                  fontWeight: 700,
                }}>{step.n}</p>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "15px", color: C.slate, marginBottom: "0.5rem" }}>{step.title}</p>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "13px", color: C.text2, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href="#contacto" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "Outfit, sans-serif", fontSize: "12px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#fff", background: C.blue,
              borderRadius: "6px", padding: "14px 36px",
              textDecoration: "none", fontWeight: 600,
            }}>
              Comenzar con la sesión gratuita →
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonios ──────────────────────────────────────────── */}
      <section id="testimonios" style={{ background: C.bg2, borderTop: `1px solid ${C.border}`, padding: "100px 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Label text="Experiencias" color={C.blue} />
          <h2 style={{
            fontFamily: "Cinzel, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400, letterSpacing: "0.06em", color: C.slate,
            marginBottom: "4rem", textAlign: "center",
          }}>
            Lo que dicen mis pacientes
          </h2>
          <Testimonials items={testimonials} colors={C} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Label text="Preguntas frecuentes" color={C.blue} />
          <h2 style={{
            fontFamily: "Cinzel, serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            fontWeight: 400, letterSpacing: "0.06em", color: C.slate, marginBottom: "3rem",
          }}>
            Dudas comunes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {faqs.map((faq, i) => (
              <div key={faq.q} style={{
                padding: "1.75rem 0",
                borderBottom: `1px solid ${C.border}`,
                borderTop: i === 0 ? `1px solid ${C.border}` : "none",
              }}>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "15px", color: C.slate, marginBottom: "0.6rem" }}>
                  {faq.q}
                </p>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: C.text2, lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacto ─────────────────────────────────────────────── */}
      <section id="contacto" style={{ background: C.slate, padding: "100px 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <p style={{
              fontFamily: "Outfit, sans-serif", fontSize: "10px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem",
            }}>
              Primer paso
            </p>
            <h2 style={{
              fontFamily: "Cinzel, serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 400, letterSpacing: "0.06em",
              color: "#fff", marginBottom: "1rem", lineHeight: 1.3,
            }}>
              Agenda tu sesión<br />
              <span style={{ color: C.blue }}>de evaluación gratuita</span>
            </h2>
            <p style={{
              fontFamily: "Outfit, sans-serif", fontSize: "1rem",
              color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "2.5rem",
            }}>
              20 minutos sin costo ni compromiso para conocernos y ver si podemos trabajar juntos. Respondo en menos de 24 horas.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a href="https://wa.me/56912345678?text=Hola%20Valentina!%20Quisiera%20agendar%20la%20sesi%C3%B3n%20de%20evaluaci%C3%B3n%20gratuita"
                target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.6rem",
                  fontFamily: "Outfit, sans-serif", fontSize: "13px",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: C.slate, background: "#25D366",
                  borderRadius: "6px", padding: "14px 28px",
                  textDecoration: "none", fontWeight: 600,
                }}>
                <WhatsAppIcon /> WhatsApp
              </a>
              <a href="mailto:hola@valentinarios.cl" style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                fontFamily: "Outfit, sans-serif", fontSize: "13px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "6px", padding: "14px 28px",
                textDecoration: "none",
              }}>
                <MailIcon /> hola@valentinarios.cl
              </a>
            </div>
          </div>

          {/* Detalles de contacto */}
          <div style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "12px", padding: "2.5rem",
          }}>
            {[
              { icon: "📍", label: "Consulta presencial", value: "Av. Providencia 1860, Of. 304\nProvidencia, Santiago" },
              { icon: "🖥", label: "Sesiones online", value: "Videollamada por Zoom o Google Meet\nDisponible todo Chile" },
              { icon: "🕐", label: "Horarios de atención", value: "Lunes a Viernes: 9:00 — 19:00\nSábados: 9:00 — 14:00" },
              { icon: "⏱", label: "Tiempo de respuesta", value: "Respondo en menos de 24 horas\nEn días hábiles" },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex", gap: "1rem", padding: "1.25rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>{item.label}</p>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "1.75rem 2rem",
        background: C.slate,
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: "1rem",
      }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "13px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)" }}>
          VALENTINA RÍOS — PSICÓLOGA
        </p>
        <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
          © 2024 · Registro SIS 18.472
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

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
