import { useLanguage } from '../context/LanguageContext';
import PageHero from '../components/PageHero';

export default function Certifications() {
  const { t } = useLanguage();

  const labs = [
    { key: 'gia', name: 'GIA', full: 'Gemological Institute of America' },
    { key: 'grs', name: 'GRS', full: 'GemResearch Swisslab' },
    { key: 'ssef', name: 'SSEF', full: 'Swiss Gemmological Institute' },
    { key: 'ngja', name: 'NGJA', full: 'National Gem & Jewellery Authority, Sri Lanka' },
  ];

  return (
    <div>
      <PageHero
        eyebrow={t('certs_eyebrow')}
        title={t('certs_title')}
        subtitle={t('certs_intro')}
      />

      <section
        className="card"
        style={{ maxWidth: '820px', margin: '0 auto 2.5rem', padding: '2rem 2.5rem' }}
      >
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>{t('certs_required_title')}</h3>
        <p style={{ lineHeight: 1.75 }}>{t('certs_required_desc')}</p>
      </section>

      <section style={{ maxWidth: '820px', margin: '0 auto 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{t('certs_labs_title')}</h3>
          <p style={{ lineHeight: 1.75 }}>{t('certs_labs_desc')}</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {labs.map((lab) => (
            <div key={lab.key} className="card" style={{ padding: '1.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-title)',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  color: 'var(--color-primary)',
                }}
              >
                {lab.name}
              </span>
              <p style={{ fontSize: '0.9rem', marginTop: '0.35rem', marginBottom: '0.75rem', fontWeight: 500 }}>
                {lab.full}
              </p>
              <p style={{ fontSize: '0.9rem' }}>{t(`certs_lab_${lab.key}_desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="card"
        style={{ maxWidth: '820px', margin: '0 auto', padding: '2rem 2.5rem', background: 'var(--color-primary)' }}
      >
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--color-accent)' }}>
          {t('certs_role_title')}
        </h3>
        <p style={{ lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{t('certs_role_desc')}</p>
      </section>
    </div>
  );
}
