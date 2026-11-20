import mongoose, { Schema, model, type Model } from 'mongoose';

export const WHATSAPP_TEMPLATE_DEFAULT =
  'Hi Amayas Fashion! 🤍\n' +
  'I would like to order the following:\n' +
  '{{ITEMS}}\n' +
  'Estimated total: {{TOTAL}}\n\n' +
  'Please share availability, size guidance and delivery details.';

export const WHATSAPP_TEMPLATE_SINGLE_DEFAULT =
  'Hi Amayas Fashion! 🤍\n' +
  'I would like to order:\n' +
  '• {{PRODUCT}}\n' +
  '{{VARIANT_LINE}}{{QTY_LINE}}Price: {{PRICE}}\n\n' +
  'Please share availability, size guidance and delivery details.';

export interface ISiteSettings {
  businessName: string;
  whatsappNumber: string;
  instagramUrl: string;
  email: string;
  mapsUrl: string;
  whatsappTemplate: string;
  whatsappSingleProductTemplate: string;
  hero: {
    headline: string;
    subheadline: string;
    imageUrl: string;
    /** Cloudinary public_id for `hero.imageUrl` (derived on save, server-side). */
    imagePublicId: string;
  };
  about: {
    intro: string;
    story: string;
    founderImageUrl: string;
    /** Cloudinary public_id for `about.founderImageUrl` (derived on save, server-side). */
    founderImagePublicId: string;
  };
  announcements: {
    enabled: boolean;
    text: string;
  };
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: 'Amayas Fashion' },
    whatsappNumber: { type: String, default: '+919106555977' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/_amayas_fashion/' },
    email: { type: String, default: '' },
    mapsUrl: { type: String, default: '' },
    whatsappTemplate: { type: String, default: WHATSAPP_TEMPLATE_DEFAULT },
    whatsappSingleProductTemplate: { type: String, default: WHATSAPP_TEMPLATE_SINGLE_DEFAULT },
    hero: {
      headline: { type: String, default: 'Elegance in Every Thread' },
      subheadline: {
        type: String,
        default:
          'Festive dresses, co-ords and everyday pieces in sizes small to 10XL. Worldwide shipping, only prepaid.',
      },
      imageUrl: { type: String, default: '' },
      imagePublicId: { type: String, default: '' },
    },
    about: {
      intro: {
        type: String,
        default:
          'Amayas Fashion is a six-year-old label built on elegant, size-inclusive dressing — dresses, co-ords, tunics, fabrics, bags and modest wear, in sizes small to 10XL.',
      },
      story: { type: String, default: '' },
      founderImageUrl: { type: String, default: '' },
      founderImagePublicId: { type: String, default: '' },
    },
    announcements: {
      enabled: { type: Boolean, default: false },
      text: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ?? model<ISiteSettings>('SiteSettings', siteSettingsSchema);
