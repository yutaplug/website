import { useState, useEffect } from "react";
import { fetchThemes } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import "@m3e/web/search";
import MaterialIcon from "@/components/MaterialIcon";

export default function Themes() {
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchThemes().then((data) => {
      setThemes(data);
      setLoading(false);
    });
  }, []);

  const filteredThemes = themes.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 24,
          width: '90vw',
          maxWidth: 420,
          background: 'var(--md-surface-container, #23232b)',
          color: 'var(--md-on-surface, #fff)',
          borderRadius: '1em',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
          padding: '0.7em 1em',
          fontSize: '1em',
          zIndex: 10000,
          wordBreak: 'break-word',
          textAlign: 'center',
          display: 'block',
        }}
        aria-live="polite"
      >
        This list is view-only. To install themes, join the <a href="https://discord.gg/EsNDvBaHVU" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--md-primary)', textDecoration: 'underline', fontWeight: 500 }}>Discord</a> server.
      </div>
      <div className="flex flex-col items-center py-24 px-4">
      <div className="container max-w-6xl w-full">


        <div className="max-w-md mx-auto mb-12">
          <m3e-search-bar clearable style={{ width: '100%' }}>
            <span slot="leading"><MaterialIcon name="search" size={20} /></span>
            <input
              slot="input"
              placeholder="Search themes..."
              value={search}
              onInput={e => setSearch((e.target as HTMLInputElement).value)}
              style={{ fontSize: '1rem', background: 'transparent', border: 'none', outline: 'none', width: '100%' }}
            />
          </m3e-search-bar>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-[2rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredThemes.map((theme, idx) => (
              <m3e-card key={theme.name + '-' + idx} class="group flex flex-col h-full" style={{ borderRadius: '2rem', overflow: 'hidden', minHeight: '12rem' }}>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{theme.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--md-outline-variant)', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--md-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>@{theme.author || "Unknown"}</span>
                  </div>
                </div>
              </m3e-card>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
