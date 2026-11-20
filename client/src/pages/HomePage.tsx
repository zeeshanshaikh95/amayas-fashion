import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { ProductCard } from '@/components/ProductCard';
import { ProductRail } from '@/components/ProductRail';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { Stars } from '@/components/Stars';
import { Seo } from '@/components/seo/Seo';
import { EmptyState } from '@/components/EmptyState';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { HeroSlider, type HeroSlide } from '@/components/HeroSlider';
import { trackEvent } from '@/lib/analytics';
import { ABOUT_IMAGE } from '@/lib/brand';

const BASE = import.meta.env.BASE_URL;

const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: 'The festive edit · 2026',
    title: 'Elegance in',
    accent: 'every thread',
    description:
      'Mul chanderi, handwork and mirror-work dresses, cut for celebration and made to feel effortless.',
    ctaLabel: 'Shop the festive edit',
    ctaTo: '/shop',
    image: `${BASE}images/hero-1.webp`,
    alt: 'Amayas Fashion mul chanderi festive dress',
    note: 'Sizes M – 2XL · Only prepaid',
  },
  {
    eyebrow: 'Co-ords, reimagined',
    title: 'Curves, comfort',
    accent: '& confidence',
    description:
      'Easy co-ord sets in sizes M to 5XL, designed to look considered and feel like comfort dressing.',
    ctaLabel: 'Explore co-ords',
    ctaTo: '/category/co-ords',
    image: `${BASE}images/hero-2.webp`,
    alt: 'Amayas Fashion co-ord set on a model',
    note: 'Sizes XS – 5XL',
  },
  {
    eyebrow: 'Fabric & suit',
    title: 'Embroidered',
    accent: 'to perfection',
    description:
      'Pakistani-style suits with delicate florals and timeless detail, in sizes M to 3XL.',
    ctaLabel: 'Shop suits',
    ctaTo: '/category/fabric-suit',
    image: `${BASE}images/hero-3.webp`,
    alt: 'Amayas Fashion embroidered Pakistani suit',
    note: 'M – 3XL · Worldwide shipping',
  },
];

const MARQUEE = [
  'Small to 10XL',
  'Worldwide shipping',
  '15,000+ orders delivered',
  'No COD · only prepaid',
  'New festive edit',
  'Order on WhatsApp',
];

const STATS = [
  { value: '06', label: 'Years of Amayas', detail: 'Since 2020' },
  { value: '15k+', label: 'Orders delivered', detail: 'And counting' },
  { value: 'S–10XL', label: 'Size range', detail: 'Elegance for every body' },
  { value: 'Global', label: 'Worldwide shipping', detail: 'Only prepaid' },
];

const PROMISES = [
  {
    no: '01',
    title: 'Made for every body',
    text: 'Small to 10XL, with plus-size edits cut generously through the hip and thigh — never an afterthought.',
  },
  {
    no: '02',
    title: 'Fabric-led, not trend-led',
    text: 'Mul chanderi, handwork, mirror work and imported shirting, chosen for how they feel and fall.',
  },
  {
    no: '03',
    title: 'Personal on WhatsApp',
    text: 'Sizing questions, colour options and delivery details — answered by the same team that packs your order.',
  },
];

export function HomePage() {
  const { settings } = useSettings();
  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);
  const bestsellers = useApi(
    () => publicApi.listProducts({ sort: 'bestseller' }).then((r) => r.products.filter((p) => p.bestseller)),
    []
  );
  const featured = useApi(
    () => publicApi.listProducts({ sort: 'featured' }).then((r) => r.products.filter((p) => p.featured)),
    []
  );
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);

  useEffect(() => {
    trackEvent({ type: 'page_view', path: '/' });
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.businessName,
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  const editProducts = (featured.data?.length ? featured.data : bestsellers.data ?? []).slice(0, 8);
  const instagramHandle =
    settings.instagramUrl?.split('/').filter(Boolean).pop() || '_amayas_fashion';

  return (
    <>
      <Seo
        title="Elegance in Every Thread"
        description="Festive dresses, co-ords, tunics and modest wear from Amayas Fashion. Sizes small to 10XL, worldwide shipping, order on WhatsApp."
        canonicalPath="/"
        jsonLd={jsonLd}
      />

      <HeroSlider slides={HERO_SLIDES} />

      {/* ── Running ticker ─────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-brand-900/20 bg-brand-600 py-3">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.24em] text-cream/90">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-8" aria-hidden={dup === 1}>
              {MARQUEE.map((item) => (
                <span key={item} className="flex items-center gap-8">
                  {item}
                  <span className="text-gold-300" aria-hidden="true">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <section className="border-b border-brand-100 bg-cream" aria-label="Amayas at a glance">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-brand-100 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-cream px-5 py-8 text-center sm:px-6">
              <p className="font-display text-3xl font-medium text-brand-700 sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">{stat.label}</p>
              <p className="mt-1 text-[10px] text-ink-soft">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────── */}
      <section className="bg-blush/60 py-16 sm:py-20" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Shop the wardrobe</p>
              <h2 id="categories-heading" className="section-title mt-3">
                Find your <span className="script-accent">occasion</span>
              </h2>
            </div>
            <Link to="/shop" className="link-line">
              View all pieces <span aria-hidden="true">→</span>
            </Link>
          </div>

          {categories.loading ? (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-64" />)}
            </div>
          ) : categories.error ? (
            <div className="mt-8">
              <EmptyState icon="error" title="Couldn't load categories" description={categories.error} action={<button className="btn-outline" onClick={() => categories.refetch()}>Try again</button>} />
            </div>
          ) : !categories.data?.length ? (
            <div className="mt-8">
              <EmptyState title="Categories are on the way" description="Message us on WhatsApp and we'll help you find the right piece." />
            </div>
          ) : (
            <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
              {categories.data.map((cat, index) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  className="group relative w-[70vw] shrink-0 snap-start overflow-hidden rounded-xl bg-brand-950 sm:w-auto"
                >
                  <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-[center_20%] transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                      />
                    ) : (
                      <PlaceholderImage seed={cat.slug} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/15 to-transparent" />
                    <span className="absolute left-4 top-4 font-display text-lg text-cream/70">
                      0{index + 1}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl font-medium text-cream sm:text-[1.65rem]">
                          {cat.name}
                        </h3>
                        <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-gold-200">
                          Shop now
                        </p>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/40 text-cream transition-all group-hover:border-gold-300 group-hover:bg-gold-300 group-hover:text-brand-950" aria-hidden="true">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── The edit ───────────────────────────────────────────── */}
      <section id="the-edit" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="edit-heading">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Just landed</p>
            <h2 id="edit-heading" className="section-title mt-3">
              The <span className="script-accent">festive</span> edit
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              New dresses, co-ords and imported shirting — photographed in the Amayas studio and ready to order.
            </p>
          </div>
          <Link to="/shop" className="link-line shrink-0">
            Shop all <span aria-hidden="true">→</span>
          </Link>
        </div>

        {featured.loading || bestsellers.loading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-96" />)}
          </div>
        ) : editProducts.length ? (
          <div className="mt-10">
            <ProductRail products={editProducts} />
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              title="The new edit is being photographed"
              description="Follow us on Instagram or message us on WhatsApp to see what's in store."
            />
          </div>
        )}
      </section>

      {/* ── Story ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-950 py-16 text-cream sm:py-20" aria-labelledby="about-heading">
        <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full border border-gold-400/15" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-16 h-[260px] w-[260px] rounded-full border border-gold-400/10" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-xl border border-gold-300/30">
              <img
                src={settings.about.founderImageUrl || ABOUT_IMAGE}
                alt="Six years of Amayas Fashion"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-full border border-gold-300/40 bg-brand-950 px-5 py-3 text-center sm:right-6">
              <p className="font-script text-2xl leading-none text-gold-200">Six years</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-cream/60">of Amayas</p>
            </div>
          </div>

          <div>
            <p className="eyebrow !text-gold-300">Our story</p>
            <h2 id="about-heading" className="mt-4 font-display text-4xl font-medium leading-[1.02] text-cream sm:text-5xl">
              A little dream,
              <br />
              <span className="font-script text-[0.95em] text-brand-300">grown with love</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
              {settings.about.intro}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/60">
              From festive mul chanderi to everyday co-ords and plus-size edits up to 10XL, every piece is
              chosen to make getting dressed feel like the best part of the day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/about" className="btn bg-cream text-brand-900 hover:bg-gold-200">
                Read our story
              </Link>
              <WhatsAppButton
                message="Hi Amayas Fashion! I'd love some help choosing a piece."
                label="Ask us on WhatsApp"
                className="!border !border-cream/30 !bg-transparent !text-cream hover:!bg-cream/10"
              />
            </div>
            <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-cream/40">
              Worldwide shipping · No COD · Only prepaid
            </p>
          </div>
        </div>
      </section>

      {/* ── Bestsellers ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="bestsellers-heading">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Most requested</p>
            <h2 id="bestsellers-heading" className="section-title mt-3">
              Bestsellers
            </h2>
          </div>
          <Link to="/shop" className="link-line shrink-0">
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>

        {bestsellers.loading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-96" />)}
          </div>
        ) : bestsellers.error ? (
          <div className="mt-8"><EmptyState icon="error" title="Couldn't load products" description={bestsellers.error} /></div>
        ) : !bestsellers.data?.length ? (
          <div className="mt-8">
            <EmptyState title="No products available yet" description="Our pieces will appear here as soon as the catalogue is ready." />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {bestsellers.data.slice(0, 4).map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* ── Promises ───────────────────────────────────────────── */}
      <section className="border-y border-brand-100 bg-blush/50 py-16 sm:py-20" aria-labelledby="promises-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="eyebrow">The Amayas promise</p>
            <h2 id="promises-heading" className="section-title mt-3">
              Considered, <span className="script-accent">not rushed</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {PROMISES.map((item) => (
              <article key={item.no} className="border-t border-brand-200 pt-5">
                <p className="font-display text-sm text-brand-500">{item.no}</p>
                <h3 className="mt-3 font-display text-2xl font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews (only when real, approved reviews exist) ───── */}
      {reviews.data?.length ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="reviews-heading">
          <div className="text-center">
            <p className="eyebrow justify-center">Customer love</p>
            <h2 id="reviews-heading" className="section-title mt-3">Reviews</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reviews.data.slice(0, 6).map((r) => (
              <figure key={r._id} className="card flex flex-col p-6">
                <Stars rating={r.rating} />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-ink">— {r.customerName}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/reviews" className="btn-outline">See all reviews</Link>
          </div>
        </section>
      ) : null}

      {/* ── Gallery ────────────────────────────────────────────── */}
      {gallery.data?.length ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="gallery-heading">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">From the feed</p>
              <h2 id="gallery-heading" className="section-title mt-3">
                @{instagramHandle}
              </h2>
            </div>
            {settings.instagramUrl ? (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-line shrink-0">
                Follow on Instagram <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {gallery.data.slice(0, 6).map((g) => {
              const inner = g.image ? (
                <img src={g.image} alt={g.caption || 'Instagram post'} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <PlaceholderImage seed={`ig-${g._id}`} />
              );
              return g.externalUrl ? (
                <a key={g._id} href={g.externalUrl} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden rounded-lg bg-blush">
                  {inner}
                </a>
              ) : (
                <div key={g._id} className="group relative aspect-square overflow-hidden rounded-lg bg-blush">
                  {inner}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-700 py-16 text-cream sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border border-gold-300/40" />
          <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full border border-gold-300/20" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-200">
            Not sure about sizing?
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-cream sm:text-5xl">
            Let's find your
            <span className="font-script text-[0.95em] text-gold-200"> perfect fit</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/75">
            Tell us the occasion, share your measurements and we'll help you choose the right piece,
            colour and size — all on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              message="Hi Amayas Fashion! I'd like help with sizing and styling."
              label="Chat on WhatsApp"
              size="lg"
              className="!bg-cream !text-brand-800 hover:!bg-gold-200"
            />
            <Link to="/shop" className="btn border border-cream/35 text-cream hover:border-gold-300 hover:text-gold-200">
              Browse the collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
