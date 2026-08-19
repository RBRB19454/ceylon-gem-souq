import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext.jsx';
import { GemIllustration, GemTypeBadge } from '../components/GemVisual.jsx';

const SORT_OPTIONS = ['newest', 'price_asc', 'price_desc'];

function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="skeleton" style={{ height: '200px' }} />
      <div style={{ padding: '1.5rem' }}>
        <div className="skeleton" style={{ height: '14px', width: '40%', marginBottom: '0.75rem' }} />
        <div className="skeleton" style={{ height: '20px', width: '80%', marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ height: '14px', width: '60%' }} />
      </div>
    </div>
  );
}

export default function Listings() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const gemType = searchParams.get('gemType') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const certifiedOnly = searchParams.get('certifiedOnly') === 'true';
  const sort = searchParams.get('sort') || 'newest';

  // Local, uncommitted filter draft (applied on submit so typing a price
  // doesn't refetch on every keystroke).
  const [draft, setDraft] = useState({ gemType, minPrice, maxPrice, certifiedOnly });
  useEffect(() => setDraft({ gemType, minPrice, maxPrice, certifiedOnly }), [gemType, minPrice, maxPrice, certifiedOnly]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    const params = {};
    if (gemType) params.gemType = gemType;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (certifiedOnly) params.certifiedOnly = 'true';

    api
      .get('/listings', { params })
      .then(({ data }) => {
        if (!cancelled) setListings(data);
      })
      .catch(() => {
        if (!cancelled) setError(t('listings_load_error'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [gemType, minPrice, maxPrice, certifiedOnly]);

  const sortedListings = useMemo(() => {
    const copy = [...listings];
    if (sort === 'price_asc') copy.sort((a, b) => a.priceUSD - b.priceUSD);
    else if (sort === 'price_desc') copy.sort((a, b) => b.priceUSD - a.priceUSD);
    else copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return copy;
  }, [listings, sort]);

  const applyFilters = (e) => {
    e.preventDefault();
    const next = {};
    if (draft.gemType) next.gemType = draft.gemType;
    if (draft.minPrice) next.minPrice = draft.minPrice;
    if (draft.maxPrice) next.maxPrice = draft.maxPrice;
    if (draft.certifiedOnly) next.certifiedOnly = 'true';
    if (sort !== 'newest') next.sort = sort;
    setSearchParams(next);
  };

  const resetFilters = () => {
    setDraft({ gemType: '', minPrice: '', maxPrice: '', certifiedOnly: false });
    setSearchParams({});
  };

  const setSort = (value) => {
    const next = Object.fromEntries(searchParams);
    if (value === 'newest') delete next.sort;
    else next.sort = value;
    setSearchParams(next);
  };

  return (
    <div>
      {/* Page header */}
      <section style={{ maxWidth: '700px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
        <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
          {t('listings_eyebrow')}
        </span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{t('listings_title')}</h1>
        <p>{t('listings_subtitle')}</p>
      </section>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Filters */}
        <aside style={{ flex: '1 1 280px', maxWidth: '320px' }} className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.6rem' }}>
            {t('filters_heading')}
          </h3>
          <form onSubmit={applyFilters}>
            <div className="form-group">
              <label className="form-label">{t('label_gem_type')}</label>
              <select value={draft.gemType} onChange={(e) => setDraft({ ...draft, gemType: e.target.value })}>
                <option value="">{t('filter_all')}</option>
                <option value="sapphire">{t('filter_sapphire')}</option>
                <option value="catseye">{t('filter_catseye')}</option>
                <option value="moonstone">{t('filter_moonstone')}</option>
                <option value="spinel">{t('filter_spinel')}</option>
                <option value="alexandrite">{t('filter_alexandrite')}</option>
                <option value="ruby">{t('filter_ruby')}</option>
                <option value="other">{t('filter_other')}</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t('min_price')}</label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 500"
                value={draft.minPrice}
                onChange={(e) => setDraft({ ...draft, minPrice: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t('max_price')}</label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 10000"
                value={draft.maxPrice}
                onChange={(e) => setDraft({ ...draft, maxPrice: e.target.value })}
              />
            </div>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                marginTop: '0.5rem',
              }}
            >
              <input
                type="checkbox"
                checked={draft.certifiedOnly}
                onChange={(e) => setDraft({ ...draft, certifiedOnly: e.target.checked })}
                style={{ width: 'auto', accentColor: 'var(--color-accent)' }}
              />
              {t('filter_certified_only')}
            </label>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-secondary" style={{ flex: 1, padding: '0.6rem' }}>
                {t('apply_filters')}
              </button>
              <button type="button" onClick={resetFilters} className="btn btn-outline" style={{ flex: 1, padding: '0.6rem' }}>
                {t('reset_filters')}
              </button>
            </div>
          </form>
        </aside>

        {/* Results */}
        <section style={{ flex: '3 1 600px' }}>
          {/* Toolbar: result count + sort */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              {loading ? t('loading') : t('results_count').replace('{count}', sortedListings.length)}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ width: 'auto', minWidth: '170px' }}
              aria-label={t('sort_label')}
            >
              <option value="newest">{t('sort_newest')}</option>
              <option value="price_asc">{t('sort_price_asc')}</option>
              <option value="price_desc">{t('sort_price_desc')}</option>
            </select>
          </div>

          {error && (
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-error)' }}>
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', marginTop: 0 }}>
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : sortedListings.length === 0 ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.05rem' }}>{t('no_listings')}</p>
            </div>
          ) : (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', marginTop: 0 }}>
              {sortedListings.map((l) => (
                <Link
                  to={`/listings/${l._id}`}
                  key={l._id}
                  className="card"
                  style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ position: 'relative' }}>
                    {l.images && l.images[0] ? (
                      <img src={l.images[0]} alt={l.title} className="gem-card-image" style={{ height: '200px' }} />
                    ) : (
                      <GemIllustration gemType={l.gemType} height={200} />
                    )}
                    {l.certification?.issuer && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          insetInlineStart: '0.75rem',
                          background: 'rgba(11,30,61,0.85)',
                          color: 'var(--color-accent)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '999px',
                        }}
                      >
                        &#10003; {t('badge_certified')}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '0.6rem' }}>
                      <GemTypeBadge gemType={l.gemType} label={t(`filter_${l.gemType}`)} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                      {l.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                      {l.weightCt} ct &middot; {l.origin || 'Sri Lanka'}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                        ${l.priceUSD.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sapphire)' }}>
                        {t('view_details')} &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
