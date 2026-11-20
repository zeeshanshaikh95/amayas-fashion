import { Link } from 'react-router-dom';
import { LOGO_TRANSPARENT } from '@/lib/brand';

interface Props {
  /** `md` is the navbar, `lg` the footer, `sm` the admin topbar. */
  size?: 'sm' | 'md' | 'lg';
  /** Render the wordmark next to the roundel. */
  showWordmark?: boolean;
  /** `light` inverts the wordmark for dark surfaces (footer/admin). */
  tone?: 'dark' | 'light';
  className?: string;
}

const MARK_SIZE = { sm: 'h-9 w-9', md: 'h-11 w-11 sm:h-12 sm:w-12', lg: 'h-16 w-16' };
const NAME_SIZE = { sm: 'text-base', md: 'text-xl sm:text-[1.4rem]', lg: 'text-2xl' };
const TAG_SIZE = { sm: 'text-[7px]', md: 'text-[8px]', lg: 'text-[9px]' };

/** The brand lockup used across the storefront and admin. */
export function BrandLogo({ size = 'md', showWordmark = true, tone = 'dark', className = '' }: Props) {
  const isLight = tone === 'light';
  return (
    <Link
      to="/"
      className={`group flex shrink-0 items-center gap-3 ${className}`}
      aria-label="Amayas Fashion — home"
    >
      <img
        src={LOGO_TRANSPARENT}
        alt=""
        width={640}
        height={640}
        className={`${MARK_SIZE[size]} rounded-full object-contain ring-1 ring-brand-200/80 transition-transform duration-500 group-hover:rotate-3`}
      />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display font-semibold uppercase tracking-[0.18em] ${isLight ? 'text-cream' : 'text-ink'} ${NAME_SIZE[size]}`}
          >
            Amayas
          </span>
          <span
            className={`mt-1 font-body font-medium uppercase tracking-[0.3em] ${isLight ? 'text-gold-300' : 'text-brand-600'} ${TAG_SIZE[size]}`}
          >
            Fashion
          </span>
        </span>
      ) : null}
    </Link>
  );
}
