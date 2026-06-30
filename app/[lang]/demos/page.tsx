import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import DemoCard, { type Demo } from "@/components/sections/DemoCard";
import ContactFloat from "@/components/demos/ContactFloat";

export const metadata = {
  robots: "noindex, nofollow",
};

// ─── i18n ─────────────────────────────────────────────────────────────────────
const t = {
  es: {
    badge:     "Demos",
    label:     "Portfolio de demos",
    title:     "Proyectos",
    titleAccent: "a medida",
    subtitle:  "Explora ejemplos reales de lo que podemos construir juntos. Cada demo representa una solución pensada para un tipo de negocio.",
    ctaTitle:  "¿Te imaginas tu proyecto aquí?",
    ctaBody:   "Cuéntanos tu idea y lo construimos juntos.",
    ctaBtn:    "Ir a Phantasia",
    footer:    "Phantasia — phantasia.cl",
  },
  en: {
    badge:     "Demos",
    label:     "Demo portfolio",
    title:     "Tailored",
    titleAccent: "projects",
    subtitle:  "Explore real examples of what we can build together. Each demo represents a solution designed for a specific type of business.",
    ctaTitle:  "Can you picture your project here?",
    ctaBody:   "Tell us your idea and we'll build it together.",
    ctaBtn:    "Go to Phantasia",
    footer:    "Phantasia — phantasia.cl",
  },
  fr: {
    badge:     "Démos",
    label:     "Portfolio de démos",
    title:     "Projets",
    titleAccent: "sur mesure",
    subtitle:  "Explorez des exemples concrets de ce que nous pouvons construire ensemble. Chaque démo représente une solution pensée pour un type d'entreprise.",
    ctaTitle:  "Vous imaginez votre projet ici ?",
    ctaBody:   "Partagez votre idée et nous la construisons ensemble.",
    ctaBtn:    "Aller à Phantasia",
    footer:    "Phantasia — phantasia.cl",
  },
} satisfies Record<Locale, Record<string, string>>;

// ─── Demo data (title/desc stay in their original language — they're brand names) ──
const getDemos = (lang: Locale): Demo[] => {
  const labels: Record<Locale, { cats: string[]; descs: string[]; tagSets: string[][] }> = {
    es: {
      cats: [
        "Peluquería · Barbería · Salón",
        "Restorán · Cafetería · Pastelería",
        "Tienda · Boutique · Bazar",
        "Servicio profesional independiente",
      ],
      descs: [
        "Landing para barbería clásica con servicios, galería, horarios y reserva por WhatsApp.",
        "Landing con menú por categorías, descarga de carta PDF, galería, horarios y reserva por WhatsApp.",
        "Catálogo filtrable por categoría con zoom y acción rápida, envíos, sección de marca y contacto.",
        "Presentación personal con credenciales, servicios con precios, proceso de agendamiento, testimonios y contacto.",
      ],
      tagSets: [
        ["Hero foto", "Servicios + precios", "Galería", "WhatsApp"],
        ["Hero foto", "Menú interactivo", "Horarios", "WhatsApp"],
        ["Catálogo interactivo", "Filtros", "Envíos", "WhatsApp"],
        ["Bio + credenciales", "Servicios", "Testimonios", "WhatsApp"],
      ],
    },
    en: {
      cats: [
        "Hair Salon · Barbershop · Beauty",
        "Restaurant · Café · Bakery",
        "Store · Boutique · Shop",
        "Independent professional service",
      ],
      descs: [
        "Landing for a classic barbershop with services, gallery, hours and WhatsApp booking.",
        "Landing with category menu, PDF download, gallery, hours and WhatsApp reservation.",
        "Filterable catalog by category with zoom and quick action, shipping info and contact.",
        "Personal presentation with credentials, services with pricing, booking process, testimonials and contact.",
      ],
      tagSets: [
        ["Hero photo", "Services + pricing", "Gallery", "WhatsApp"],
        ["Hero photo", "Interactive menu", "Hours", "WhatsApp"],
        ["Interactive catalog", "Filters", "Shipping", "WhatsApp"],
        ["Bio + credentials", "Services", "Testimonials", "WhatsApp"],
      ],
    },
    fr: {
      cats: [
        "Salon de coiffure · Barbier · Beauté",
        "Restaurant · Café · Pâtisserie",
        "Boutique · Magasin · Bazar",
        "Service professionnel indépendant",
      ],
      descs: [
        "Landing pour un barbier classique avec services, galerie, horaires et réservation WhatsApp.",
        "Landing avec menu par catégories, téléchargement PDF, galerie, horaires et réservation WhatsApp.",
        "Catalogue filtrable par catégorie avec zoom et action rapide, livraison et contact.",
        "Présentation personnelle avec diplômes, services tarifés, processus de prise de rendez-vous, témoignages et contact.",
      ],
      tagSets: [
        ["Photo hero", "Services + tarifs", "Galerie", "WhatsApp"],
        ["Photo hero", "Menu interactif", "Horaires", "WhatsApp"],
        ["Catalogue interactif", "Filtres", "Livraison", "WhatsApp"],
        ["Bio + diplômes", "Services", "Témoignages", "WhatsApp"],
      ],
    },
  };

  const l = labels[lang];
  const titles = ["Blade & Co.", "Alma — Cocina & Café", "Maren — Boutique", "Valentina Ríos — Psicóloga"];
  const hrefs = ["peluqueria", "restauran", "tienda", "profesional"];
  const previews = [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  ];

  return titles.map((title, i) => ({
    id: `demo-0${i + 1}`,
    category: l.cats[i],
    title,
    description: l.descs[i],
    tags: l.tagSets[i],
    href: hrefs[i],
    preview: previews[i],
  }));
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function DemosPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const tx = t[lang];
  const demos = getDemos(lang);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text-1)",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: "58px",
          background: "var(--nav-bg)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            height: "100%",
            padding: "0 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <Link href={`/${lang}`} style={{ textDecoration: "none", flexShrink: 0 }}>
            <Logo size={26} showWordmark orientation="horizontal" />
          </Link>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Badge — oculto en móvil muy pequeño */}
            <span
              className="hidden sm:inline-block"
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--brand)",
                border: "1px solid var(--border-s)",
                borderRadius: "4px",
                padding: "3px 10px",
              }}
            >
              {tx.badge}
            </span>
            <LanguageSwitcher current={lang} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        style={{
          padding: "130px 1.25rem 70px",
          textAlign: "center",
        }}
      >
        {/* Phi orbitante */}
        <div
          style={{
            position: "relative",
            width: "72px",
            height: "72px",
            margin: "0 auto 2rem",
          }}
        >
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--border-s)" }} />
          <div style={{ position: "absolute", inset: "10px", borderRadius: "50%", border: "1px solid var(--border)" }} />
          <div style={{ position: "absolute", inset: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Logo size={30} showWordmark={false} />
          </div>
        </div>

        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--brand)",
            marginBottom: "1rem",
          }}
        >
          {tx.label}
        </p>

        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
            fontWeight: 400,
            letterSpacing: "0.08em",
            color: "var(--text-1)",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          {tx.title}{" "}
          <span style={{ color: "var(--brand)" }}>{tx.titleAccent}</span>
        </h1>

        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
            color: "var(--text-2)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          {tx.subtitle}
        </p>

        <div style={{ width: "36px", height: "1px", background: "var(--brand)", opacity: 0.4, margin: "2rem auto 0" }} />
      </section>

      {/* ── Demo grid ──────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.25rem 100px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {demos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      </section>

      {/* ── CTA → Phantasia ────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          padding: "70px 1.25rem",
          textAlign: "center",
          background: "var(--bg2)",
        }}
      >
        <p
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1rem, 4vw, 1.8rem)",
            fontWeight: 400,
            letterSpacing: "0.06em",
            color: "var(--text-1)",
            marginBottom: "0.75rem",
          }}
        >
          {tx.ctaTitle}
        </p>
        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "0.95rem",
            color: "var(--text-2)",
            marginBottom: "2rem",
          }}
        >
          {tx.ctaBody}
        </p>
        <Link
          href={`/${lang}#proyecto`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "Outfit, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#fff",
            background: "var(--brand)",
            borderRadius: "8px",
            padding: "13px 28px",
            textDecoration: "none",
          }}
        >
          {tx.ctaBtn}
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      {/* ── Botón flotante de contacto ─────────────────────────── */}
      <ContactFloat lang={lang} />

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.25rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: "var(--text-3)",
          }}
        >
          © {new Date().getFullYear()} {tx.footer}
        </p>
      </footer>
    </div>
  );
}
