/**
 * Brand assets for AMAYAS FASHION.
 *
 * The roundel is the brand's own Instagram avatar, prepared by
 * scripts/prepare-amayas-assets.mjs. It is never redrawn, recoloured or
 * stretched — only upscaled from the original 150px file and masked to its
 * circular edge for use on light surfaces.
 *
 * All URLs honour Vite's BASE_URL so they resolve both locally and under a
 * hosted sub-path.
 */
const BASE = import.meta.env.BASE_URL;

/** Original roundel (pink disc, serif wordmark, script tagline). */
export const LOGO_ORIGINAL = `${BASE}brand/amayas-logo.webp`;

/** Roundel on transparency — for light surfaces (navbar, footer, admin). */
export const LOGO_TRANSPARENT = `${BASE}brand/amayas-logo-transparent.webp`;

/** Empty padding trimmed — best for small UI slots. */
export const LOGO_TRIMMED = `${BASE}brand/amayas-logo-trimmed.webp`;

/** Collection hero visual — the brand's own festive edit. */
export const HERO_IMAGE = `${BASE}images/hero-1.webp`;

/** About-page visual: the brand's six-year anniversary artwork. */
export const ABOUT_IMAGE = `${BASE}images/about-six-years.webp`;

/** Social sharing image (1200×630). */
export const OG_IMAGE = `${BASE}og-image.png`;

/** Absolute URL of the social image, as crawlers require. */
export const SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL ?? 'http://localhost:5173';
export const OG_IMAGE_ABSOLUTE = new URL(OG_IMAGE, SITE_URL).href;
