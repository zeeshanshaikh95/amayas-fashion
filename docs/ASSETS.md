# Brand & catalogue assets

Everything under `client/public/images` and `client/public/brand` is derived from the
brand's own public Instagram feed ([@_amayas_fashion](https://www.instagram.com/_amayas_fashion/)).
The originals are never redrawn, recoloured or stretched — they are re-encoded for the web.

## Regenerating

1. Download the source files listed below into one folder (outside the repo).
2. Run:

```bash
npm run assets -- "C:/path/to/instagram-downloads"
```

The script (re)creates:

| Output | Purpose |
| --- | --- |
| `brand/amayas-logo.webp` | Instagram avatar, upscaled to 640×640 |
| `brand/amayas-logo-transparent.webp` | Roundel with the outside of the disc transparent |
| `brand/amayas-logo-trimmed.webp` | Trimmed roundel for the navbar/footer |
| `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png` | Tab + home-screen icons |
| `og-image.png` | 1200×630 social card built from the six-year artwork |
| `images/products/*.webp` | 720px-wide catalogue shots |
| `images/hero-1..3.webp` | Hero slider portraits |
| `images/about-six-years.webp` | Six-year anniversary artwork |
| `images/gallery/*.webp` | Instagram gallery tiles |

## Source map

| Asset | Instagram source |
| --- | --- |
| Mul chanderi festive dress | `reel/Df9sKHZIbN4` |
| Beige handwork festive dress | `p/Detv9uCoU3C` |
| Ivory & silver handwork outfit | `p/Dd_rlhigrh5` |
| The wedding guest edit | `p/DerEw-SIlXQ` |
| Mirror work evening dress | `p/DYHoyOsjJDf` |
| Hania-inspired co-ord | `p/Dd_G_gJi-xD` |
| Curve confidence co-ord | `p/Dd8va8gAhAY` |
| Plus-size luxe co-ord | `p/Dd8u4lXgre4` |
| Festive 2100 co-ord | `p/DbfhfKHsYBk` |
| Korean imported shirt | `p/Dfea312op0x` |
| Imported printed shirt | `p/DfcY44_MapM` |
| Everyday casual set | `reel/DewVHy1I07U` |
| Embroidered Pakistani suit | `reel/Dc1jTvzMRvg` |
| Premium bag pack & sling | `reel/DH0MXASP5t8` |
| Pink diamond shrug burqa | `p/DCqsY0woFxO` |
| Six-year anniversary artwork | `p/DfZU8jajKyJ` |
| Logo | Profile avatar |

## Play-button masks

Reel thumbnails from Instagram include a baked-in play button. The asset pipeline
composites a small gold-and-wine **A** monogram over the centre of those frames so the
catalogue stays purely photographic. The seal is decorative — it is not a play control.

## Prices

The feed publishes two prices: **₹199** (Korean imported shirt, free shipping) and
**₹2,100** (festive co-ord). Everything else is displayed as **Price on request**.
Do not replace these with invented figures; update them in Admin → Products when the
brand confirms the current price list.
