import { useState, useEffect } from "react";
import { fetchPlugins } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import "@m3e/web/search";
import MaterialIcon from "@/components/MaterialIcon";

export default function Plugins() {
  const [plugins, setPlugins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPlugins().then((data) => {
      setPlugins(data);
      setLoading(false);
    });
  }, []);

  const filteredPlugins = plugins.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.description?.toLowerCase().includes(search.toLowerCase())
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
        This list is view-only. To install plugins, join the <a href="https://discord.gg/EsNDvBaHVU" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--md-primary)', textDecoration: 'underline', fontWeight: 500 }}>Discord</a> server.
      </div>
      <div className="flex flex-col items-center py-24 px-4">
      <div className="container max-w-6xl w-full">


        <div className="max-w-md mx-auto mb-12">
          <m3e-search-bar clearable style={{ width: '100%' }}>
            <span slot="leading"><MaterialIcon name="search" size={20} /></span>
            <input
              slot="input"
              placeholder="Search plugins..."
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
            {filteredPlugins.map((plugin, idx) => (
              <m3e-card key={plugin.name + '-' + idx} class="group flex flex-col h-full" style={{ borderRadius: '2rem', overflow: 'hidden', minHeight: '12rem' }}>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{plugin.name}</h3>
                    <span style={{ fontSize: 10, fontFamily: 'monospace', background: 'var(--md-primary-container)', color: 'var(--md-on-primary-container)', padding: '0.125rem 0.5rem', borderRadius: '999px', flexShrink: 0 }}>{plugin.version}</span>
                  </div>
                  <p style={{ color: 'var(--md-on-surface-variant)', fontSize: 14, marginBottom: 24, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{plugin.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--md-outline-variant)', gap: 8 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', overflow: 'hidden' }}>
                      {Array.isArray(plugin.authors) ? plugin.authors.map((author: any, aidx: number) => (
                        <span key={(author.name || author) + '-' + aidx} style={{ fontSize: 12, fontWeight: 700, color: 'var(--md-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 100 }}>@{author.name || author}</span>
                      )) : plugin.authors && (
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--md-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>@{plugin.authors}</span>
                      )}
                    </div>
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
