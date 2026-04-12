import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaterialIcon from "@/components/MaterialIcon";
import "@m3e/web/search";


import type { DocSection } from "../lib/docs";

interface DocsSidebarProps {
  sections: DocSection[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onFinderState?: (open: boolean) => void;
}

export default function DocsSidebar({ sections, activeTab, setActiveTab, onFinderState }: DocsSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState<Range[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const clearHighlights = useCallback(() => {
    const highlights = document.querySelectorAll("mark.search-highlight");
    highlights.forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize();
      }
    });
  }, []);

  const highlightMatches = useCallback((query: string) => {
    clearHighlights();

    if (!query.trim()) {
      setMatches([]);
      setCurrentMatchIndex(0);
      return;
    }

    const contentArea = document.querySelector("section");
    if (!contentArea) return;

    const treeWalker = document.createTreeWalker(
      contentArea,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (parent?.tagName === "SCRIPT" || parent?.tagName === "STYLE" || parent?.tagName === "MARK") {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = treeWalker.nextNode())) {
      textNodes.push(node as Text);
    }

    const foundRanges: Range[] = [];
    const lowerQuery = query.toLowerCase();

    textNodes.forEach((textNode) => {
      const text = textNode.textContent || "";
      const lowerText = text.toLowerCase();
      let startIndex = 0;
      let index;

      while ((index = lowerText.indexOf(lowerQuery, startIndex)) !== -1) {
        const range = document.createRange();
        range.setStart(textNode, index);
        range.setEnd(textNode, index + query.length);
        foundRanges.push(range);
        startIndex = index + 1;
      }
    });

    foundRanges.forEach((range, idx) => {
      const mark = document.createElement("mark");
      mark.className = "search-highlight";
      mark.style.backgroundColor = idx === 0 ? "#22c55e" : "#86efac";
      mark.style.color = "#000";
      mark.style.padding = "0 2px";
      mark.style.borderRadius = "2px";
      try {
        range.surroundContents(mark);
      } catch (e) {
      }
    });

    setMatches(foundRanges);
    setCurrentMatchIndex(0);

    if (foundRanges.length > 0) {
      const firstHighlight = document.querySelector("mark.search-highlight");
      if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [clearHighlights]);

  const navigateMatch = useCallback((direction: "next" | "prev") => {
    const highlights = document.querySelectorAll("mark.search-highlight");
    if (highlights.length === 0) return;

    highlights.forEach((el) => {
      (el as HTMLElement).style.backgroundColor = "#86efac";
    });

    let newIndex;
    if (direction === "next") {
      newIndex = (currentMatchIndex + 1) % highlights.length;
    } else {
      newIndex = (currentMatchIndex - 1 + highlights.length) % highlights.length;
    }

    setCurrentMatchIndex(newIndex);
    const currentHighlight = highlights[newIndex] as HTMLElement;
    currentHighlight.style.backgroundColor = "#22c55e";
    currentHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentMatchIndex]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      highlightMatches(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, highlightMatches]);

  useEffect(() => {
    if (!isOpen) {
      clearHighlights();
      setSearchQuery("");
      setMatches([]);
      setCurrentMatchIndex(0);
    }
  }, [isOpen, clearHighlights]);

  useEffect(() => {
    if (onFinderState) onFinderState(isOpen);
  }, [isOpen, onFinderState]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigateMatch(e.shiftKey ? "prev" : "next");
    }
  };


  // Generate section id from title
  const getSectionId = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="fixed bottom-6 right-4 sm:right-8 z-[9999] rounded-2xl">
      <div className="flex flex-col items-end gap-2">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl overflow-hidden min-w-[220px] max-w-[280px] sm:max-w-xs border-none outline outline-2 outline-[var(--md-outline,#79747E)]"
              style={{ backgroundColor: 'var(--md-surface, #18181b)' }}
            >
              <div className="p-4">
                <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 px-3 mb-2" style={{ fontSize: '1.125rem' }}>Sections</h3>
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {sections.map((section, index) => {
                    const sectionId = getSectionId(section.title);
                    return (
                      <a
                        key={index}
                        href={`#${sectionId}`}
                        onClick={() => setIsOpen(false)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors text-sm truncate no-underline ${activeTab && section.title.toLowerCase().includes(activeTab) ? 'bg-accent/10 text-foreground' : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {section.title}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden rounded-2xl"
              >
                <m3e-search-bar clearable style={{ width: '220px', background: 'var(--md-surface-container)' }}>
                  <span slot="leading"><MaterialIcon name="search" size={18} /></span>
                  <input
                    slot="input"
                    type="text"
                    placeholder="Find in page..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ fontSize: '1rem', background: 'transparent', border: 'none', outline: 'none', width: '120px', color: 'var(--md-on-surface)' }}
                  />
                  {matches.length > 0 && (
                    <span slot="trailing" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span className="text-xs whitespace-nowrap text-muted-foreground" style={{ marginRight: 4 }}>
                        {currentMatchIndex + 1}/{matches.length}
                      </span>
                      <button
                        onClick={() => navigateMatch("prev")}
                        style={{ background: 'none', border: 'none', padding: 2, borderRadius: 4, cursor: 'pointer' }}
                        aria-label="Previous match"
                      >
                        <MaterialIcon name="chevron_left" size={18} />
                      </button>
                      <button
                        onClick={() => navigateMatch("next")}
                        style={{ background: 'none', border: 'none', padding: 2, borderRadius: 4, cursor: 'pointer' }}
                        aria-label="Next match"
                      >
                        <MaterialIcon name="chevron_right" size={18} />
                      </button>
                    </span>
                  )}
                </m3e-search-bar>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-lg flex items-center justify-center shadow-lg transition-colors border-none text-foreground outline outline-2 outline-[var(--md-outline,#79747E)]"
            style={{ backgroundColor: 'var(--md-surface, #18181b)' }}
            aria-label="Toggle menu"
          >
            {isOpen ? <MaterialIcon name="x" size={20} /> : <MaterialIcon name="menu" size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
