import { motion } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/constants";
import "@m3e/web/expansion-panel";

export default function FAQ() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-24 px-4">
      <div className="container max-w-5xl">
        <div className="text-center mb-16" style={{ marginTop: '3rem' }}>
          <h1 className="text-4xl font-medium mb-6 tracking-tighter" style={{ fontSize: '2.5rem', fontFamily: 'Roboto, ui-sans-serif, system-ui' }}>Frequently Asked Questions</h1>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4 justify-center">
          <m3e-accordion multi>
            {FAQ_ITEMS.map((item, index) => (
              <m3e-expansion-panel key={index} style={{ borderRadius: '2rem', overflow: 'hidden', background: 'var(--md-surface-container)', color: 'var(--md-on-surface)' }}>
                <span slot="header" style={{ fontSize: '1.25rem', fontWeight: 500, fontFamily: 'Roboto, ui-sans-serif, system-ui', padding: '1.25rem 2rem', display: 'block' }}>{item.question}</span>
                <div
                  style={{ fontSize: '1.125rem', color: 'var(--md-on-surface-variant)', padding: '0 2rem 1.5rem 2rem', whiteSpace: 'pre-line', lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{
                    __html: item.answer.replace(
                      /<a ([^>]+)>/g,
                      '<a $1 style="color: var(--md-primary); text-decoration: underline; font-weight: 500;" target="_blank" rel="noopener noreferrer">'
                    )
                  }}
                />
              </m3e-expansion-panel>
            ))}
          </m3e-accordion>
        </div>
      </div>
    </div>
  );
}