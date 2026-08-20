import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { GemIllustration } from '../components/GemVisual';
import lapisLazuliBg from '../assets/lapis_lazuli_bg.jpg';

export default function Home() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [featured, setFeatured] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get('/listings')
      .then(({ data }) => {
        if (cancelled) return;
        // Certified listings first (stronger trust signal), then newest —
        // these are real, live approved listings, not placeholder content.
        const sorted = [...data].sort((a, b) => {
          const aCert = a.certification?.issuer ? 1 : 0;
          const bCert = b.certification?.issuer ? 1 : 0;
          if (aCert !== bCert) return bCert - aCert;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setFeatured(sorted.slice(0, 3));
      })
      .catch(() => {
        if (!cancelled) setFeatured([]);
      })
      .finally(() => {
        if (!cancelled) setFeaturedLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // SVG representation of gemstones for visual excellence
  const gemSVGs = {
    sapphire: (
      <svg viewBox="0 0 100 100" width="80" height="80" style={{ filter: 'drop-shadow(0 8px 12px rgba(11, 80, 200, 0.35))' }}>
        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="#0D47A1" />
        <polygon points="50,5 50,95 10,30 90,30" fill="rgba(255,255,255,0.15)" />
        <polygon points="50,25 75,40 75,60 50,75 25,60 25,40" fill="#1E88E5" />
        <polygon points="50,5 50,25 90,30 75,40" fill="rgba(255,255,255,0.25)" />
        <polygon points="10,70 25,60 50,95 50,75" fill="rgba(0,0,0,0.2)" />
      </svg>
    ),
    catseye: (
      <svg viewBox="0 0 100 100" width="80" height="80" style={{ filter: 'drop-shadow(0 8px 12px rgba(160, 180, 10, 0.35))' }}>
        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="#5D4037" />
        <ellipse cx="50" cy="50" rx="35" ry="25" fill="#AFB42B" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="#FFF" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
        <ellipse cx="50" cy="50" rx="35" ry="10" fill="rgba(255,255,255,0.1)" transform="rotate(-15 50 50)" />
      </svg>
    ),
    moonstone: (
      <svg viewBox="0 0 100 100" width="80" height="80" style={{ filter: 'drop-shadow(0 8px 12px rgba(130, 200, 230, 0.35))' }}>
        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="#90A4AE" />
        <circle cx="50" cy="50" r="30" fill="#E0F7FA" />
        <circle cx="42" cy="42" r="26" fill="rgba(255,255,255,0.4)" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.6" />
      </svg>
    ),
    spinel: (
      <svg viewBox="0 0 100 100" width="80" height="80" style={{ filter: 'drop-shadow(0 8px 12px rgba(220, 20, 60, 0.35))' }}>
        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="#880E4F" />
        <polygon points="50,15 80,35 80,65 50,85 20,65 20,35" fill="#AD1457" />
        <polygon points="50,15 50,85 20,35 80,35" fill="rgba(255,255,255,0.1)" />
        <polygon points="50,30 65,45 50,60 35,45" fill="#EC407A" />
      </svg>
    ),
    alexandrite: (
      <svg viewBox="0 0 100 100" width="80" height="80" style={{ filter: 'drop-shadow(0 8px 12px rgba(0, 150, 136, 0.35))' }}>
        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="#004D40" />
        <polygon points="50,5 50,95 10,70 90,70" fill="rgba(255,255,255,0.08)" />
        <polygon points="50,22 72,38 72,62 50,78 28,62 28,38" fill="#00897B" />
        <polygon points="50,35 60,48 50,61 40,48" fill="#26A69A" />
        <polygon points="50,5 50,22 90,30 72,38" fill="rgba(128,0,128,0.2)" /> {/* Shows color change effect */}
      </svg>
    ),
    ruby: (
      <svg viewBox="0 0 100 100" width="80" height="80" style={{ filter: 'drop-shadow(0 8px 12px rgba(220, 20, 60, 0.45))' }}>
        <polygon points="50,5 95,40 50,95 5,40" fill="#B71C1C" />
        <polygon points="50,20 80,45 50,80 20,45" fill="#E53935" />
        <polygon points="50,5 50,95 5,40 95,40" fill="rgba(255,255,255,0.15)" />
        <polygon points="50,30 65,45 50,60 35,45" fill="#FF5252" />
      </svg>
    ),
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(11, 30, 61, 0.95) 0%, rgba(11, 30, 61, 0.75) 50%, rgba(11, 30, 61, 0.3) 100%), url(${lapisLazuliBg})` 
        }}
      >
        <div className="hero-copy">
          <span className="eyebrow" style={{ color: '#C5A85C' }}>
            {language === 'en' ? 'Colombo \u21CC Doha \u00B7 Direct Trade' : 'كولومبو \u21CC الدوحة \u00B7 تجارة مباشرة'}
          </span>
          <h2>
            {language === 'en' ? (
              <>Ceylon's finest gems, <em style={{ color: '#C5A85C', fontStyle: 'normal' }}>cut for a direct trade</em></>
            ) : (
              t('hero_title')
            )}
          </h2>
          <p style={{ color: '#f1f5f9' }}>{t('hero_subtitle')}</p>
          <p style={{ fontSize: '1rem', opacity: 0.85, maxWidth: '460px', color: '#cbd5e1' }}>{t('hero_desc')}</p>

          <div className="hero-actions">
            <Link to="/listings" className="btn btn-primary" style={{ background: '#C5A85C', color: '#0b1e3d' }}>
              {t('browse_listings')}
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-outline" style={{ borderColor: '#C5A85C', color: '#C5A85C' }}>
                {t('hero_join_cta')}
              </Link>
            )}
          </div>
        </div>

        <div className="hero-gem-wrapper">
          {/* Overlapping Golden Geometric Triangles (Design Reference #4) */}
          <svg className="gold-triangle-frame" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fcedc0" />
                <stop offset="50%" stop-color="#C5A85C" />
                <stop offset="100%" stop-color="#80540d" />
              </linearGradient>
            </defs>
            <polygon points="150,20 280,250 20,250" fill="none" stroke="url(#gold-grad)" strokeWidth="2" opacity="0.8" />
            <polygon points="150,280 20,50 280,50" fill="none" stroke="url(#gold-grad)" strokeWidth="1.2" opacity="0.5" />
            <polygon points="150,80 230,220 70,220" fill="none" stroke="url(#gold-grad)" strokeWidth="0.8" opacity="0.3" />
            <line x1="150" y1="20" x2="150" y2="280" stroke="url(#gold-grad)" strokeWidth="0.8" strokeDasharray="3" opacity="0.4" />
            <circle cx="150" cy="20" r="4" fill="url(#gold-grad)" />
            <circle cx="280" cy="250" r="4" fill="url(#gold-grad)" />
            <circle cx="20" cy="250" r="4" fill="url(#gold-grad)" />
          </svg>

          <div className="hero-gem">
            <svg viewBox="0 0 220 240" width="230" height="250" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.55))' }}>
              <polygon points="110,8 205,58 205,182 110,232 15,182 15,58" fill="#0D47A1" />
              <polygon points="110,8 110,232 15,58 205,58" fill="rgba(255,255,255,0.12)" />
              <polygon points="110,55 168,90 168,150 110,185 52,150 52,90" fill="#1E88E5" />
              <polygon points="110,8 110,55 205,58 168,90" fill="rgba(255,255,255,0.28)" />
              <polygon points="15,182 52,150 110,232 110,185" fill="rgba(0,0,0,0.25)" />
              <polygon points="110,90 140,110 140,150 110,170 80,150 80,110" fill="rgba(255,255,255,0.35)" />
            </svg>
          </div>
        </div>
      </section>

      {/* Trust Bar — new navy strip directly under the hero */}
      <div className="trust-bar">
        <div className="trust-bar-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <div>
            <h5>{t('trust_bar_certified_title')}</h5>
            <p>{t('trust_bar_certified_desc')}</p>
          </div>
        </div>
        <div className="trust-bar-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            <path d="M2 12h20"/>
          </svg>
          <div>
            <h5>{t('trust_bar_origin_title')}</h5>
            <p>{t('trust_bar_origin_desc')}</p>
          </div>
        </div>
        <div className="trust-bar-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 3 4 4-4 4"/>
            <path d="M20 7H4"/>
            <path d="m8 21-4-4 4-4"/>
            <path d="M4 17h16"/>
          </svg>
          <div>
            <h5>{t('trust_bar_direct_title')}</h5>
            <p>{t('trust_bar_direct_desc')}</p>
          </div>
        </div>
        <div className="trust-bar-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <div>
            <h5>{t('trust_bar_trusted_title')}</h5>
            <p>{t('trust_bar_trusted_desc')}</p>
          </div>
        </div>
      </div>

      {/* Trust Factors */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
            {language === 'en' ? 'Why Ceylon Gem Souq' : 'لماذا سوق أحجار سيلان الكريمة'}
          </span>
          <h3 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{t('trust_title')}</h3>
        </div>
        <div className="grid">
          <div className="card luxury-frame-card" style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h4 style={{ marginBottom: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: '600' }}>
              Direct Trade Model
            </h4>
            <p style={{ fontSize: '0.95rem' }}>{t('trust_desc_1')}</p>
          </div>
          <div className="card luxury-frame-card" style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h4 style={{ marginBottom: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: '600' }}>
              Verified Listings
            </h4>
            <p style={{ fontSize: '0.95rem' }}>{t('trust_desc_2')}</p>
          </div>
          <div className="card luxury-frame-card" style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h4 style={{ marginBottom: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: '600' }}>
              Secure & Private E-Commerce
            </h4>
            <p style={{ fontSize: '0.95rem' }}>{t('trust_desc_3')}</p>
          </div>
        </div>
      </section>

      {/* Specialties Highlight */}
      <section className="home-specialties-section">
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem', color: '#C5A85C' }}>
            {language === 'en' ? 'The Island\'s Specialties' : 'مختصون بأحجار الجزيرة'}
          </span>
          <h3 style={{ fontSize: '2rem', marginTop: '0.5rem', color: 'white' }}>{t('specialties_title')}</h3>
        </div>
        <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', color: '#a3b3cc' }}>
          {t('specialties_desc')}
        </p>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {/* Sapphires */}
          <div className="card luxury-specialty-card">
            <div style={{ marginBottom: '1.5rem' }}>{gemSVGs.sapphire}</div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: '0.5rem', color: '#C5A85C' }}>
              {t('filter_sapphire')}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#a3b3cc' }}>
              {language === 'en' 
                ? "The world-renowned Royal Blue and Cornflower Sapphires of Ceylon, famed for clarity and color saturation."
                : "الياقوت الأزرق الملكي السيلاني المشهور عالمياً، المعروف بنقائه وشدة لمعانه."}
            </p>
          </div>

          {/* Cat's Eye */}
          <div className="card luxury-specialty-card">
            <div style={{ marginBottom: '1.5rem' }}>{gemSVGs.catseye}</div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: '0.5rem', color: '#C5A85C' }}>
              {t('filter_catseye')}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#a3b3cc' }}>
              {language === 'en'
                ? "Chrysoberyl Cat's Eye with a sharp, prominent silvery slit of chatoyancy shimmering across the gem's dome."
                : "حجر عين الهر ذو شق بريق فضي حاد يتحرك بمرونة على قمة سطح الحجر الأملس."}
            </p>
          </div>

          {/* Moonstones */}
          <div className="card luxury-specialty-card">
            <div style={{ marginBottom: '1.5rem' }}>{gemSVGs.moonstone}</div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: '0.5rem', color: '#C5A85C' }}>
              {t('filter_moonstone')}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#a3b3cc' }}>
              {language === 'en'
                ? "High-grade translucent moonstones showing a mystical blue sheen, sourced from the mines of Meetiyagoda."
                : "أحجار قمرية شفافة عالية الجودة تعكس وهجاً أزرقاً ساحراً، مستخرجة من مناجم ميتياغودا."}
            </p>
          </div>

          {/* Spinels */}
          <div className="card luxury-specialty-card">
            <div style={{ marginBottom: '1.5rem' }}>{gemSVGs.spinel}</div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: '0.5rem', color: '#C5A85C' }}>
              {t('filter_spinel')}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#a3b3cc' }}>
              {language === 'en'
                ? "Natural Sri Lankan spinels available in hot pink, ruby red, and purple shades, loved for high refractive index."
                : "السبينيل السريلانكي الطبيعي المتوفر باللون الوردي الزاهي والأحمر والأرجواني، محبوب لمعامل انكساره العالي."}
            </p>
          </div>

          {/* Alexandrites */}
          <div className="card luxury-specialty-card">
            <div style={{ marginBottom: '1.5rem' }}>{gemSVGs.alexandrite}</div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: '0.5rem', color: '#C5A85C' }}>
              {t('filter_alexandrite')}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#a3b3cc' }}>
              {language === 'en'
                ? "Extremely rare color-changing chrysoberyl, shifting from green in daylight to raspberry red in incandescent light."
                : "ألكسندريت فائق الندرة يتغير لونه بالكامل من الأخضر نهاراً إلى الأخضر الداكن تحت الإضاءة الصناعية."}
            </p>
          </div>

          {/* Rubies */}
          <div className="card luxury-specialty-card">
            <div style={{ marginBottom: '1.5rem' }}>{gemSVGs.ruby}</div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: '0.5rem', color: '#C5A85C' }}>
              {t('filter_ruby')}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#a3b3cc' }}>
              {language === 'en'
                ? "Ceylon natural red rubies, rare and highly coveted, boasting delicate pinkish-red hues and fine brilliance."
                : "الياقوت الأحمر السيلاني الطبيعي، نادر ومطلوب للغاية، يتميز بظلال حمراء وردية خفيفة وبريق رائع."}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Gemstones — real, live listings, not placeholder content */}
      <section style={{ margin: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
            {t('featured_eyebrow')}
          </span>
          <h3 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
            {t('featured_title')}
          </h3>
          <p style={{ maxWidth: '560px', margin: '0 auto' }}>{t('featured_subtitle')}</p>
        </div>

        {featuredLoading ? (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: '320px', borderRadius: 'var(--radius-md)' }} />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="card" style={{ maxWidth: '560px', margin: '0 auto', padding: '2.5rem', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '0.75rem' }}>{t('featured_empty_title')}</h4>
            <p style={{ marginBottom: '1.5rem' }}>{t('featured_empty_desc')}</p>
            <Link to="/listings" className="btn btn-outline">
              {t('featured_view_all')}
            </Link>
          </div>
        ) : (
          <>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              {featured.map((l) => (
                <Link to={`/listings/${l._id}`} key={l._id} className="card gem-card">
                  <div className="gem-card-img-wrapper">
                    {l.images && l.images[0] ? (
                      <img src={l.images[0]} alt={l.title} className="gem-card-image" />
                    ) : (
                      <GemIllustration gemType={l.gemType} height={200} />
                    )}
                    {l.certification?.issuer && (
                      <span className="gem-card-certified-badge">&#10003; {t('badge_certified')}</span>
                    )}
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                      {l.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      {t(`filter_${l.gemType}`)} &middot; {l.weightCt} ct
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                        ${l.priceUSD.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                        {t('view_details')} &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link to="/listings" className="btn btn-outline">
                {t('featured_view_all')}
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
