import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import aboutHeroSapphire from '../assets/about_hero_sapphire.jpg';
import aboutHeroRuby from '../assets/about_hero_ruby.jpg';
import aboutHeroAlexandrite from '../assets/about_hero_alexandrite.jpg';

export default function About() {
  const { t, language } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = [
    { src: aboutHeroSapphire, title: 'Ceylon Blue Sapphire' },
    { src: aboutHeroRuby, title: 'Natural Flame Ruby' },
    { src: aboutHeroAlexandrite, title: 'Color-Changing Alexandrite' }
  ];

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="about-page-container">
      {/* 1. Split Hero Section with Gem Discovery Lightbox & Topographic Contours */}
      <section className="about-hero-grid">
        {/* SVG Topographic background line path art */}
        <svg className="about-grid-topo" viewBox="0 0 500 300" preserveAspectRatio="none">
          <path d="M-50,150 C100,50 250,250 400,100 C500,0 550,150 600,100" fill="none" stroke="rgba(197, 168, 92, 0.09)" strokeWidth="1.5" />
          <path d="M-50,180 C110,90 240,290 390,140 C490,40 540,190 600,140" fill="none" stroke="rgba(197, 168, 92, 0.05)" strokeWidth="1.5" />
          <path d="M-50,120 C90,20 260,220 410,70 C510,-30 560,120 600,70" fill="none" stroke="rgba(197, 168, 92, 0.05)" strokeWidth="1.5" />
        </svg>

        <div className="about-hero-copy">
          <span className="eyebrow">{t('about_eyebrow')}</span>
          <h1 className="about-hero-title">{t('about_title')}</h1>
          <p className="about-hero-intro">{t('about_intro')}</p>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/listings" className="btn btn-primary" style={{ textTransform: 'uppercase', fontSize: '0.88rem', letterSpacing: '0.05em' }}>
              {language === 'en' ? 'Explore Gems' : 'استكشف الأحجار'}
            </Link>
          </div>
        </div>

        {/* Mock Lightbox / Gallery Container */}
        <div className="about-discovery-box">
          <div className="about-discovery-header">
            <span>GEM DISCOVERY</span>
            <span style={{ cursor: 'pointer', opacity: 0.7 }}>&times;</span>
          </div>
          <div className="about-discovery-main">
            <button onClick={handlePrev} className="about-discovery-nav prev" aria-label="Previous image">
              &#10094;
            </button>
            <div className="about-discovery-img-frame">
              <img src={images[lightboxIndex].src} alt={images[lightboxIndex].title} className="about-discovery-img" />
            </div>
            <button onClick={handleNext} className="about-discovery-nav next" aria-label="Next image">
              &#10095;
            </button>
          </div>
          <div className="about-discovery-thumbnails">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`about-discovery-thumb-wrap ${lightboxIndex === idx ? 'active' : ''}`}
                onClick={() => setLightboxIndex(idx)}
              >
                <img src={img.src} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Who We Are Section (Realistic overlay cluster + details) */}
      <section className="about-who-we-are-section">
        <div className="about-who-we-are-left">
          <div className="about-gem-cluster-wrap">
            <div className="about-gem-cluster-photos">
              <div className="gem-photo-main-wrap">
                <img src={aboutHeroSapphire} alt="Main Sapphire" className="gem-photo-main" />
              </div>
              <img src={aboutHeroSapphire} alt="Sapphire Left" className="gem-photo-sub-1" />
              <img src={aboutHeroSapphire} alt="Sapphire Right" className="gem-photo-sub-2" />
              <img src={aboutHeroSapphire} alt="Sapphire Bottom Left" className="gem-photo-sub-3" />
              <img src={aboutHeroSapphire} alt="Sapphire Bottom Right" className="gem-photo-sub-4" />
            </div>
            
            {/* Curved text gold seal */}
            <div className="about-gold-seal">
              <svg viewBox="0 0 100 100" width="85" height="85">
                <circle cx="50" cy="50" r="45" fill="var(--color-primary)" stroke="#C5A85C" strokeWidth="2" strokeDasharray="3, 3" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#C5A85C" strokeWidth="1.5" />
                <path id="curve" d="M 22,50 A 28,28 0 1,1 78,50" fill="none" stroke="none" />
                <text fill="#C5A85C" fontSize="5.8" fontWeight="bold" letterSpacing="0.08em">
                  <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    CERTIFIED CEYLON
                  </textPath>
                </text>
                <text fill="#FFF" fontSize="6.8" fontWeight="bold" x="50%" y="58%" textAnchor="middle">
                  SAPPHIRE
                </text>
              </svg>
            </div>
          </div>
        </div>
        <div className="about-who-we-are-right">
          <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            {language === 'en' ? 'WHO WE ARE' : 'من نحن'}
          </span>
          <h2 style={{ fontSize: '1.95rem', margin: '0 0 1.25rem', fontFamily: 'var(--font-title)', color: 'var(--color-primary)' }}>
            {language === 'en' ? 'Who We Are' : 'من نحن'}
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--color-text-muted)', margin: 0 }}>
            {t('about_mission_desc')}
          </p>
        </div>
      </section>

      {/* 3. What Ceylon Gem Souq Is — and Isn't (Two Premium Cream Cards over Dark Contour Section) */}
      <section className="about-comparison-section-wrapper">
        {/* Topographic line paths behind cards */}
        <svg className="about-comparison-topo" viewBox="0 0 800 400" preserveAspectRatio="none">
          <path d="M-50,200 C150,100 350,350 550,150 C700,0 800,200 900,150" fill="none" stroke="rgba(197, 168, 92, 0.12)" strokeWidth="1.5" />
          <path d="M-50,240 C170,140 330,390 530,190 C680,40 780,240 900,190" fill="none" stroke="rgba(197, 168, 92, 0.08)" strokeWidth="1.5" />
          <path d="M-50,160 C130,60 370,310 570,110 C720,-40 820,160 900,110" fill="none" stroke="rgba(197, 168, 92, 0.08)" strokeWidth="1.5" />
        </svg>

        <div className="about-comparison-inner">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-title)', color: 'white', margin: 0 }}>
              {t('about_what_title')}
            </h3>
          </div>
          <div className="about-comparison-grid">
            <div className="about-comparison-card">
              <h4 className="about-comparison-header positive">{t('about_we_are')}</h4>
              <ul className="about-comparison-list">
                <li>
                  <span className="icon-wrap positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {t('we_are_item_1')}
                </li>
                <li>
                  <span className="icon-wrap positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {t('we_are_item_2')}
                </li>
                <li>
                  <span className="icon-wrap positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {t('we_are_item_3')}
                </li>
                <li>
                  <span className="icon-wrap positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {t('we_are_item_4')}
                </li>
              </ul>
            </div>

            <div className="about-comparison-card">
              <h4 className="about-comparison-header negative">{t('about_we_are_not')}</h4>
              <ul className="about-comparison-list">
                <li>
                  <span className="icon-wrap negative">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  {t('we_are_not_item_1')}
                </li>
                <li>
                  <span className="icon-wrap negative">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  {t('we_are_not_item_2')}
                </li>
                <li>
                  <span className="icon-wrap negative">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  {t('we_are_not_item_3')}
                </li>
                <li>
                  <span className="icon-wrap negative">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  {t('we_are_not_item_4')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Timeline (Connected 4 nodes with gold wavy connector) */}
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

        <div className="about-timeline-wrapper four-nodes">
          {/* Custom SVG path representing the wavy gold connector from mockup */}
          <svg className="about-timeline-wavy-path" viewBox="0 0 800 120" preserveAspectRatio="none">
            <path d="M 100,50 Q 200,10 300,50 T 500,50 T 700,50" fill="none" stroke="#C5A85C" strokeWidth="2.5" strokeDasharray="6, 6" />
          </svg>
          
          <div className="about-timeline-step">
            <span className="about-timeline-number">01</span>
            <div className="about-timeline-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <circle cx="10" cy="14" r="3" strokeWidth="1.5" />
                <line x1="12" y1="16" x2="16" y2="20" strokeWidth="2" />
              </svg>
            </div>
            <h4 className="about-timeline-step-title">{t('about_step1_title')}</h4>
            <p className="about-timeline-step-desc">{t('about_step1_desc')}</p>
          </div>

          <div className="about-timeline-step">
            <span className="about-timeline-number">02</span>
            <div className="about-timeline-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <rect x="15" y="14" width="7" height="5" rx="1.5" fill="var(--color-primary)" />
                <circle cx="18.5" cy="16.5" r="1" fill="#C5A85C" />
              </svg>
            </div>
            <h4 className="about-timeline-step-title">{t('about_step2_title')}</h4>
            <p className="about-timeline-step-desc">{t('about_step2_desc')}</p>
          </div>

          <div className="about-timeline-step">
            <span className="about-timeline-number">03</span>
            <div className="about-timeline-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <polyline points="16 11 18 13 22 9" stroke="#C5A85C" strokeWidth="2" />
              </svg>
            </div>
            <h4 className="about-timeline-step-title">{t('about_step3_title')}</h4>
            <p className="about-timeline-step-desc">{t('about_step3_desc')}</p>
          </div>

          <div className="about-timeline-step">
            <div className="about-timeline-badge-wrap">
              <svg viewBox="0 0 100 100" width="56" height="56">
                <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#C5A85C" />
                <polygon points="50,12 87,28 87,72 50,88 13,72 13,28" fill="var(--color-primary)" />
                <text fill="#C5A85C" fontSize="7" fontWeight="bold" x="50%" y="42%" textAnchor="middle">
                  SUCCESSFUL
                </text>
                <text fill="#FFF" fontSize="8" fontWeight="bold" x="50%" y="58%" textAnchor="middle">
                  TRADE
                </text>
                <path d="M40 70 L50 82 L60 70" fill="none" stroke="#C5A85C" strokeWidth="2" />
              </svg>
            </div>
            <h4 className="about-timeline-step-title" style={{ color: '#C5A85C' }}>
              {language === 'en' ? 'Direct Deal' : 'صفقة مباشرة'}
            </h4>
            <p className="about-timeline-step-desc">
              {language === 'en'
                ? 'Finalize payments and shipping terms directly with full safety.'
                : 'اتمام الدفع وتفاصيل الشحن مباشرة مع أمان تام.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Why Trust Matters Here Block with Vault/Safe Illustration */}
      <section
        style={{
          background: '#F9F6F0',
          padding: '3rem 2.5rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '4rem',
          border: '1px solid rgba(197, 168, 92, 0.2)',
          boxShadow: '0 8px 20px rgba(11,30,61,0.03)'
        }}
      >
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
            {/* Vault / Safe icon */}
            <rect x="10" y="10" width="60" height="60" rx="6" fill="#0b1e3d" stroke="#C5A85C" strokeWidth="2.5" />
            <circle cx="40" cy="40" r="14" fill="none" stroke="#C5A85C" strokeWidth="2.5" />
            <line x1="40" y1="15" x2="40" y2="26" stroke="#C5A85C" strokeWidth="2" />
            <line x1="40" y1="54" x2="40" y2="65" stroke="#C5A85C" strokeWidth="2" />
            <line x1="15" y1="40" x2="26" y2="40" stroke="#C5A85C" strokeWidth="2" />
            <line x1="54" y1="40" x2="65" y2="40" stroke="#C5A85C" strokeWidth="2" />
            <circle cx="40" cy="40" r="3" fill="#C5A85C" />
            <path d="M54 54 L68 68" stroke="#C5A85C" strokeWidth="3" strokeLinecap="round" />
            <circle cx="68" cy="68" r="4" fill="#C5A85C" />
          </svg>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <h3 style={{ fontSize: '1.7rem', marginBottom: '0.75rem', color: 'var(--color-primary)', fontFamily: 'var(--font-title)' }}>
              {t('about_trust_title')}
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
              {t('about_trust_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Accreditation Marquee (Navy Background Block) */}
      <section className="about-accreditation-section container-theme">
        <span className="eyebrow" style={{ color: '#C5A85C', justifyContent: 'center', marginBottom: '0.5rem' }}>
          {language === 'en' ? 'CERTIFICATION & TRUST' : 'الشهادات والتوثيق'}
        </span>
        <h3 className="about-accreditation-title" style={{ color: 'white', marginTop: 0 }}>
          {language === 'en' ? 'Accreditation Marquee' : 'هيئات الاعتماد والتوثيق'}
        </h3>
        <div className="about-accreditation-grid">
          <div className="about-accreditation-item theme-dark">
            <span className="about-accreditation-logo-text">GIA</span>
            <span className="about-accreditation-logo-sub">Gemological Institute of America</span>
          </div>
          <div className="about-accreditation-item theme-dark">
            <span className="about-accreditation-logo-text">NGJA</span>
            <span className="about-accreditation-logo-sub">National Gem & Jewellery Authority</span>
          </div>
          <div className="about-accreditation-item theme-dark">
            <span className="about-accreditation-logo-text">CIBJO</span>
            <span className="about-accreditation-logo-sub">World Jewellery Confederation</span>
          </div>
          <div className="about-accreditation-item theme-dark">
            <span className="about-accreditation-logo-text">SLA</span>
            <span className="about-accreditation-logo-sub">Sri Lanka Gem & Jewellery Association</span>
          </div>
        </div>
      </section>

      {/* 7. Platform Statistics Bar (Navy themed matching mockup) */}
      <div className="about-stats-bar secondary-theme">
        <div className="about-stats-item">
          <span className="about-stats-number">{t('about_stats_value_num')}</span>
          <span className="about-stats-label">{t('about_stats_value')}</span>
        </div>
        <div className="about-stats-divider" />
        <div className="about-stats-item">
          <span className="about-stats-number">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginInlineEnd: '0.4rem', color: 'var(--color-accent)' }}>
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="var(--color-accent)" />
            </svg>
            {t('about_stats_certified_num')}
          </span>
          <span className="about-stats-label">{t('about_stats_certified')}</span>
        </div>
        <div className="about-stats-divider" />
        <div className="about-stats-item">
          <span className="about-stats-number">{t('about_stats_listings_num')}</span>
          <span className="about-stats-label">{t('about_stats_listings')}</span>
        </div>
        <div className="about-stats-divider" />
        <div className="about-stats-item">
          <span className="about-stats-number">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginInlineEnd: '0.4rem', color: 'var(--color-accent)' }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {t('about_stats_varieties_num')}
          </span>
          <span className="about-stats-label">{t('about_stats_varieties')}</span>
        </div>
      </div>
    </div>
  );
}
