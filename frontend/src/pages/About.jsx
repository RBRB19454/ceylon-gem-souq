import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import aboutHeroSapphire from '../assets/about_hero_sapphire.jpg';

export default function About() {
  const { t, language } = useLanguage();

  const steps = [
    { n: '01', title: t('about_step1_title'), desc: t('about_step1_desc') },
    { n: '02', title: t('about_step2_title'), desc: t('about_step2_desc') },
    { n: '03', title: t('about_step3_title'), desc: t('about_step3_desc') },
  ];

  return (
    <div className="about-page-container">
      {/* 1. Split Hero Section */}
      <section className="about-hero-grid">
        <div className="about-hero-copy">
          <span className="eyebrow">{t('about_eyebrow')}</span>
          <h1 className="about-hero-title">{t('about_title')}</h1>
          <p className="about-hero-intro">{t('about_intro')}</p>
        </div>
        <div className="about-hero-image-wrap">
          <img src={aboutHeroSapphire} alt="Ceylon Blue Sapphire" className="about-hero-image" />
        </div>
      </section>

      {/* 2. Vision & Mission Side-by-Side Cards */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div className="card" style={{ padding: '2.25rem' }}>
            <div className="about-card-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16,8 13,13 8,16 11,11" fill="var(--color-accent)" stroke="none" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{t('about_vision_title')}</h3>
            <p style={{ fontSize: '0.98rem', lineHeight: 1.75 }}>{t('about_vision_desc')}</p>
          </div>

          <div className="card" style={{ padding: '2.25rem' }}>
            <div className="about-card-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.2" fill="var(--color-accent)" stroke="none" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{t('about_mission_title')}</h3>
            <p style={{ fontSize: '0.98rem', lineHeight: 1.75 }}>{t('about_mission_desc')}</p>
          </div>
        </div>
      </section>

      {/* 3. What Ceylon Gem Souq Is — and Isn't (Split Table Card) */}
      <section className="about-comparison-box">
        <h3 className="about-comparison-title">{t('about_what_title')}</h3>
        <div className="about-comparison-grid">
          <div className="about-comparison-col">
            <h4 className="about-comparison-col-header positive">{t('about_we_are')}</h4>
            <ul className="about-comparison-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-check">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t('we_are_item_1')}
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-check">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t('we_are_item_2')}
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-check">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t('we_are_item_3')}
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-check">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t('we_are_item_4')}
              </li>
            </ul>
          </div>
          <div className="about-comparison-divider-line" />
          <div className="about-comparison-col">
            <h4 className="about-comparison-col-header negative">{t('about_we_are_not')}</h4>
            <ul className="about-comparison-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-cross">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                {t('we_are_not_item_1')}
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-cross">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                {t('we_are_not_item_2')}
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-cross">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                {t('we_are_not_item_3')}
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-cross">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                {t('we_are_not_item_4')}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. How It Works Timeline */}
      <section className="about-timeline-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
            {language === 'en' ? 'How It Works' : 'كيف يعمل الموقع'}
          </span>
          <h3 className="about-timeline-title">
            {language === 'en'
              ? 'List & Verify \u2192 Connect Directly \u2192 Trade With Confidence'
              : 'اعرض وتحقق \u2190 تواصل مباشرة \u2190 تداول بثقة'}
          </h3>
        </div>

        <div className="about-timeline-wrapper">
          <div className="about-timeline-connector" />
          
          <div className="about-timeline-step">
            <span className="about-timeline-number">01</span>
            <div className="about-timeline-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h4 className="about-timeline-step-title">{t('about_step1_title')}</h4>
            <p className="about-timeline-step-desc">{t('about_step1_desc')}</p>
          </div>

          <div className="about-timeline-step">
            <span className="about-timeline-number">02</span>
            <div className="about-timeline-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h4 className="about-timeline-step-title">{t('about_step2_title')}</h4>
            <p className="about-timeline-step-desc">{t('about_step2_desc')}</p>
          </div>

          <div className="about-timeline-step">
            <span className="about-timeline-number">03</span>
            <div className="about-timeline-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h4 className="about-timeline-step-title">{t('about_step3_title')}</h4>
            <p className="about-timeline-step-desc">{t('about_step3_desc')}</p>
          </div>
        </div>
      </section>

      {/* 5. Why Trust Matters Here Block */}
      <section
        style={{
          background: 'rgba(11,30,61,0.02)',
          padding: '3rem 2.5rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '4rem',
        }}
      >
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <svg width="72" height="80" viewBox="0 0 72 80" style={{ flexShrink: 0 }}>
            <polygon points="36,2 70,20 70,60 36,78 2,60 2,20" fill="none" stroke="#D4AF37" strokeWidth="3" />
            <path d="M20 38 L32 50 L52 26" fill="none" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <h3 style={{ fontSize: '1.7rem', marginBottom: '0.75rem' }}>{t('about_trust_title')}</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8 }}>{t('about_trust_desc')}</p>
          </div>
        </div>
      </section>

      {/* 6. Accreditation Marquee */}
      <section className="about-accreditation-section">
        <h3 className="about-accreditation-title">
          {language === 'en' ? 'Accreditation Marquee' : 'هيئات الاعتماد والتوثيق'}
        </h3>
        <div className="about-accreditation-grid">
          <div className="about-accreditation-item">
            <span className="about-accreditation-logo-text">GIA</span>
            <span className="about-accreditation-logo-sub">Gemological Institute of America</span>
          </div>
          <div className="about-accreditation-item">
            <span className="about-accreditation-logo-text">NGJA</span>
            <span className="about-accreditation-logo-sub">National Gem & Jewellery Authority</span>
          </div>
          <div className="about-accreditation-item">
            <span className="about-accreditation-logo-text">CIBJO</span>
            <span className="about-accreditation-logo-sub">World Jewellery Confederation</span>
          </div>
          <div className="about-accreditation-item">
            <span className="about-accreditation-logo-text">SLA</span>
            <span className="about-accreditation-logo-sub">Sri Lanka Gem & Jewellery Association</span>
          </div>
        </div>
      </section>

      {/* 7. Platform Statistics Bar */}
      <div className="about-stats-bar">
        <div className="about-stats-item">
          <span className="about-stats-number">{t('about_stats_value_num')}</span>
          <span className="about-stats-label">{t('about_stats_value')}</span>
        </div>
        <div className="about-stats-divider" />
        <div className="about-stats-item">
          <span className="about-stats-number">{t('about_stats_certified_num')}</span>
          <span className="about-stats-label">{t('about_stats_certified')}</span>
        </div>
        <div className="about-stats-divider" />
        <div className="about-stats-item">
          <span className="about-stats-number">{t('about_stats_listings_num')}</span>
          <span className="about-stats-label">{t('about_stats_listings')}</span>
        </div>
        <div className="about-stats-divider" />
        <div className="about-stats-item">
          <span className="about-stats-number">{t('about_stats_varieties_num')}</span>
          <span className="about-stats-label">{t('about_stats_varieties')}</span>
        </div>
      </div>
    </div>
  );
}
