import { useRef } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

interface Props {
  products: Product[];
}

/** Horizontally scrolling product rail with simple prev/next controls. */
export function ProductRail({ products }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  if (!products.length) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="w-[72%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous products"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-brand-600 hover:text-brand-700"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next products"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-brand-600 hover:text-brand-700"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
