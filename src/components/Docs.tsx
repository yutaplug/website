import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import DocsSidebar from "./DocsSidebar";
import { PLUGIN_DOCS, THEME_DOCS, GENERAL_DOCS } from "../lib/docs";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import MaterialIcon from "@/components/MaterialIcon";

export default function Docs() {
  const [finderOpen, setFinderOpen] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState<"plugins" | "themes" | "general">("general");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    const hash = window.location.hash.replace("#", "");

    if (section === "backports" || hash === "backports") {
      setActiveTab("general");
      
      const scrollToSection = () => {
        const id = section === "backports" ? "backports-section" : hash;
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -120;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          return true;
        }
        return false;
      };

      setTimeout(() => {
        if (!scrollToSection()) {
          const interval = setInterval(() => {
            if (scrollToSection()) clearInterval(interval);
          }, 100);
          setTimeout(() => clearInterval(interval), 3000);
        }
      }, 100);
    } else if (hash) {
      const scrollToHash = () => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };
      setTimeout(scrollToHash, 100);
    }
  }, []);

  const docSections = activeTab === "plugins" ? PLUGIN_DOCS : activeTab === "themes" ? THEME_DOCS : GENERAL_DOCS;
  const title = activeTab === "plugins" ? "Plugin Development" : activeTab === "themes" ? "Theme Development" : "Guides";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <section className="py-24 px-6 relative z-0">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {docSections.map((section, index) => {
              const sectionId = section.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  id={sectionId}
                  className="rounded-xl p-8 scroll-mt-24 border-none shadow-none overflow-x-auto"
                  style={{ backgroundColor: 'var(--md-primary-container, #2a2a32)', color: 'var(--md-on-primary-container, #fff)', boxShadow: 'none', border: 'none', borderRadius: '0.75rem', transition: 'background 0.3s', zIndex: 1 }}
                >
                  {index === 0 && (
                    <div className="mb-12 border-b border-border pb-8">
                      <h1 className="text-4xl sm:text-5xl font-medium mb-4 tracking-tighter py-1" style={{ fontSize: '1.125rem' }}>
                        Guides
                      </h1>
                    </div>
                  )}
                  {section.title !== title && (
                    <h2 className="text-2xl font-medium mb-4 text-foreground" style={{ fontSize: '1.125rem' }}>
                      {section.title}
                    </h2>
                  )}
                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={ {
                      h1: ({ node, ...props }) => (
                        <h1 className="text-3xl font-medium mt-6 mb-4 text-foreground" style={{ fontSize: '1.125rem' }} {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-2xl font-medium mt-5 mb-3 text-foreground" style={{ fontSize: '1.125rem' }} {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-xl font-medium mt-4 mb-2 text-foreground" style={{ fontSize: '1.125rem' }} {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside mb-3 space-y-1" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-muted-foreground" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          style={{
                            color: 'var(--md-primary)',
                            textDecoration: 'underline',
                            background: 'none !important',
                            padding: '0 !important',
                            borderRadius: '0 !important',
                            boxShadow: 'none !important',
                          }}
                        />
                      ),
                      code: ({ node, inline, children, ...props }: any) => {
                        const codeKey = React.useId();
                        const isCopied = copiedIndex === codeKey;
                        return inline ? (
                          <code
                            {...props}
                            style={{
                              backgroundColor: 'color-mix(in srgb, var(--md-primary) 10%, transparent)',
                              padding: '0.1em 0.4em',
                              borderRadius: '0.25em',
                              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace',
                              fontSize: '0.85em',
                              color: 'var(--md-primary)',
                              border: '1px solid var(--md-primary)'
                            }}
                          >{children}</code>
                        ) : (
                          <span
                            style={{
                              display: 'inline-block',
                              position: 'relative',
                              background: 'color-mix(in srgb, var(--md-primary) 7%, var(--md-surface) 93%)',
                              color: 'var(--md-primary)',
                              borderRadius: '0.5em',
                              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace',
                              fontSize: '0.95em',
                              padding: '0.5em 1.2em',
                              margin: '0.25em 0',
                              verticalAlign: 'middle',
                              minWidth: 0,
                              maxWidth: '100%',
                              whiteSpace: 'pre',
                              boxShadow: 'none',
                              border: 'none',
                              transition: 'background 0.2s',
                            }}
                          >
                            <code {...props}>{children}</code>
                            <span
                              className="copy-icon"
                              onClick={() => {
                                navigator.clipboard.writeText(String(children).trim());
                                setCopiedIndex(codeKey);
                                setShowCopyToast(true);
                                if (toastTimeout.current) clearTimeout(toastTimeout.current);
                                toastTimeout.current = setTimeout(() => {
                                  setShowCopyToast(false);
                                  setCopiedIndex(null);
                                }, 1600);
                              }}
                              style={{
                                position: 'absolute',
                                top: '-12px',
                                right: '-12px',
                                opacity: 0,
                                cursor: 'pointer',
                                transition: 'opacity 0.2s',
                                color: 'var(--md-primary)',
                                background: 'var(--md-surface-container, #23232b)',
                                border: 'none',
                                borderRadius: '50%',
                                padding: 0,
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 32,
                                width: 32,
                                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                              onMouseLeave={e => { e.currentTarget.style.opacity = '0'; }}
                              onMouseDown={e => e.preventDefault()}
                            >
                              {isCopied ? (
                                <MaterialIcon name="check" size={18} />
                              ) : (
                                <MaterialIcon name="content_copy" size={18} />
                              )}
                            </span>
                            <style>{`
                              span[style*='relative']:hover .copy-icon {
                                opacity: 1 !important;
                              }
                            `}</style>
                          </span>
                        );
                      },
                      pre: ({ node, ...props }) => (
                        <pre
                          {...props}
                          style={{
                            backgroundColor: 'color-mix(in srgb, var(--md-on-surface) 40%, transparent)',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            overflowX: 'auto',
                            marginBottom: '0.75rem',
                            color: 'var(--md-on-surface)'
                          }}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic my-3 text-muted-foreground" {...props} />
                      ),
                      p: ({ node, children, ...props }) => {
                        const childrenArray = React.Children.toArray(children);
                        const content = childrenArray.map(child => {
                          if (typeof child === "string") return child;
                          return "";
                        }).join("");

                        if ((activeTab === "general" || activeTab === "themes") && /warning/i.test(content)) {
                          const displayChildren = React.Children.map(children, (child) => {
                            if (typeof child === "string") {
                              return child.replace(/^warning:\s*/i, "");
                            }
                            return child;
                          });

                          return (
                            <Alert
                              className="my-4"
                              style={{
                                backgroundColor: 'color-mix(in srgb, var(--md-warning, #ffa000) 10%, var(--md-surface, #23232b) 90%)',
                                borderColor: 'var(--md-warning, #ffa000)',
                                color: 'var(--md-warning, #ffa000)',
                                borderWidth: 2,
                                borderStyle: 'solid',
                                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'
                              }}
                            >
                              <MaterialIcon name="warning" size={20} className="mr-2" />
                              <AlertTitle style={{ color: 'inherit' }}>Warning</AlertTitle>
                              <AlertDescription style={{ color: 'inherit' }}>
                                {displayChildren}
                              </AlertDescription>
                            </Alert>
                          );
                        }
                        return <p className="mb-3 leading-relaxed" {...props}>{children}</p>;
                      },
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto mb-3">
                          <table className="min-w-full border-collapse border border-border" {...props} />
                        </div>
                      ),
                      thead: ({ node, ...props }) => (
                        <thead {...props} />
                      ),
                      tbody: ({ node, ...props }) => (
                        <tbody {...props} />
                      ),
                      tr: ({ node, ...props }) => (
                        <tr className="border border-border" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th className="border border-border bg-secondary/50 px-4 py-2 text-left font-medium text-foreground" style={{ fontSize: '1.125rem' }} {...props} />
                      ),
                      td: ({ node, ...props }) => (
                        <td className="border border-border px-4 py-2 text-muted-foreground min-w-[150px]" {...props} />
                      ),
                    } }
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <DocsSidebar 
        sections={docSections} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onFinderState={setFinderOpen}
      />
    {showCopyToast && (
      <div
        style={{
          position: 'fixed',
          right: 40,
          background: 'var(--md-surface-container, #23232b)',
          color: 'var(--md-on-surface, #fff)',
          borderRadius: '1.5em',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
          padding: '0.7em 1.5em',
          fontSize: '1em',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
          transition: 'bottom 0.2s',
        }}
        aria-live="polite"
      >
        Copied to clipboard
      </div>
    )}
    </div>
  );
}
