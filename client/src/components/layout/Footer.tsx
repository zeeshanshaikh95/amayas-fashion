import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { WhatsAppGlyph } from '@/components/ProductCard';
import { BrandLogo } from '@/components/BrandLogo';
import { DEMO_MODE } from '@/lib/demoCatalogue';

export function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="mt-20 bg-brand-950 text-cream">
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <BrandLogo size="lg" tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Elegance in every thread. Festive dresses, co-ords, tunics and modest wear in sizes
              small to 10XL — shipped worldwide.
            </p>
            {settings.instagramUrl ? (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-200 hover:text-gold-100"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
                Follow on Instagram
              </a>
            ) : null}
          </div>

          <nav aria-label="Shop">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/40">Shop</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/shop" className="text-cream/70 hover:text-gold-200">All pieces</Link></li>
              <li><Link to="/category/dresses" className="text-cream/70 hover:text-gold-200">Dresses</Link></li>
              <li><Link to="/category/co-ords" className="text-cream/70 hover:text-gold-200">Co-ords</Link></li>
              <li><Link to="/category/shirts-tunics" className="text-cream/70 hover:text-gold-200">Shirts &amp; tunics</Link></li>
              <li><Link to="/category/fabric-suit" className="text-cream/70 hover:text-gold-200">Fabric &amp; suit</Link></li>
            </ul>
          </nav>

          <nav aria-label="About">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/40">Amayas</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/about" className="text-cream/70 hover:text-gold-200">Our story</Link></li>
              <li><Link to="/gallery" className="text-cream/70 hover:text-gold-200">Gallery</Link></li>
              <li><Link to="/reviews" className="text-cream/70 hover:text-gold-200">Reviews</Link></li>
              <li><Link to="/contact" className="text-cream/70 hover:text-gold-200">Contact</Link></li>
            </ul>
          </nav>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/40">Order</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {settings.whatsappNumber ? (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-gold-200 hover:text-gold-100"
                  >
                    <WhatsAppGlyph className="h-4 w-4" /> WhatsApp us
                  </a>
                </li>
              ) : null}
              {settings.email ? (
                <li>
                  <a href={`mailto:${settings.email}`} className="text-cream/70 hover:text-gold-200">
                    {settings.email}
                  </a>
                </li>
              ) : null}
              <li className="text-xs leading-relaxed text-cream/45">
                Worldwide shipping. No COD, only prepaid. Final pricing and availability confirmed on
                WhatsApp.
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-2 py-5 text-center text-[10px] uppercase tracking-[0.16em] text-cream/40 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Amayas Fashion. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Elegance in Every Thread</span>
            {!DEMO_MODE ? (
              <Link
                to="/admin/login"
                className="text-[10px] normal-case tracking-normal text-cream/30 underline decoration-transparent underline-offset-2 transition-colors hover:text-cream/60 hover:decoration-current"
              >
                Admin Login
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
