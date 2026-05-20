import type { Metadata } from "next";
import Providers from "@/components/layout/Providers";

const META = {
  es: {
    title: "Phantasia | Desarrollo Web y Software a Medida — Chile",
    description:
      "Agencia de desarrollo web, aplicaciones y software a medida en Chile. Diseñamos y construimos sitios web, plataformas SaaS y sistemas personalizados con precisión deliberada.",
    keywords:
      "desarrollo web Chile, software a medida, aplicaciones web, sitios web profesionales, agencia digital, Next.js, React, diseño web, desarrollo de software, SaaS Chile",
  },
  en: {
    title: "Phantasia | Web Development & Custom Software — Chile",
    description:
      "Web development agency in Chile specializing in websites, web applications and custom software. We build SaaS platforms, corporate sites and tailored systems with deliberate precision.",
    keywords:
      "web development Chile, custom software, web applications, professional websites, digital agency, Next.js, React, web design, software development, SaaS Chile",
  },
  fr: {
    title: "Phantasia | Développement Web et Logiciel Sur Mesure — Chili",
    description:
      "Agence de développement web au Chili spécialisée dans les sites web, applications et logiciels sur mesure. Nous construisons des plateformes SaaS et des systèmes personnalisés.",
    keywords:
      "développement web Chili, logiciel sur mesure, applications web, sites web professionnels, agence digitale, Next.js, React, design web",
  },
};

const BASE_URL = "https://phantasia.cl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang as keyof typeof META] ?? META.es;
  const url = `${BASE_URL}/${lang}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: {
        "es": `${BASE_URL}/es`,
        "en": `${BASE_URL}/en`,
        "fr": `${BASE_URL}/fr`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: "Phantasia",
      locale: lang === "es" ? "es_CL" : lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Phantasia",
  url: BASE_URL,
  email: "hola@phantasia.cl",
  description:
    "Agencia de desarrollo web, aplicaciones y software a medida en Chile.",
  areaServed: "CL",
  knowsLanguage: ["es", "en", "fr"],
  serviceType: [
    "Desarrollo web",
    "Aplicaciones web",
    "Software a medida",
    "Diseño UI/UX",
  ],
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
