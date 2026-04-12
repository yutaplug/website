import React from "react";
import MaterialIcon from "./MaterialIcon";
import "@m3e/web/icon-button";
import "@m3e/web/chips";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const THEME_PREVIEWS = [
  { src: "/previews/preview1.png", name: "Theme Preview 1" },
  { src: "/previews/preview2.png", name: "Theme Preview 2" },
  { src: "/previews/preview3.png", name: "Theme Preview 3" },
  { src: "/previews/preview4.png", name: "Theme Preview 4" },
  { src: "/previews/preview5.png", name: "Theme Preview 5" },
];

export function ThemePreviewCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  // Refs for dynamic chips
  const chipRefs = React.useRef<(Element | null)[]>([]);

  // Attach click handlers after render
  React.useEffect(() => {
    if (!api || count === 0) return;
    // Store handlers so we can remove them
    const handlers: Array<() => void> = [];
    chipRefs.current.forEach((el, index) => {
      if (el) {
        const handler = () => api.scrollTo(index);
        handlers[index] = handler;
        el.addEventListener('click', handler);
      }
    });
    // Clean up all listeners on unmount or change
    return () => {
      chipRefs.current.forEach((el, index) => {
        if (el && handlers[index]) {
          el.removeEventListener('click', handlers[index]);
        }
      });
    };
  }, [api, count, current]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const syncState = () => {
      setCurrent(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };

    syncState();
    api.on("select", syncState);
    api.on("reInit", syncState);

    return () => {
      api.off("select", syncState);
      api.off("reInit", syncState);
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [api]);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none" />
      <div className="container relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">Themes</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-10 md:px-14"
        >
          <div className="relative flex items-center w-full">
            <div className="relative w-full">
              <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
                <CarouselContent>
                  {THEME_PREVIEWS.map((preview) => (
                    <CarouselItem key={preview.src} className="basis-full">
                      <img
                        src={preview.src}
                        alt={preview.name}
                        loading="lazy"
                        className="w-full h-auto max-h-[60vh] md:max-h-[70vh] object-cover object-center transition-transform duration-500 hover:scale-[1.01]"
                        style={{ display: 'block', borderRadius: 0, margin: 0, padding: 0 }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>

          {count > 0 && (
            <>
              <m3e-chip-set className="mt-6 flex flex-row items-center justify-center gap-1">
                {Array.from({ length: count }).map((_, index) => (
                  <m3e-chip
                    key={index}
                    ref={el => (chipRefs.current[index] = el as HTMLElement | null)}
                    variant={index === current ? "filled" : "tonal"}
                    size="small"
                    aria-label={`Go to preview ${index + 1}`}
                    style={{
                      padding: 0,
                      minWidth: 12,
                      width: 12,
                      height: 12,
                      fontSize: 0,
                      borderRadius: 9999,
                      opacity: index === current ? 1 : 0.7,
                      margin: 2,
                      background: index === current ? 'var(--md-primary, #00C853)' : 'var(--md-surface-variant, #e0e0e0)',
                      border: index === current ? 'none' : '1.5px solid var(--md-outline, #bdbdbd)',
                      transition: 'background 0.2s, border 0.2s, opacity 0.2s',
                    }}
                  />
                ))}
              </m3e-chip-set>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-10"
        >
          <Link href="/themes">
            <m3e-button type="button" variant="filled" color="primary" style={{ fontSize: '1.1rem', padding: '0 2.2em' }}>
              Explore all themes
            </m3e-button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}