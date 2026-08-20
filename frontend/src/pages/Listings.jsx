import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext.jsx';
import { GemIllustration } from '../components/GemVisual';

const PRICE_FLOOR = 0;
const PRICE_CEILING = 50000;

export default function Listings() {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search parameters
  const gemType = searchParams.get('gemType') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const shape = searchParams.get('shape') || '';
  const certifiedOnly = searchParams.get('certifiedOnly') === 'true';
  const sort = searchParams.get('sort') || 'newest';

  // Draft filter states (committed on Submit)
  const [draft, setDraft] = useState({ gemType, minPrice, maxPrice, shape, certifiedOnly });

  useEffect(() => {
    setDraft({ gemType, minPrice, maxPrice, shape, certifiedOnly });
  }, [gemType, minPrice, maxPrice, shape, certifiedOnly]);

  const draftMin = draft.minPrice === '' ? PRICE_FLOOR : Number(draft.minPrice);
  const draftMax = draft.maxPrice === '' ? PRICE_CEILING : Number(draft.maxPrice);

  const setMinHandle = (val) => {
    const next = Math.min(Number(val), draftMax);
    setDraft({ ...draft, minPrice: next === PRICE_FLOOR ? '' : String(next) });
  };
  const setMaxHandle = (val) => {
    const next = Math.max(Number(val), draftMin);
    setDraft({ ...draft, maxPrice: next >= PRICE_CEILING ? '' : String(next) });
  };

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
        if (!cancelled) {
          let filtered = data;
          if (shape) {
            filtered = data.filter((l) => String(l.shape || '').toLowerCase().includes(shape.toLowerCase()));
          }
          setListings(filtered);
        }
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
  }, [gemType, minPrice, maxPrice, shape, certifiedOnly]);

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
    if (draft.shape) next.shape = draft.shape;
    if (draft.certifiedOnly) next.certifiedOnly = 'true';
    if (sort !== 'newest') next.sort = sort;
    setSearchParams(next);
  };

  const resetFilters = () => {
    setDraft({ gemType: '', minPrice: '', maxPrice: '', shape: '', certifiedOnly: false });
    setSearchParams({});
  };

  const setSort = (value) => {
    const next = Object.fromEntries(searchParams);
    if (value === 'newest') delete next.sort;
    else next.sort = value;
    setSearchParams(next);
  };

  const displayListings = useMemo(() => {
    return sortedListings.map((l) => ({
      id: l._id,
      titleEn: l.title,
      titleAr: l.title,
      cutEn: l.shape || null,
      cutAr: l.shape || null,
      colorEn: l.color || null,
      colorAr: l.color || null,
      originEn: l.origin || 'Sri Lanka',
      originAr: l.origin || 'سريلانكا',
      priceEn: `$${Number(l.priceUSD).toLocaleString()} USD`,
      priceAr: `$${Number(l.priceUSD).toLocaleString()} دولار`,
      image: l.images && l.images[0] ? l.images[0] : null,
      certIssuer: l.certification?.issuer || null,
      gemType: l.gemType,
    }));
  }, [sortedListings]);

  const rangeLeftPct = (draftMin / PRICE_CEILING) * 100;
  const rangeRightPct = 100 - (draftMax / PRICE_CEILING) * 100;

  const SHAPES = [
    { key: 'oval', label: 'Oval', svg: <ellipse cx="12" cy="12" rx="9" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
    { key: 'cushion', label: 'Cushion', svg: <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
    { key: 'round', label: 'Round', svg: <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
    { key: 'emerald', label: 'Emerald', svg: <polygon points="8,4 16,4 20,8 20,16 16,20 8,20 4,16 4,8" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
    { key: 'marquise', label: 'Marquise', svg: <path d="M12,4 C15,9 15,15 12,20 C9,15 9,9 12,4 Z" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
    { key: 'pear', label: 'Pear', svg: <path d="M12,4 C12,4 18,12 15,18 C12,21 12,21 9,18 C6,12 12,4 12,4 Z" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
    { key: 'princess', label: 'Princess', svg: <rect x="5" y="5" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <section className="listings-hero">
        <span className="listings-hero-eyebrow">{t('listings_eyebrow')}</span>
        <h1 className="listings-hero-title">{t('listings_title')}</h1>
        <p className="listings-hero-subtitle">{t('listings_subtitle')}</p>
      </section>

      <div className="collection-container">
        <div className="collection-toolbar">
          <span className="collection-count">
            {loading
              ? t('loading')
              : language === 'en'
                ? `Showing ${displayListings.length} Gemstones`
                : `عرض ${displayListings.length} أحجار كريمة`}
          </span>
          <div className="collection-sort-group">
            <span className="collection-sort-label">{t('sort_label')}:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ width: 'auto', minWidth: '180px', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="newest">{t('sort_newest')}</option>
              <option value="price_asc">{t('sort_price_asc')}</option>
              <option value="price_desc">{t('sort_price_desc')}</option>
            </select>
          </div>
        </div>

        <div className="listings-layout-wrapper">
          <aside className="filter-sidebar">
            <div className="filter-sidebar-title-group">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#C5A85C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <h3 className="filter-sidebar-title">{t('filters_heading')}</h3>
            </div>

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
                <label className="form-label">{t('price_range_label')}</label>
                <div className="price-slider-values" style={{ marginTop: '0.2rem' }}>
                  <span>${draftMin.toLocaleString()}</span>
                  <span>{draftMax >= PRICE_CEILING ? `$${PRICE_CEILING.toLocaleString()}+` : `$${draftMax.toLocaleString()}`}</span>
                </div>
                <div className="price-slider-wrap">
                  <div className="price-slider-track" />
                  <div className="price-slider-range" style={{ left: `${rangeLeftPct}%`, right: `${rangeRightPct}%` }} />
                  <input type="range" min={PRICE_FLOOR} max={PRICE_CEILING} step="100" value={draftMin} onChange={(e) => setMinHandle(e.target.value)} aria-label={t('min_price')} />
                  <input type="range" min={PRICE_FLOOR} max={PRICE_CEILING} step="100" value={draftMax} onChange={(e) => setMaxHandle(e.target.value)} aria-label={t('max_price')} />
                </div>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginTop: '-0.2rem' }}>
                  e.g., $1000 - $50000+
                </span>
              </div>

              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <label className="form-label">{t('label_shape')} / Cut</label>
                <div className="shape-grid">
                  {SHAPES.map((sh) => (
                    <div
                      key={sh.key}
                      className={`shape-item ${draft.shape === sh.key ? 'active' : ''}`}
                      onClick={() => setDraft({ ...draft, shape: draft.shape === sh.key ? '' : sh.key })}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" style={{ color: draft.shape === sh.key ? '#C5A85C' : '#94a3b8' }}>
                        {sh.svg}
                      </svg>
                      <span>{sh.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="toggle-row">
                <span className="toggle-label">{t('filter_certified_only')}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={draft.certifiedOnly}
                    onChange={(e) => setDraft({ ...draft, certifiedOnly: e.target.checked })}
                  />
                  <span className="slider-round"></span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-secondary" style={{ flex: 1, padding: '0.65rem', clipPath: 'none', background: '#0b1e3d', color: 'white' }}>
                  {t('apply_filters')}
                </button>
                <button type="button" onClick={resetFilters} className="btn btn-outline" style={{ flex: 1, padding: '0.65rem', borderColor: '#C5A85C', color: '#C5A85C' }}>
                  {t('reset_filters')}
                </button>
              </div>
            </form>
          </aside>

          <section style={{ flex: 1 }}>
            {error && (
              <div className="card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-error)', marginBottom: '1.5rem' }}>
                {error}
              </div>
            )}

            <div className="grid collection-grid">
              {loading ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                  {language === 'en' ? 'Loading collection...' : 'جاري تحميل المجموعة...'}
                </div>
              ) : displayListings.length === 0 ? (
                !error && (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    {t('no_listings')}
                  </div>
                )
              ) : (
                displayListings.map((l) => (
                  <Link to={`/listings/${l.id}`} key={l.id} className="luxury-gem-card" style={{ textDecoration: 'none' }}>
                    <div className="luxury-gem-image-wrap" style={{ position: 'relative' }}>
                      {l.image ? (
                        <img src={l.image} alt={language === 'en' ? l.titleEn : l.titleAr} />
                      ) : (
                        <GemIllustration gemType={l.gemType} height={180} />
                      )}
                      {l.certIssuer && (
                        <span className="gold-ribbon-badge">
                          {l.certIssuer}
                          <span>{t('badge_certified')}</span>
                        </span>
                      )}
                    </div>

                    <div style={{ padding: '0 0.5rem', width: '100%' }}>
                      <h4 className="luxury-gem-title">
                        {language === 'en' ? l.titleEn : l.titleAr}
                      </h4>

                      <div className="card-specs-table">
                        <div className="card-specs-row">
                          <span className="card-specs-label">Cut</span>
                          <span className="card-specs-value">
                            {(language === 'en' ? l.cutEn : l.cutAr) || '\u2014'}
                          </span>
                        </div>
                        <div className="card-specs-row">
                          <span className="card-specs-label">Color</span>
                          <span className="card-specs-value">
                            {(language === 'en' ? l.colorEn : l.colorAr) || '\u2014'}
                          </span>
                        </div>
                        <div className="card-specs-row">
                          <span className="card-specs-label">Origin</span>
                          <span className="card-specs-value">{language === 'en' ? l.originEn : l.originAr}</span>
                        </div>
                      </div>

                      <div className="luxury-gem-price" style={{ marginBottom: '1.25rem' }}>
                        {language === 'en' ? l.priceEn : l.priceAr}
                      </div>

                      <span className="listing-view-btn" style={{ background: '#0b1e3d', color: 'white' }}>
                        {t('view_details')}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <section className="quality-guarantee-bar">
        <h3 className="quality-guarantee-text">
          {t('trust_bar_certified_title')} &amp; {language === 'en' ? 'Quality Guarantee' : 'ضمان الجودة'}
        </h3>
      </section>
    </div>
  );
}