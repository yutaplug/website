import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { AliucordLogo } from "./AliucordLogo";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/MaterialIcon";
import { M3eIconButton } from "@m3e/react/icon-button";
import { M3eNavBar, M3eNavItem } from "@m3e/react/nav-bar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const getIconForLabel = (label: string) => {
  switch (label.toLowerCase()) {
    case 'home': return <MaterialIcon name="home" size={20} />;
    case 'plugins': return <MaterialIcon name="extension" size={20} />;
    case 'themes': return <MaterialIcon name="palette" size={20} />;
    case 'faq': return <MaterialIcon name="help" size={20} />;
    case 'documentation': return <MaterialIcon name="book" size={20} />;
    case 'about': return <MaterialIcon name="info" size={20} />;
    default: return null;
  }
};

const getMobileIconForLabel = (label: string) => {
  switch (label.toLowerCase()) {
    case 'home': return <MaterialIcon name="home" size={28} />;
    case 'plugins': return <MaterialIcon name="extension" size={28} />;
    case 'themes': return <MaterialIcon name="palette" size={28} />;
    case 'faq': return <MaterialIcon name="help" size={28} />;
    case 'documentation': return <MaterialIcon name="book" size={28} />;
    case 'about': return <MaterialIcon name="info" size={28} />;
    default: return null;
  }
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 border-none bg-background/80 backdrop-blur-xl">
        <M3eNavBar
          mode="expanded"
          className="w-full"
          style={{
            overflowX: 'hidden',
            ['--_nav-item-min-width' as any]: '4.5rem',
            ['--m3e-horizontal-nav-item-padding' as any]: '0.75rem',
            ['--m3e-nav-item-spacing' as any]: '0.25rem'
          }}
        >
          <div className="max-w-5xl w-full mx-auto flex items-center justify-between px-8 h-20">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group h-full">
                <AliucordLogo className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" animated />
                <span className="ml-2 text-2xl font-semibold tracking-tight text-primary select-none" style={{ lineHeight: 1 }}>Aliucord</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4">
              {NAV_LINKS.map((link) => {
                let iconName = '';
                switch (link.label.toLowerCase()) {
                  case 'home': iconName = 'home'; break;
                  case 'plugins': iconName = 'extension'; break;
                  case 'themes': iconName = 'palette'; break;
                  case 'faq': iconName = 'help'; break;
                  case 'guides': iconName = 'book'; break;
                  default: iconName = 'info'; break;
                }
                const icon = <span slot="icon"><MaterialIcon name={iconName} size={20} className="navbar-icon" /></span>;
                return link.href.startsWith("http") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <M3eNavItem className={`text-sm font-medium ${location === link.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`} style={{ fontSize: '1.125rem' }} onClick={() => { }}>
                      {icon}
                      {link.label}
                    </M3eNavItem>
                  </a>
                ) : (
                  <M3eNavItem
                    key={link.href}
                    className={`text-sm font-medium ${location === link.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`} style={{ fontSize: '1.125rem' }}
                    onClick={() => setLocation(link.href)}
                    aria-current={location === link.href ? 'page' : undefined}
                  >
                    {icon}
                    {link.label}
                  </M3eNavItem>
                );
              })}
              </div>

              <div className="md:hidden flex items-center gap-2">
                <M3eIconButton
                  className="rounded-full w-12 h-12 hover:bg-accent/10 flex items-center justify-center"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  onClick={() => setIsOpen((v) => !v)}
                >
                  <MaterialIcon name={isOpen ? "x" : "menu"} size={24} />
                </M3eIconButton>
              </div>
            </div>
          </div>
        </M3eNavBar>
      </header>

      {isOpen && (
        <nav
          className="md:hidden fixed left-0 right-0 px-4 py-6 flex flex-col gap-6 animate-mobile-nav-drawer z-40 text-left"
          style={{
            top: '5rem',
            background: 'var(--md-surface, #18181b)',
            position: 'fixed',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {NAV_LINKS.map((link) => {
              let iconName = '';
              switch (link.label.toLowerCase()) {
                case 'home': iconName = 'home'; break;
                case 'plugins': iconName = 'extension'; break;
                case 'themes': iconName = 'palette'; break;
                case 'faq': iconName = 'help'; break;
                case 'guides': iconName = 'book'; break;
                default: iconName = 'info'; break;
              }
              const icon = <MaterialIcon name={iconName} size={22} style={{ marginRight: 12, verticalAlign: 'middle' }} />;
              return link.href.startsWith('http') ? (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-lg font-medium hover:text-primary transition-colors w-full text-left flex items-center gap-2">
                  {icon}
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={`text-lg font-medium transition-colors w-full text-left flex items-center gap-2 ${location === link.href ? 'text-primary' : 'hover:text-primary'}`}>
                  {icon}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
