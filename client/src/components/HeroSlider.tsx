import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface HeroSlide {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
  image: string;
  alt: string;
  note: string;
}

interface Props {
  slides: HeroSlide[];
}

/**
 * Editorial hero slider: a wine copy panel beside a framed portrait, with the
 * brand's own photography crossfading on a slow Ken Burns move.
 */
export function HeroSlider({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [slides.length, paused]);

  if (!slides.length) return null;
  const active = slides[index];

  const go = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <section
      className="relative overflow-hidden bg-brand-950 text-cream"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Fine art-deco lines in the copy panel */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <div className="absolute left-[47%] top-0 h-full w-px bg-gold-400/15" />
        <div className="absolute -left-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-gold-400/10" />
        <div className="absolute -left-10 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-gold-400/10" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] lg:grid-cols-[1.02fr_0.98fr]">
        {/* Copy */}
        <div className="order-2 flex flex-col justify-center px-6 pb-12 pt-10 sm:px-10 lg:order-1 lg:min-h-[660px] lg:px-16 lg:py-20 xl:px-24">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow !text-gold-300">{active.eyebrow}</p>
            <p className="font-display text-sm tracking-[0.3em] text-cream/50">
              {String(index + 1).padStart(2, '0')}
              <span className="mx-1.5 text-cream/25">/</span>
              {String(slides.length).padStart(2, '0')}
            </p>
          </div>

          <div key={index} className="animate-fade-up">
            <h1 className="mt-6 max-w-xl font-display text-5xl font-medium leading-[0.94] tracking-tight text-cream sm:text-6xl xl:text-[4.7rem]">
              {active.title}
              <br />
              <span className="font-script text-[0.95em] font-normal leading-none text-brand-300">
                {active.accent}
              </span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">
              {active.description}
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to={active.ctaTo}
              className="btn bg-cream text-brand-900 hover:bg-gold-200 hover:text-brand-950"
            >
              {active.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="#the-edit"
              className="btn border border-cream/30 text-cream hover:border-gold-300 hover:text-gold-200"
            >
              New arrivals
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/50">
            <span className="h-px w-6 bg-gold-400" aria-hidden="true" />
            {active.note}
          </p>

          {/* Slide controls */}
          <div className="mt-10 flex items-end justify-between gap-6 border-t border-cream/15 pt-5">
            <div className="flex flex-1 items-center gap-2" role="tablist" aria-label="Choose a slide">
              {slides.map((slide, i) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show slide ${i + 1}: ${slide.title}`}
                  aria-selected={i === index}
                  role="tab"
                  className="group relative h-8 flex-1 max-w-[90px]"
                >
                  <span className="absolute inset-x-0 top-3 h-px bg-cream/20" />
                  <span
                    className={`absolute left-0 top-3 h-px bg-gold-300 transition-all duration-500 ${
                      i === index ? 'w-full' : 'w-0 group-hover:w-1/3'
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1 text-[9px] uppercase tracking-[0.2em] transition-colors ${
                      i === index ? 'text-gold-200' : 'text-cream/40'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold-300 hover:text-gold-200"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold-300 hover:text-gold-200"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative order-1 min-h-[380px] overflow-hidden sm:min-h-[500px] lg:order-2 lg:min-h-[660px]">
          {slides.map((slide, i) => (
            <img
              key={slide.title}
              src={slide.image}
              alt={slide.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 h-full w-full object-cover object-[center_10%] transition-opacity duration-1000 ${
                i === index ? 'animate-kenburns opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/5 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
            <div className="rounded-full border border-cream/25 bg-brand-950/35 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-cream/85 backdrop-blur-sm">
              Amayas · 2026
            </div>
            <div className="hidden h-28 w-px bg-cream/30 sm:block" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
