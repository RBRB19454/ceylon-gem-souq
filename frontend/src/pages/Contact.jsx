import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import contactMap from '../assets/contact_map.jpg';
 
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
  const qatarPhoneVal = settings?.qatarPhone || '+974 3335 4354';
  const sriLankaPhoneVal = settings?.sriLankaPhone || '+94 11 222 2244';
  const qatarAddressVal = settings?.qatarAddress || 'West Bay, Doha, Qatar';
  const sriLankaAddressVal = settings?.sriLankaAddress || 'Colombo, Sri Lanka';
 
  const handleMapClick = () => {
    window.open('https://maps.google.com', '_blank');
  };
 
  return (
    <div className="contact-page-outer">
      {/* Premium Hero Section */}
      <section className="contact-hero-container">
        <div className="contact-hero-grid">
          <div className="contact-hero-left">
            <span className="contact-eyebrow">{t('contact_eyebrow')}</span>
            <h1 className="contact-hero-title">
              {t('contact_hero_prefix')} <span>Ceylon Gem Souq</span> {t('contact_hero_suffix')}
            </h1>
            <p className="contact-hero-desc">{t('contact_desc')}</p>
            <div className="contact-ticks">
              <div className="contact-tick-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{t('contact_tick_listings')}</span>
              </div>
              <div className="contact-tick-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{t('contact_tick_trading')}</span>
              </div>
              <div className="contact-tick-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{t('contact_tick_partner')}</span>
              </div>
            </div>
          </div>
          <div className="contact-hero-right" />
        </div>
 
        {/* 3 Info Cards block */}
        <div className="contact-info-grid-wrapper">
          <div className="contact-info-grid">
            {/* Card 1: Email */}
            <div className="contact-info-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-card-label">{t('contact_card_email_label')}</div>
              <div className="contact-card-value">
                <a href={`mailto:${emailVal}`}>{emailVal}</a>
              </div>
            </div>
 
            {/* Card 2: Doha */}
            <div className="contact-info-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="contact-card-label">{t('contact_card_qatar_label')}</div>
              <div className="contact-card-value" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <span>{qatarAddressVal}</span>
                <a href={`tel:${qatarPhoneVal.replace(/\s/g, '')}`} style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>
                  {qatarPhoneVal}
                </a>
              </div>
            </div>
 
            {/* Card 3: Colombo */}
            <div className="contact-info-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className="contact-card-label">{t('contact_card_srilanka_label')}</div>
              <div className="contact-card-value" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <span>{sriLankaAddressVal}</span>
                <a href={`tel:${sriLankaPhoneVal.replace(/\s/g, '')}`} style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>
                  {sriLankaPhoneVal}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Light Satin Section (Send Message) */}
      <section className="contact-form-section">
        <div className="contact-form-card-wrapper">
          <div className="contact-form-card">
            {/* Left Side */}
            <div className="contact-form-left">
              <div className="contact-form-title-group">
                <h2>{t('contact_form_left_title_prefix')} <span>{t('contact_form_left_title_highlight')}</span></h2>
                <p>{t('contact_form_left_subtitle')}</p>
              </div>
              <div className="contact-form-left-divider">
                <span className="line" />
                <span className="diamond" />
                <span className="line" />
              </div>
              <div className="contact-form-values-list">
                <div className="contact-form-value-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="6 2 18 2 21 6 12 22 3 6 6 2" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="12" y1="22" x2="12" y2="2" />
                  </svg>
                  <span>{t('contact_value_authentic')}</span>
                </div>
                <div className="contact-form-value-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>{t('contact_value_trusted')}</span>
                </div>
                <div className="contact-form-value-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{t('contact_value_reach')}</span>
                </div>
              </div>
            </div>
 
            {/* Right Side */}
            <div className="contact-form-right">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-primary)' }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" style={{ marginBottom: '1.25rem' }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-title)', marginBottom: '0.75rem', fontWeight: '500' }}>
                    {t('contact_success_title')}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.5' }}>
                    {t('contact_success_desc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-light-form">
                  <div className="form-group">
                    <label className="form-label">{t('contact_form_name')}</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input name="name" value={form.name} onChange={handleChange} required />
                    </div>
                  </div>
 
                  <div className="form-group">
                    <label className="form-label">{t('contact_form_email')}</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                        </svg>
                      </span>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
 
                  <div className="form-group">
                    <label className="form-label">{t('contact_form_subject')}</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </span>
                      <input name="subject" value={form.subject} onChange={handleChange} required />
                    </div>
                  </div>
 
                  <div className="form-group">
                    <label className="form-label">{t('contact_form_message')}</label>
                    <div className="input-wrapper">
                      <span className="input-icon" style={{ top: '1rem', transform: 'none' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </span>
                      <textarea name="message" rows="4" value={form.message} onChange={handleChange} required />
                    </div>
                  </div>
 
                  <button type="submit" className="login-gradient-btn" style={{ border: 'none', width: '100%', marginTop: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginInlineEnd: '0.4rem' }}>
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    {t('contact_form_submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
 
        {/* Bottom Trust Strip */}
        <div className="contact-trust-strip-wrapper">
          <div className="contact-trust-strip">
            <div className="login-trust-item">
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h4>{t('contact_trust_secure_title')}</h4>
                <p>{t('contact_trust_secure_desc')}</p>
              </div>
            </div>
            <div className="login-trust-item">
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="6 2 18 2 21 6 12 22 3 6 6 2" />
                </svg>
              </div>
              <div>
                <h4>{t('contact_trust_verified_title')}</h4>
                <p>{t('contact_trust_verified_desc')}</p>
              </div>
            </div>
            <div className="login-trust-item">
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <div>
                <h4>{t('contact_trust_region_title')}</h4>
                <p>{t('contact_trust_region_desc')}</p>
              </div>
            </div>
            <div className="login-trust-item">
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4>{t('contact_trust_response_title')}</h4>
                <p>{t('contact_trust_response_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Office Locations Section — text labels left, image + corner button right */}
      <section className="contact-map-section">
        <div className="contact-office-split">
          <div className="contact-office-split-left">
            <span className="contact-eyebrow">{t('contact_offices_title')}</span>
            <h2>{t('contact_offices_subtitle')}</h2>

            <div className="contact-office-row">
              <span className="contact-office-row-label">{t('contact_offices_qatar_short')}</span>
              <div className="contact-office-row-details">
                <p>{qatarAddressVal}</p>
                <a href={`tel:${qatarPhoneVal.replace(/\s/g, '')}`}>{qatarPhoneVal}</a>
              </div>
            </div>

            <div className="contact-office-row">
              <span className="contact-office-row-label">{t('contact_offices_srilanka_short')}</span>
              <div className="contact-office-row-details">
                <p>{sriLankaAddressVal}</p>
                <a href={`tel:${sriLankaPhoneVal.replace(/\s/g, '')}`}>{sriLankaPhoneVal}</a>
              </div>
            </div>
          </div>

          <div className="contact-office-image-wrap">
            <img src={contactMap} alt="Ceylon Gem Souq Offices" />
            <button onClick={handleMapClick} className="contact-map-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginInlineEnd: '0.4rem' }}>
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
              {t('contact_view_on_map')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
