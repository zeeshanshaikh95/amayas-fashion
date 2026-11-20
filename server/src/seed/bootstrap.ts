/**
 * Idempotent bootstrap logic shared by the seed CLI and the server's
 * AUTO_SEED startup hook. Creates ONLY what the application needs to run:
 *   • the first admin account (from ADMIN_EMAIL / ADMIN_PASSWORD)
 *   • the singleton SiteSettings document with default WhatsApp templates
 *
 * The catalogue is deliberately never touched here — real products,
 * categories, reviews and gallery items come from the client via /admin.
 */
import bcrypt from 'bcryptjs';
import { AdminUser, SiteSettings } from '../models/index.js';
import { config } from '../config/env.js';

export async function bootstrapAdmin(): Promise<void> {
  const existing = await AdminUser.findOne({ email: config.adminEmail });
  if (existing) {
    console.log(`• Admin already exists: ${config.adminEmail}`);
    // Self-heal: if the account still authenticates with the bootstrap password
    // but the first-login flag was cleared (e.g. by an API smoke run), re-arm it.
    if (
      !existing.mustChangePassword &&
      (await bcrypt.compare(config.adminPassword, existing.passwordHash))
    ) {
      existing.mustChangePassword = true;
      await existing.save();
      console.log('  ↻ Bootstrap password still in use — first-login password change re-armed.');
    }
    return;
  }

  if (config.adminPassword === '[CHANGE_ME_BEFORE_PRODUCTION]') {
    console.log(
      '! ADMIN_PASSWORD is still the placeholder from .env.example — set a real password first.'
    );
  }

  const passwordHash = await bcrypt.hash(config.adminPassword, 12);
  await AdminUser.create({
    email: config.adminEmail,
    passwordHash,
    role: 'admin',
    // Bootstrap credentials (ADMIN_PASSWORD) must be rotated on first login.
    mustChangePassword: true,
  });
  console.log(`✓ Admin created: ${config.adminEmail}`);
}

export async function bootstrapSettings(): Promise<void> {
  const existing = await SiteSettings.findOne();
  if (existing) {
    console.log('• Site settings already exist');
    return;
  }

  await SiteSettings.create({
    businessName: 'Amayas Fashion',
    whatsappNumber: '+919106555977',
    instagramUrl: 'https://www.instagram.com/_amayas_fashion/',
    email: '',
    mapsUrl: '',
    hero: {
      headline: 'Elegance in Every Thread',
      subheadline:
        'Festive dresses, co-ords and everyday pieces in sizes small to 10XL. Worldwide shipping, only prepaid.',
      imageUrl: '',
    },
    about: {
      intro:
        'Amayas Fashion is a six-year-old label built on elegant, size-inclusive dressing — dresses, co-ords, tunics, fabrics, bags and modest wear, in sizes small to 10XL.',
      story:
        'What started as a small dream has grown into six years of learning, taking chances and dressing more than 15,000 orders.\n\nAmayas is built around the idea that elegance should not come in one size. The collection runs from small to 10XL, with new festive edits, imported shirts and co-ords added through the year. Every order is handled personally on WhatsApp, with size guidance and delivery details confirmed before dispatch.\n\nWorldwide shipping. No COD, only prepaid.',
      founderImageUrl: '',
    },
    announcements: {
      enabled: true,
      text: 'Worldwide shipping · No COD · Sizes S–10XL',
    },
  });
  console.log('✓ Site settings created with Amayas Fashion defaults');
}
