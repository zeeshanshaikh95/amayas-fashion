import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { publicApi } from '@/api/endpoints';
import type { PublicSettings } from '@/types';

const FALLBACK_SETTINGS: PublicSettings = {
  businessName: 'Amayas Fashion',
  whatsappNumber: '919106555977',
  instagramUrl: 'https://www.instagram.com/_amayas_fashion/',
  email: '',
  mapsUrl: '',
  whatsappTemplate:
    'Hi Amayas Fashion! 🤍\n' +
    'I would like to order:\n' +
    '{{ITEMS}}\n' +
    'Estimated total: {{TOTAL}}\n\n' +
    'Please share availability, size guidance and delivery details.',
  whatsappSingleProductTemplate:
    'Hi Amayas Fashion! 🤍\n' +
    'I would like to order:\n' +
    '• {{PRODUCT}}\n' +
    '{{VARIANT_LINE}}{{QTY_LINE}}Price: {{PRICE}}\n\n' +
    'Please share availability, size guidance and delivery details.',
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
};

interface SettingsContextValue {
  settings: PublicSettings;
  loading: boolean;
  error: string | null;
  whatsappConfigured: boolean;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: FALLBACK_SETTINGS,
  loading: true,
  error: null,
  whatsappConfigured: false,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PublicSettings>(FALLBACK_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    publicApi
      .getSettings()
      .then(({ settings }) => {
        if (!cancelled) {
          setSettings({ ...FALLBACK_SETTINGS, ...settings });
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Could not load site settings');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const whatsappConfigured = Boolean(settings.whatsappNumber);

  return (
    <SettingsContext.Provider value={{ settings, loading, error, whatsappConfigured }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  return useContext(SettingsContext);
}
