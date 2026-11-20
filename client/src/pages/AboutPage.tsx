import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { Link } from 'react-router-dom';
import { ABOUT_IMAGE } from '@/lib/brand';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const PROMISES = [
  {
    title: 'Size-inclusive by design',
    text: 'Small to 10XL, with dedicated plus-size edits — because elegance should never stop at a size label.',
  },
  {
    title: 'Fabric first',
    text: 'Mul chanderi, handwork, mirror work and imported shirting — chosen for how they feel and how they fall.',
  },
  {
    title: 'Personal service',
    text: 'Every order is handled personally on WhatsApp: sizing, colours and delivery, confirmed before dispatch.',
  },
];

const TIMELINE = [
  { year: '2020', title: 'A small beginning', text: 'Amayas starts with a handful of dresses and a big idea: elegant dressing for every body.' },
  { year: '2023', title: 'The co-ord chapter', text: 'Easy co-ords and everyday sets join the edit, in sizes up to 5XL and beyond.' },
  { year: '2026', title: 'Six years of Amayas', text: '15,000+ orders delivered, a growing family of customers, and the same love in every parcel.' },
];

export function AboutPage() {
  const { settings } = useSettings();

  return (
    <>
      <Seo
        title="Our Story"
        description="Six years of Amayas Fashion — elegant, size-inclusive dresses, co-ords and modest wear, in sizes small to 10XL."
        canonicalPath="/about"
      />

      {/* Editorial header */}
      <section className="bg-brand-950 text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="eyebrow !text-gold-300">Our story</p>
            <h1 className="mt-4 font-display text-5xl font-medium leading-[0.96] sm:text-6xl">
              Elegance in
              <br />
              <span className="font-script text-[0.95em] text-brand-300">every thread</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-cream/70 sm:text-base">
              {settings.about.intro ||
                'Amayas Fashion is a six-year-old label built on elegant, size-inclusive dressing — dresses, co-ords, tunics, fabrics, bags and modest wear, in sizes small to 10XL.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn bg-cream text-brand-900 hover:bg-gold-200">
                Shop the collection
              </Link>
              <WhatsAppButton
                message="Hi Amayas Fashion! I'd love to know more about your pieces."
                label="Ask on WhatsApp"
                className="!border !border-cream/30 !bg-transparent !text-cream hover:!bg-cream/10"
              />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="overflow-hidden rounded-xl border border-gold-300/30">
              <img
                src={settings.about.founderImageUrl || ABOUT_IMAGE}
                alt="Amayas Fashion six-year anniversary"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <p className="mt-3 text-center font-script text-2xl text-gold-200">Six years of Amayas</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="eyebrow justify-center">Since 2020</p>
        <h2 className="section-title mt-3">
          A little dream, <span className="script-accent">grown with love</span>
        </h2>
        <div className="mt-6 space-y-5 text-left text-sm leading-relaxed text-ink-soft sm:text-base">
          {(settings.about.story ||
            'What started as a small dream has grown into six years of learning, taking chances and dressing more than 15,000 orders.\n\nAmayas is built around the idea that elegance should not come in one size. The collection runs from small to 10XL, with new festive edits, imported shirts and co-ords added through the year. Every order is handled personally on WhatsApp, with size guidance and delivery details confirmed before dispatch.\n\nWorldwide shipping. No COD, only prepaid.')
            .split('\n\n')
            .map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
        </div>
      </section>

      {/* Numbers */}
      <section className="border-y border-brand-100 bg-blush/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-brand-100 sm:grid-cols-4">
          {[
            ['06', 'Years'],
            ['15k+', 'Orders delivered'],
            ['S–10XL', 'Size range'],
            ['Global', 'Worldwide shipping'],
          ].map(([value, label]) => (
            <div key={label} className="bg-blush/60 px-4 py-8 text-center">
              <p className="font-display text-3xl font-medium text-brand-700 sm:text-4xl">{value}</p>
              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-soft">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="max-w-xl">
          <p className="eyebrow">The journey</p>
          <h2 className="section-title mt-3">Six years, one thread</h2>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {TIMELINE.map((item) => (
            <article key={item.year} className="border-t border-brand-200 pt-5">
              <p className="font-script text-3xl text-brand-500">{item.year}</p>
              <h3 className="mt-2 font-display text-xl font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Promises */}
      <section className="bg-brand-950 py-16 text-cream sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="eyebrow !text-gold-300">What we stand for</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-cream sm:text-5xl">
              The Amayas <span className="font-script text-[0.95em] text-brand-300">promise</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {PROMISES.map((item) => (
              <div key={item.title} className="border-t border-cream/15 pt-5">
                <h3 className="font-display text-2xl font-medium text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/contact" className="link-line !text-gold-200">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
