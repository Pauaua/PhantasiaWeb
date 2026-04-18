import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phantasia — La imagen hecha código",
  description:
    "Diseñamos y desarrollamos sitios web, aplicaciones y software a medida con precisión deliberada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
