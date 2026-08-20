import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import PageHero from '../components/PageHero';

export default function Contact() {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const emailVal = settings?.supportEmail || 'info@ceylongemsouq.com';
  const qatarPhoneVal = settings?.qatarPhone || '+974 4444 5566';
  const sriLankaPhoneVal = settings?.sriLankaPhone || '+94 11 222 3344';
  const qatarAddressVal = settings?.qatarAddress || 'West Bay, Doha, Qatar';
  const sriLankaAddressVal = settings?.sriLankaAddress || 'Colombo, Sri Lanka';

  const cards = [
    {
      label: t('contact_email_label'),
      value: emailVal,
      href: `mailto:${emailVal}`,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
    {
      label: `${t('contact_office_label')} (${t('contact_region_qatar')})`,
      value: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div>{qatarAddressVal}</div>
          {qatarPhoneVal && (
            <a href={`tel:${qatarPhoneVal.replace(/\s/g, '')}`} style={{ color: 'var(--color-accent)', fontWeight: '650', fontSize: '0.9rem' }}>
              📞 {qatarPhoneVal}
            </a>
          )}
        </div>
      ),
      href: null,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      )
    },
    {
      label: `${t('contact_office_label')} (${t('contact_region_srilanka')})`,
      value: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div>{sriLankaAddressVal}</div>
          {sriLankaPhoneVal && (
            <a href={`tel:${sriLankaPhoneVal.replace(/\s/g, '')}`} style={{ color: 'var(--color-accent)', fontWeight: '650', fontSize: '0.9rem' }}>
              📞 {sriLankaPhoneVal}
            </a>
          )}
        </div>
      ),
      href: null,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    }
  ];

  return (
    <div>
      <PageHero
        eyebrow={t('contact_eyebrow')}
        title={t('contact_title')}
        subtitle={t('contact_desc')}
      />

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '3.5rem' }}>
        {cards.map((c) => (
          <div key={c.label} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.08)' }}>
              {c.icon}
            </div>
            <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem', fontSize: '0.7rem' }}>
              {c.label}
            </div>
            {c.href ? (
              <a href={c.href} style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '1.05rem', wordBreak: 'break-all' }}>
                {c.value}
              </a>
            ) : (
              <div style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '1.05rem', lineHeight: '1.4' }}>
                {c.value}
              </div>
            )}
          </div>
        ))}
      </div>

      <section className="card" style={{ maxWidth: '640px', margin: '0 auto', padding: '2.5rem' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>{t('contact_success_title')}</h3>
            <p>{t('contact_success_desc')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{t('contact_form_name')}</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">{t('contact_form_email')}</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">{t('contact_form_subject')}</label>
              <input name="subject" value={form.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">{t('contact_form_message')}</label>
              <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {t('contact_form_submit')}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
