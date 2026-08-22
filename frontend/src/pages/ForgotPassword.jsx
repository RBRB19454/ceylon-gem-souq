import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ForgotPassword() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('forgot_success_title')}</h2>
            <p style={{ marginBottom: '1.5rem' }}>{t('forgot_success_desc')}</p>
            <Link to="/login" className="btn btn-outline">{t('back_to_login')}</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>{t('forgot_title')}</h2>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{t('forgot_subtitle')}</p>

            {error && (
              <div style={{ color: 'var(--color-error)', background: 'rgba(239,68,68,0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">{t('auth_email')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="john@example.com" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }} disabled={sending}>
              {sending ? t('sending') : t('forgot_submit')}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '1.5rem' }}>
              <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{t('back_to_login')}</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
