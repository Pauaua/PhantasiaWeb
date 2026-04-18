import { getDictionary, type Locale } from "@/lib/dictionaries";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import QuoteBand from "@/components/sections/QuoteBand";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PricingSection from "@/components/sections/PricingSection";
import OnboardingSection from "@/components/sections/OnboardingSection";
import Footer from "@/components/layout/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <HeroSection dict={dict} />
        <QuoteBand dict={dict} />
        <AboutSection dict={dict} />
        <ServicesSection dict={dict} />
        <ProcessSection dict={dict} />
        <PricingSection dict={dict} />
        <OnboardingSection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
