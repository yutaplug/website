
import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import ReactMarkdown from "react-markdown";
import { Link } from "wouter";
import React, { useEffect, useRef } from "react";

const ICON_PATHS: Record<string, string> = {
  extension: "M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z",
  palette: "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
  security: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
  phone_android: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z",
  code: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  update: "M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z",
};

function M3EIcon({ iconName }: { iconName: string }) {
  const ref = useRef(null);
  useEffect(() => {
    const iconEl = ref.current;
    if (iconEl && ICON_PATHS[iconName]) {
      iconEl.innerHTML = `<svg width=\"40\" height=\"40\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"${ICON_PATHS[iconName]}\"/></svg>`;
    }
  }, [iconName]);
  return <m3e-icon ref={ref} slot="icon" style={{ fontSize: 48, color: 'var(--md-primary)', display: 'block', margin: '0 auto', marginBottom: 8 }}></m3e-icon>;
}


export function FeatureGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container px-4 relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-medium mb-6 tracking-tight" style={{ fontSize: '2.5rem', fontFamily: 'Roboto, ui-sans-serif, system-ui' }}>Endless customization</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium" style={{ fontSize: '1.25rem', fontFamily: 'Roboto, ui-sans-serif, system-ui' }}>
            Choose from our huge list of plugins and themes
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
          style={{ rowGap: '-2rem' }}
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <m3e-card
                variant="filled"
                actionable
                orientation="vertical"
                class="h-full flex flex-col"
                style={{
                  color: 'var(--md-on-primary-container)',
                  border: 'none',
                  borderRadius: '1.25rem',
                  padding: '1.5rem 0.75rem',
                  minHeight: '260px',
                  transition: 'background 0.3s',
                  zIndex: 1
                }}
              >
                <div slot="header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 0, marginBottom: 4 }}>
                  <M3EIcon iconName={feature.iconName || "extension"} />
                  <m3e-heading variant="display" size="x-small" style={{ margin: 0, textAlign: 'center', color: 'var(--md-on-primary-container)', fontSize: '1.1rem', fontWeight: 600 }}>{feature.title}</m3e-heading>
                </div>
                <div slot="content" style={{ textAlign: 'center', marginTop: 4, marginBottom: 4 }}>
                  <span
                    style={{ fontSize: '1.125rem', color: 'var(--md-on-surface-variant)' }}
                    dangerouslySetInnerHTML={{
                      __html: feature.description.replace(
                        /<a ([^>]+)>/g,
                        '<a $1 style="color: var(--md-primary); text-decoration: underline; font-weight: 500;" target="_blank" rel="noopener noreferrer">'
                      )
                    }}
                  />
                </div>
              </m3e-card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}