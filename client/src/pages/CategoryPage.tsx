import { Link, useParams } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/EmptyState';
import { Seo } from '@/components/seo/Seo';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const { data, loading, error } = useApi(
    () => publicApi.getCategory(slug),
    [slug]
  );

  return (
    <>
      {data ? (
        <Seo
          title={data.category.name}
          description={data.category.description || `Browse ${data.category.name} from Amayas Fashion.`}
          canonicalPath={`/category/${data.category.slug}`}
        />
      ) : (
        <Seo title="Category" canonicalPath={`/category/${slug}`} />
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {loading ? (
          <>
            <div className="skeleton h-[320px] w-full" />
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-80" />)}
            </div>
          </>
        ) : error || !data ? (
          <div className="py-10">
            <EmptyState
              icon="error"
              title="Category not found"
              description={error ?? 'It may have been removed or renamed.'}
              action={<Link to="/shop" className="btn-primary">Browse all pieces</Link>}
            />
          </div>
        ) : (
          <>
            <header className="relative overflow-hidden rounded-xl bg-brand-950 text-cream">
              {data.category.image ? (
                <img
                  src={data.category.image}
                  alt={data.category.name}
                  className="absolute inset-0 h-full w-full object-cover object-[center_18%] opacity-45"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/60 to-brand-950/10" />
              <div className="relative px-6 py-14 sm:px-10 sm:py-20">
                <nav className="text-[9px] uppercase tracking-[0.2em] text-cream/50" aria-label="Breadcrumb">
                  <Link to="/shop" className="hover:text-gold-200">Shop</Link>
                  <span className="mx-2">/</span>
                  <span className="text-cream/80">{data.category.name}</span>
                </nav>
                <p className="eyebrow mt-5 !text-gold-300">The edit</p>
                <h1 className="mt-3 font-display text-4xl font-medium sm:text-6xl">{data.category.name}</h1>
                {data.category.description ? (
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/70">
                    {data.category.description}
                  </p>
                ) : null}
              </div>
            </header>

            {data.products.length === 0 ? (
              <div className="mt-10">
                <EmptyState
                  title="No pieces in this category yet"
                  description="New pieces land here as they're photographed. In the meantime, message us and we'll help you directly."
                  action={
                    <div className="flex flex-wrap justify-center gap-3">
                      <Link to="/shop" className="btn-outline">Browse all pieces</Link>
                      <WhatsAppButton message="Hi Amayas Fashion! I'd like to know what's available." label="Ask on WhatsApp" />
                    </div>
                  }
                />
              </div>
            ) : (
              <>
                <p className="mt-7 text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                  {data.products.length} piece{data.products.length === 1 ? '' : 's'}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {data.products.map((p) => <ProductCard key={p._id} product={p} />)}
                </div>
              </>
            )}

            <div className="mt-12 text-center">
              <Link to="/shop" className="btn-outline">← Browse all pieces</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
