import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const steps = [
    { n: '01', title: t('about_step1_title'), desc: t('about_step1_desc') },
    { n: '02', title: t('about_step2_title'), desc: t('about_step2_desc') },
    { n: '03', title: t('about_step3_title'), desc: t('about_step3_desc') },
  ];

  return (
    <div>
      {/* Intro */}
      <section style={{ maxWidth: '760px', margin: '0 auto 4rem', textAlign: 'center' }}>
        <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
          {t('about_eyebrow')}
        </span>
        <h1 style={{ fontSize: '2.4rem', lineHeight: 1.2, marginBottom: '1.5rem' }}>
          {t('about_title')}
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>{t('about_intro')}</p>
      </section>

      {/* What we are / aren't */}
      <section
        className="card"
        style={{
          maxWidth: '880px',
          margin: '0 auto 4rem',
          padding: '2.5rem 3rem',
          background: 'var(--color-primary)',
          border: 'none',
        }}
      >
        <h3 style={{ color: 'var(--color-accent)', fontSize: '1.5rem', marginBottom: '1rem' }}>
          {t('about_what_title')}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem', lineHeight: 1.8 }}>
          {t('about_what_desc')}
        </p>
      </section>

      {/* How it works */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
            How It Works
          </span>
          <h3 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>
            {t('about_step1_title')} &rarr; {t('about_step2_title')} &rarr; {t('about_step3_title')}
          </h3>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {steps.map((step) => (
            <div
              key={step.n}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', padding: '2.25rem 2rem' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: 'var(--color-accent-light)',
                  lineHeight: 1,
                  marginBottom: '1rem',
                }}
              >
                {step.n}
              </span>
              <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '0.6rem' }}>
                {step.title}
              </h4>
              <p style={{ fontSize: '0.95rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
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

      {/* CTA */}
      <section
        className="hero"
        style={{ gridTemplateColumns: '1fr', textAlign: 'center', padding: '3.5rem 2rem' }}
      >
        <div className="hero-copy" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.1rem' }}>{t('about_cta_title')}</h2>
          <p style={{ margin: '0 auto 2rem' }}>{t('about_cta_desc')}</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/register?role=owner" className="btn btn-primary">
              {t('join_as_owner')}
            </Link>
            <Link to="/listings" className="btn btn-outline" style={{ borderColor: '#FFF', color: '#FFF' }}>
              {t('browse_listings')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
