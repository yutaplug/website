import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Footer } from "@/components/Footer";
import { ThemePreviewCarousel } from "@/components/ThemePreviewCarousel";
import { STATS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-primary/30 overflow-x-hidden flex flex-col items-center pt-20 md:pt-20">
      <div className="w-full max-w-7xl">
        <Hero />
        <section className="py-12 bg-transparent relative overflow-hidden">
          <div className="grid-bg absolute inset-0 opacity-20" />
          <div className="container px-4 relative z-10 max-w-5xl mx-auto">
            <div
              className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-6 sm:gap-[2.5rem] bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] rounded-[2rem] p-6 sm:p-[1.5rem_2.5rem] shadow-[0_2px_12px_0_rgba(0,0,0,0.04)] font-[tabular-nums]"
              style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)', fontFamily: 'Roboto, ui-sans-serif, system-ui' }}
            >
              {STATS.map((stat, index) => (
                <div key={index} className="flex flex-col items-center min-w-[120px] py-2">
                  <span className="font-extrabold text-4xl sm:text-[2.25rem] leading-none tracking-tight" style={{ fontFamily: 'Roboto, ui-sans-serif, system-ui' }}>{stat.value}</span>
                  <span className="text-base sm:text-lg font-medium mt-1" style={{ fontFamily: 'Roboto, ui-sans-serif, system-ui', textTransform: 'none', letterSpacing: 0 }}>{stat.label}</span>
                </div>
              )).reduce((acc, el, i, arr) => acc.concat(
                el,
                i < arr.length - 1 ? <div key={`divider-${i}`} className="hidden sm:block w-px h-10 bg-[var(--md-on-primary-container)] opacity-15 rounded" /> : []
              ), [])}
            </div>
          </div>
        </section>
        <m3e-divider />

          <FeatureGrid />
          <m3e-divider />
          <ThemePreviewCarousel />
          <m3e-divider />
        
        <section className="pt-10 pb-4 sm:py-24 px-4 relative overflow-hidden bg-transparent">
          <div className="container relative z-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-2xl shadow-primary/10"
            >
              <a href="https://discord.gg/EsNDvBaHVU" target="_blank" rel="noreferrer" className="block hover:opacity-90 transition-opacity duration-300">
                <img 
                  src="/discord-banner.webp" 
                  alt="Aliucord Discord Server Banner" 
                  className="w-full h-auto object-cover"
                />
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}