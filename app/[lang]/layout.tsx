import type { Metadata } from "next";
import Providers from "@/components/layout/Providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Phantasia — La imagen hecha código",
  description:
    "Diseñamos y desarrollamos sitios web, aplicaciones y software a medida con precisión deliberada.",
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
    <html lang={lang} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
