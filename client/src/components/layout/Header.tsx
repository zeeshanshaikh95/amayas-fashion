import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { BrandLogo } from '@/components/BrandLogo';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { settings } = useSettings();
  const location = useLocation();

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-cream/95 backdrop-blur-md">
      {settings.announcements.enabled && settings.announcements.text ? (
        <div className="bg-brand-900 px-4 py-2 text-center text-[8px] font-medium uppercase tracking-[0.18em] text-cream/90 sm:text-[9px] sm:tracking-[0.24em]">
          {settings.announcements.text}
        </div>
      ) : null}

      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <BrandLogo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-brand-600 after:transition-transform ${
                  isActive
                    ? 'text-brand-700 after:scale-x-100'
                    : 'text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {settings.instagramUrl ? (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full p-2.5 text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700 sm:block"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          ) : null}

          <a
            href={settings.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}` : '#contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full p-2.5 text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700 sm:block"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
              <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2 22l4.9-1.6A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9 1 1-2.9-.2-.3a8.2 8.2 0 1 1 6.6 3.6zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.1-.7 3.4.6 1.7 2 3.3 3.6 4.2 1.7.9 2.9 1.1 3.9.8.6-.2 1.4-.7 1.6-1.3.2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3z" />
            </svg>
          </a>

          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full p-2.5 text-ink transition-colors hover:bg-brand-50"
            aria-label={`Open cart (${count} items)`}
          >
            <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.3" />
              <circle cx="18" cy="20" r="1.3" />
              <path d="M3 4h2l2.2 9.5a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L20 7H6" />
            </svg>
            {count > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-brand-600 px-1 text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full p-2 text-ink transition-colors hover:bg-brand-50 lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-brand-100 bg-cream px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-baseline justify-between border-b border-brand-100 py-3.5 ${
                  isActive ? 'text-brand-700' : 'text-ink'
                }`
              }
            >
              <span className="font-display text-2xl">{item.label}</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                0{i + 1}
              </span>
            </NavLink>
          ))}
          <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-ink-soft">
            Worldwide shipping · Only prepaid
          </p>
        </nav>
      )}
    </header>
  );
}
