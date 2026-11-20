import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/EmptyState';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Seo } from '@/components/seo/Seo';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'bestseller', label: 'Bestsellers first' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'newest', label: 'Newest' },
] as const;

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const sort = (searchParams.get('sort') ?? 'featured') as string;

  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);

  const products = useApi(
    () => publicApi.listProducts({ search, category, sort: sort as never }).then((r) => r.products),
    [search, category, sort]
  );

  const [searchInput, setSearchInput] = useState(search);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  }

  const hasFilters = Boolean(search || category || (sort && sort !== 'featured'));

  return (
    <>
      <Seo
        title="Shop All Pieces"
        description="Browse the Amayas Fashion collection — festive dresses, co-ords, shirts, suits, bags and modest wear in sizes small to 10XL."
        canonicalPath="/shop"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="flex flex-col justify-between gap-5 border-b border-brand-100 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">The collection</p>
            <h1 className="section-title mt-3">
              Shop <span className="script-accent">Amayas</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              Festive edits, easy co-ords and everyday pieces — photographed in the studio, sized
              small to 10XL and shipped worldwide.
            </p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            No COD · Only prepaid
          </p>
        </header>

        {/* Filters */}
        <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            <button
              type="button"
              onClick={() => setParam('category', '')}
              className={`shrink-0 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                !category ? 'bg-brand-700 text-white' : 'bg-white text-ink-soft ring-1 ring-brand-200 hover:bg-brand-50'
              }`}
            >
              All
            </button>
            {categories.data?.map((c) => (
              <button
                key={c._id}
                type="button"
                onClick={() => setParam('category', c.slug)}
                className={`shrink-0 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  category === c.slug
                    ? 'bg-brand-700 text-white'
                    : 'bg-white text-ink-soft ring-1 ring-brand-200 hover:bg-brand-50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <form
              role="search"
              className="relative flex-1 lg:w-64"
              onSubmit={(e) => {
                e.preventDefault();
                setParam('search', searchInput.trim());
              }}
            >
              <input
                type="search"
                className="input !pl-10 !py-2"
                placeholder="Search pieces…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Search products"
              />
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </form>
            <select
              className="input !w-auto !py-2 text-[10px] uppercase tracking-[0.1em]"
              value={sort}
              onChange={(e) => setParam('sort', e.target.value)}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">
          {products.loading ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => <div key={i} className="skeleton h-80" />)}
            </div>
          ) : products.error ? (
            <EmptyState icon="error" title="Couldn't load products" description={products.error} action={<button className="btn-outline" onClick={() => products.refetch()}>Try again</button>} />
          ) : !products.data?.length ? (
            hasFilters ? (
              <EmptyState
                icon="search"
                title="No pieces match your filters"
                description="Try a different search term or category."
                action={<button className="btn-outline" onClick={() => setSearchParams({})}>Clear filters</button>}
              />
            ) : (
              <EmptyState
                title="No pieces available yet"
                description="The catalogue is being prepared. Follow us on Instagram or message us on WhatsApp and we'll help you personally."
                action={<WhatsAppButton message="Hi Amayas Fashion! I'd like to know what's available." label="Ask on WhatsApp" />}
              />
            )
          ) : (
            <>
              <p className="mb-4 text-[10px] uppercase tracking-[0.16em] text-ink-soft" aria-live="polite">
                {products.data.length} piece{products.data.length === 1 ? '' : 's'}
                {search ? ` matching “${search}”` : ''}
              </p>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {products.data.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
