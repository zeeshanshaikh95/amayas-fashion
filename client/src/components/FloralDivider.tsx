interface Props {
  className?: string;
}

/** A thin art-deco rule with a centred diamond — used instead of floral dividers. */
export function FloralDivider({ className = '' }: Props) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-brand-300" />
      <span className="relative flex h-2 w-2 rotate-45 items-center justify-center border border-gold-400">
        <span className="h-0.5 w-0.5 bg-gold-400" />
      </span>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-brand-300" />
    </div>
  );
}
