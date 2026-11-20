/**
 * First-party catalogue for AMAYAS FASHION.
 *
 * Source of truth: the brand's own public Instagram feed (@_amayas_fashion).
 * Names, size ranges, fabric notes and the two published prices (₹199 Korean
 * shirt, ₹2,100 festive co-ord) come from those posts and captions. Where the
 * feed did not publish a price, `price` stays null so the storefront shows
 * "Price on request" instead of inventing one.
 *
 * Idempotent: existing categories and products are never overwritten.
 */
import { Category, GalleryItem, Product } from '../models/index.js';

type CategorySeed = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

type ProductSeed = {
  name: string;
  slug: string;
  price: number | null;
  categorySlug: string;
  image: string;
  size: string;
  description: string;
  fabric: string[];
  benefits: string[];
  sizeFit: string;
  care: string;
  bestseller?: boolean;
  featured?: boolean;
};

const INSTAGRAM = 'https://www.instagram.com/_amayas_fashion/';

const CATEGORIES: CategorySeed[] = [
  {
    name: 'Dresses',
    slug: 'dresses',
    description: 'Festive, evening and wedding-guest dresses in sizes small to 10XL.',
    image: 'images/products/mirror-work-evening-dress.webp',
  },
  {
    name: 'Co-ords',
    slug: 'co-ords',
    description: 'Easy, elegant co-ord sets cut for comfort and every curve.',
    image: 'images/products/curve-confidence-coord-set.webp',
  },
  {
    name: 'Shirts & Tunics',
    slug: 'shirts-tunics',
    description: 'Imported shirts, tunics and casual sets for everyday styling.',
    image: 'images/products/imported-printed-shirt.webp',
  },
  {
    name: 'Fabric & Suit',
    slug: 'fabric-suit',
    description: 'Embroidered Pakistani-style suits and festive fabric sets.',
    image: 'images/products/embroidered-pakistani-suit.webp',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Bag packs, sling bags and the finishing touches.',
    image: 'images/products/premium-bag-pack-sling.webp',
  },
  {
    name: 'Hijabs & Modest',
    slug: 'hijabs-modest',
    description: 'Modest silhouettes, shrug-style burqas and hijab-friendly layers.',
    image: 'images/products/pink-diamond-shrug-burqa.webp',
  },
];

const PRODUCTS: ProductSeed[] = [
  {
    name: 'Mul Chanderi Festive Dress',
    slug: 'mul-chanderi-festive-dress',
    price: null,
    categorySlug: 'dresses',
    image: 'images/products/mul-chanderi-festive-dress.webp',
    size: 'M – 2XL',
    description:
      'A festive mul chanderi dress with delicate floral handwork, made for celebrations and long evenings. Cut to feel graceful and easy to move in.',
    fabric: ['Mul chanderi', 'Handwork florals', 'Three-quarter sleeves', 'Coordinating dupatta'],
    benefits: [
      'Light, festive mul chanderi',
      'Delicate floral handwork',
      'A graceful, easy silhouette',
      'Sizes M to 2XL',
    ],
    sizeFit:
      'Available in M to 2XL. True to size — message us on WhatsApp for a personal size check before ordering.',
    care: 'Dry clean or gentle hand wash separately. Iron on low heat, inside out.',
    bestseller: true,
    featured: true,
  },
  {
    name: 'Beige Handwork Festive Dress',
    slug: 'beige-handwork-festive-dress',
    price: null,
    categorySlug: 'dresses',
    image: 'images/products/beige-handwork-festive-dress.webp',
    size: 'S – 2XL',
    description:
      'A beige handwork dress with tonal embroidery and a softly structured fall. Styled for festive days, easy to dress up or down.',
    fabric: ['Handwork embroidery', 'Soft woven fabric', 'Straight cut', 'Sizes S to 2XL'],
    benefits: [
      'Tonal handwork detailing',
      'A soft, wearable neutral',
      'Festive without feeling fussy',
      'Sizes S to 2XL',
    ],
    sizeFit: 'Available in S to 2XL. Take your usual size; message us for measurements.',
    care: 'Gentle hand wash separately or dry clean. Iron on low heat.',
    bestseller: true,
  },
  {
    name: 'Ivory & Silver Handwork Outfit',
    slug: 'ivory-silver-handwork-outfit',
    price: null,
    categorySlug: 'dresses',
    image: 'images/products/ivory-silver-handwork-outfit.webp',
    size: 'Custom sizing available',
    description:
      'Ivory with silver-grey handwork — a smart colour contrast for the woman who likes her festive looks understated and unforgettable.',
    fabric: ['Ivory base', 'Silver-grey handwork', 'Hand-finished neckline', 'Made to order'],
    benefits: [
      'Quiet ivory and silver palette',
      'Handwork detail front and back',
      'Made to order for a closer fit',
      'Custom sizing available',
    ],
    sizeFit:
      'Made to order. Share your measurements on WhatsApp and we will confirm the closest size before stitching.',
    care: 'Dry clean only. Store folded with the handwork facing inward.',
  },
  {
    name: 'The Wedding Guest Edit',
    slug: 'the-wedding-guest-edit',
    price: null,
    categorySlug: 'dresses',
    image: 'images/products/the-wedding-guest-edit.webp',
    size: 'S – 3XL',
    description:
      'Wedding season, sorted. A considered guest outfit with a flattering drape and just enough detail to stand out in the photographs.',
    fabric: ['Festive woven fabric', 'Hand-finished detailing', 'Easy drape', 'Sizes S to 3XL'],
    benefits: [
      'Made for wedding season',
      'A flattering, comfortable drape',
      'Easy to restyle after the event',
      'Sizes S to 3XL',
    ],
    sizeFit: 'Available in S to 3XL. Message us with your usual size for a fit recommendation.',
    care: 'Dry clean recommended. Steam lightly before wearing.',
  },
  {
    name: 'Mirror Work Evening Dress',
    slug: 'mirror-work-evening-dress',
    price: null,
    categorySlug: 'dresses',
    image: 'images/products/mirror-work-evening-dress.webp',
    size: 'S – 2XL',
    description:
      'An elegant mirror-work dress that catches the light with every step. An easy choice for engagements, dinners and festive evenings.',
    fabric: ['Mirror work', 'Festive drape', 'Lined bodice', 'Sizes S to 2XL'],
    benefits: [
      'Hand-set mirror detailing',
      'Catches the light beautifully',
      'Comfortable through a long evening',
      'Sizes S to 2XL',
    ],
    sizeFit: 'Available in S to 2XL. Fits true to size.',
    care: 'Dry clean only. Do not iron directly over the mirror work.',
    featured: true,
  },
  {
    name: 'Hania Aamir Inspired Co-ord Set',
    slug: 'hania-inspired-coord-set',
    price: null,
    categorySlug: 'co-ords',
    image: 'images/products/hania-inspired-coord-set.webp',
    size: 'M – 5XL',
    description:
      'A celebrity-inspired co-ord in an easy, elegant cut. The kind of set that looks considered but feels like comfort dressing.',
    fabric: ['Soft woven fabric', 'Relaxed co-ord silhouette', 'Hand-finished neckline', 'Sizes M to 5XL'],
    benefits: [
      'Celebrity-inspired styling',
      'Easy to wear all day',
      'Dress it up or keep it casual',
      'Sizes M to 5XL',
    ],
    sizeFit: 'Available in M to 5XL. Relaxed fit — size down for a closer cut.',
    care: 'Gentle machine wash cold, inside out. Do not tumble dry.',
    bestseller: true,
  },
  {
    name: 'Curve Confidence Co-ord Set',
    slug: 'curve-confidence-coord-set',
    price: null,
    categorySlug: 'co-ords',
    image: 'images/products/curve-confidence-coord-set.webp',
    size: 'XS – 4XL',
    description:
      'Curves, comfort and confidence in one set. A straight-leg co-ord with a soft embroidered neckline, made to move with you.',
    fabric: ['Stretch-friendly weave', 'Straight-leg trousers', 'Embroidered neckline', 'XS to 4XL'],
    benefits: [
      'Cut for real curves',
      'Comfort-first stretch weave',
      'Polished enough for an occasion',
      'XS to 4XL',
    ],
    sizeFit: 'Available in XS to 4XL. Take your usual size for a relaxed fit.',
    care: 'Gentle machine wash cold. Iron on low heat.',
  },
  {
    name: 'Plus-Size Luxe Co-ord',
    slug: 'plus-size-luxe-coord',
    price: null,
    categorySlug: 'co-ords',
    image: 'images/products/plus-size-luxe-coord.webp',
    size: '3XL – 9XL',
    description:
      'A plus-size co-ord made to celebrate every body — generous through the hip and thigh, with a hand-finished yoke that keeps it dressy.',
    fabric: ['Made for 3XL to 9XL', 'Embroidered yoke', 'Straight trousers', 'Soft woven fabric'],
    benefits: [
      'Sizes 3XL to 9XL',
      'Roomy through the hip and thigh',
      'Hand-finished yoke',
      'Dressy enough for an occasion',
    ],
    sizeFit: 'Available in 3XL to 9XL. Message us for the full size chart.',
    care: 'Gentle hand wash separately. Iron on low heat.',
    featured: true,
  },
  {
    name: 'Festive 2100 Co-ord Set',
    slug: 'festive-2100-coord-set',
    price: 2100,
    categorySlug: 'co-ords',
    image: 'images/products/festive-2100-coord-set.webp',
    size: 'M – 5XL',
    description:
      'Our festive co-ord set, styled here in-store at Amayas. Priced at ₹2,100 as shared on Instagram — message us to confirm the colours in stock.',
    fabric: ['Festive woven fabric', 'Hand-finished details', 'Sizes M to 5XL', 'Set price ₹2,100'],
    benefits: [
      'Festive-ready set',
      'Sizes M to 5XL',
      '₹2,100 for the set',
      'Colours confirmed on WhatsApp',
    ],
    sizeFit: 'Available in M to 5XL. Message us for the current colour card and measurements.',
    care: 'Dry clean recommended. Steam lightly before wearing.',
    bestseller: true,
  },
  {
    name: 'Korean Imported Shirt',
    slug: 'korean-imported-shirt',
    price: 199,
    categorySlug: 'shirts-tunics',
    image: 'images/products/korean-imported-shirt.webp',
    size: 'S – XL',
    description:
      'An imported Korean-style shirt, available in four colours. An easy layer for work, brunch and everything in between — ₹199 with free shipping as shared on Instagram.',
    fabric: ['Imported fabric', 'Relaxed shirt cut', 'Four colours', 'Sizes S to XL'],
    benefits: ['Imported Korean style', '₹199 with free shipping', 'Four colours to choose from', 'Sizes S to XL'],
    sizeFit:
      'Sizes S to XL. No returns, refunds or exchanges on this piece — message us for the size chart before ordering.',
    care: 'Gentle machine wash cold. Iron on low heat.',
    bestseller: true,
    featured: true,
  },
  {
    name: 'Imported Printed Shirt',
    slug: 'imported-printed-shirt',
    price: null,
    categorySlug: 'shirts-tunics',
    image: 'images/products/imported-printed-shirt.webp',
    size: 'S – XL',
    description:
      'An imported printed shirt with an easy, borrowed-from-the-boys cut. Layer it open over a co-ord or wear it buttoned with denim.',
    fabric: ['Imported printed fabric', 'Relaxed shirt cut', 'Button-front', 'Sizes S to XL'],
    benefits: ['Easy, oversized fit', 'Print-led styling', 'Works over a co-ord', 'Sizes S to XL'],
    sizeFit: 'Available in S to XL. Designed for a relaxed fit.',
    care: 'Gentle machine wash cold, inside out.',
  },
  {
    name: 'Everyday Casual Set',
    slug: 'everyday-casual-set',
    price: null,
    categorySlug: 'shirts-tunics',
    image: 'images/products/everyday-casual-set.webp',
    size: 'S – 4XL',
    description:
      'A new casual design for the days between occasions. Soft, easy and made for real life — from school runs to cafe dates.',
    fabric: ['Soft everyday fabric', 'Relaxed tunic cut', 'Matching set', 'Sizes S to 4XL'],
    benefits: ['Everyday comfort', 'New-season design', 'Easy to restyle', 'Sizes S to 4XL'],
    sizeFit: 'Small to 4XL. Take your usual size.',
    care: 'Gentle machine wash cold. Iron on low heat.',
  },
  {
    name: 'Embroidered Pakistani Suit',
    slug: 'embroidered-pakistani-suit',
    price: null,
    categorySlug: 'fabric-suit',
    image: 'images/products/embroidered-pakistani-suit.webp',
    size: 'M – 3XL',
    description:
      'Elegance, embroidered to perfection. Delicate florals and timeless details in a Pakistani-style suit, made for the woman who loves her style modest and unforgettable.',
    fabric: ['Embroidered woven fabric', 'Delicate floral motifs', 'Straight-cut suit', 'Sizes M to 3XL'],
    benefits: ['Hand-finished embroidery', 'Modest, timeless silhouette', 'Festive and everyday styling', 'M to 3XL'],
    sizeFit: 'Available in M to 3XL. Message us for the size chart and current colours.',
    care: 'Dry clean recommended. Iron on low heat, inside out.',
    featured: true,
  },
  {
    name: 'Premium Bag Pack & Sling',
    slug: 'premium-bag-pack-sling',
    price: null,
    categorySlug: 'accessories',
    image: 'images/products/premium-bag-pack-sling.webp',
    size: 'One size',
    description:
      'Premium bag packs and sling bags, chosen for everyday errands and occasion wear. Colours and styles vary — message us for what is in store.',
    fabric: ['Premium quality', 'Multiple compartments', 'Adjustable strap', 'Colours vary in store'],
    benefits: ['Everyday and occasion ready', 'Practical compartment space', 'Sling and backpack styles', 'In-store colour options'],
    sizeFit: 'One size. Message us on WhatsApp for the current colours and styles.',
    care: 'Wipe clean with a soft, dry cloth. Store away from direct sunlight.',
  },
  {
    name: 'Pink Diamond Shrug Burqa',
    slug: 'pink-diamond-shrug-burqa',
    price: null,
    categorySlug: 'modest',
    image: 'images/products/pink-diamond-shrug-burqa.webp',
    size: 'Free size',
    description:
      'A pink diamond-studded shrug-style burqa in a light imported fabric, with detailed sleeves and back. Modest wear, made to feel special.',
    fabric: ['Imported lightweight fabric', 'Diamond-studded front', 'Sleeve & back detailing', 'Free size'],
    benefits: ['Shrug-style modest silhouette', 'Diamond-studded detailing', 'Lightweight imported fabric', 'Free size'],
    sizeFit: 'Free size. Message us for measurements before ordering.',
    care: 'Gentle hand wash separately. Do not iron directly over the embellishment.',
  },
];

const GALLERY = [
  { image: 'images/gallery/mirror-work.webp', caption: 'Mirror work, evening light', externalUrl: `${INSTAGRAM}reel/DYHoyOsjJDf/` },
  { image: 'images/gallery/imported-shirts.webp', caption: 'New imported shirts', externalUrl: `${INSTAGRAM}p/DfcY44_MapM/` },
  { image: 'images/gallery/plus-size.webp', caption: 'Plus-size festive edit', externalUrl: `${INSTAGRAM}p/Dd8u4lXgre4/` },
  { image: 'images/gallery/bags.webp', caption: 'Bags for every day', externalUrl: `${INSTAGRAM}reel/DH0MXASP5t8/` },
  { image: 'images/gallery/hania-coord.webp', caption: 'The Hania-inspired co-ord', externalUrl: `${INSTAGRAM}p/Dd_G_gJi-xD/` },
  { image: 'images/gallery/in-store.webp', caption: 'In store at Amayas', externalUrl: `${INSTAGRAM}p/DbfhfKHsYBk/` },
];

export async function seedCatalogue(): Promise<void> {
  const categoryIds = new Map<string, unknown>();
  let createdCategories = 0;
  let createdProducts = 0;

  for (const [index, category] of CATEGORIES.entries()) {
    let doc = await Category.findOne({ slug: category.slug });
    if (!doc) {
      doc = await Category.create({ ...category, displayOrder: index + 1 });
      createdCategories++;
    }
    categoryIds.set(category.slug, doc._id);
  }

  for (const [index, product] of PRODUCTS.entries()) {
    const exists = await Product.findOne({ slug: product.slug });
    if (exists) continue;

    await Product.create({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      compareAtPrice: null,
      size: product.size,
      category: categoryIds.get(product.categorySlug) ?? null,
      images: [product.image],
      ingredients: product.fabric,
      benefits: product.benefits,
      howToUse: product.sizeFit,
      warnings: product.care,
      variants: [],
      stockStatus: 'in_stock',
      bestseller: product.bestseller ?? false,
      featured: product.featured ?? false,
      seoTitle: `${product.name} | Amayas Fashion`,
      seoDescription: product.description.slice(0, 160),
      displayOrder: index + 1,
      archived: false,
    });
    createdProducts++;
  }

  let createdGallery = 0;
  if (createdProducts > 0) {
    for (const [index, item] of GALLERY.entries()) {
      const exists = await GalleryItem.findOne({ image: item.image });
      if (exists) continue;
      await GalleryItem.create({
        ...item,
        displayOrder: index + 1,
        active: true,
      });
      createdGallery++;
    }
  }

  console.log(
    `✓ Catalogue: ${createdCategories} categories, ${createdProducts} products and ${createdGallery} gallery items created` +
      (createdCategories || createdProducts || createdGallery ? '' : ' (already present)')
  );
}
