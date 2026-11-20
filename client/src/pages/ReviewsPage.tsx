import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { Stars } from '@/components/Stars';
import { EmptyState } from '@/components/EmptyState';
import { Seo } from '@/components/seo/Seo';

export function ReviewsPage() {
  const { data, loading, error, refetch } = useApi(
    () => publicApi.listReviews().then((r) => r.reviews),
    []
  );

  return (
    <>
      <Seo
        title="Customer Reviews"
        description="Real feedback from Amayas Fashion customers on our dresses, co-ords and modest wear."
        canonicalPath="/reviews"
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="max-w-2xl">
          <p className="eyebrow">Customer love</p>
          <h1 className="section-title mt-3">
            Reviews &amp; <span className="script-accent">fit notes</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            Feedback from customers who have ordered and worn Amayas. Reviews appear here once they
            are approved by the studio.
          </p>
        </header>

        {loading ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-40" />)}
          </div>
        ) : error ? (
          <div className="mt-10">
            <EmptyState icon="error" title="Couldn't load reviews" description={error} action={<button className="btn-outline" onClick={() => refetch()}>Try again</button>} />
          </div>
        ) : !data?.length ? (
          <div className="mt-10">
            <EmptyState
              title="No reviews yet"
              description="Customer reviews will be shared here as soon as they're approved."
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {data.map((r) => (
              <figure key={r._id} className="card flex gap-4 p-6">
                {r.image ? (
                  <img src={r.image} alt={`Photo from ${r.customerName}`} className="h-20 w-20 shrink-0 rounded-xl object-cover" loading="lazy" />
                ) : null}
                <div className="flex flex-col">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">“{r.text}”</blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-ink">— {r.customerName}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
