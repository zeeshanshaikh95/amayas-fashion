import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { WhatsAppGlyph } from '@/components/ProductCard';

const STEPS = [
  { title: 'Browse', text: 'Explore the collection and open any piece for fabric, size and fit notes.' },
  { title: 'Message', text: 'Tap Order on WhatsApp — your piece and details are pre-filled for you.' },
  { title: 'Confirm', text: 'We reply with availability, the final price, size guidance and delivery details.' },
];

export function ContactPage() {
  const { settings, whatsappConfigured } = useSettings();
  const instagram = settings.instagramUrl || 'https://www.instagram.com/_amayas_fashion/';
  const instagramHandle = `@${instagram.split('/').filter(Boolean).pop() || '_amayas_fashion'}`;
  const digits = settings.whatsappNumber.replace(/\D/g, '');
  const displayNumber = digits.replace(/^91(\d{5})(\d{5})$/, '+91 $1 $2');

  return (
    <>
      <Seo
        title="Contact Us"
        description="Reach Amayas Fashion on WhatsApp for orders, sizing help and delivery details. Worldwide shipping, only prepaid."
        canonicalPath="/contact"
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="max-w-2xl">
          <p className="eyebrow">Get in touch</p>
          <h1 className="section-title mt-3">
            Let's find your <span className="script-accent">perfect fit</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
            The fastest way to reach us is WhatsApp — ask about a piece, share your measurements or
            confirm delivery. We reply personally, usually the same day.
          </p>
        </header>

        <div className="mt-10 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl bg-brand-950 p-7 text-cream sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/40 text-gold-200">
              <WhatsAppGlyph className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-3xl font-medium">WhatsApp</h2>
            {whatsappConfigured ? (
              <>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/65">
                  Sizing, colours, fabric questions or delivery — send us a message and we'll take it
                  from there.
                </p>
                <div className="mt-6">
                  <WhatsAppButton
                    message="Hi Amayas Fashion! I have a question about a piece."
                    label="Chat on WhatsApp"
                    size="lg"
                    className="!bg-cream !text-brand-800 hover:!bg-gold-200"
                  />
                </div>
                <a
                  href={`https://wa.me/${digits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[10px] uppercase tracking-[0.18em] text-cream/50 hover:text-gold-200"
                >
                  {displayNumber}
                </a>
              </>
            ) : (
              <p className="mt-3 text-sm uppercase tracking-wide text-cream/60">
                WhatsApp number coming soon
              </p>
            )}
            <p className="mt-8 border-t border-cream/15 pt-4 text-[9px] uppercase tracking-[0.2em] text-cream/40">
              Worldwide shipping · No COD · Only prepaid
            </p>
          </div>

          <div className="grid gap-4">
            <div className="card p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-500">Instagram</p>
              <h2 className="mt-2 font-display text-2xl font-medium">@{instagramHandle.replace(/^@/, '')}</h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                New drops, restocks and styling reels — the feed is where the collection lands first.
              </p>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Open Instagram ↗
              </a>
            </div>

            <div className="card p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-500">Email</p>
              {settings.email ? (
                <a href={`mailto:${settings.email}`} className="mt-2 inline-block font-display text-xl font-medium text-brand-700 hover:text-brand-800">
                  {settings.email}
                </a>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  For now, WhatsApp and Instagram DM are the quickest ways to reach us.
                </p>
              )}
            </div>

            {settings.mapsUrl ? (
              <div className="card p-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-500">Find us</p>
                <a href={settings.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
                  Open in Google Maps →
                </a>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-14">
          <div className="max-w-xl">
            <p className="eyebrow">How ordering works</p>
            <h2 className="mt-3 font-display text-3xl font-medium">Three easy steps</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="border-t border-brand-200 pt-5">
                <span className="font-display text-sm text-brand-500">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 border-t border-brand-100 pt-6 text-xs leading-relaxed text-ink-soft/80">
          Prices are in Indian rupees (INR) unless marked “Price on request”. Availability, the final
          price and delivery are confirmed on WhatsApp before your order is placed. No COD — only
          prepaid orders.
        </p>
      </div>
    </>
  );
}
