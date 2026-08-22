import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('reset_password_mismatch'));
      return;
    }

    setSending(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'This reset link is invalid or has expired.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
        {success ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('reset_success_title')}</h2>
            <p>{t('reset_success_desc')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', textAlign: 'center' }}>{t('reset_title')}</h2>

            {error && (
              <div style={{ color: 'var(--color-error)', background: 'rgba(239,68,68,0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                {error}
                {(error.includes('invalid') || error.includes('expired')) ? (
                  <>
                    {' '}
                    <Link to="/forgot-password" style={{ color: 'var(--color-error)', textDecoration: 'underline', fontWeight: 600 }}>
                      {t('reset_request_new')}
                    </Link>
                  </>
                ) : null}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">{t('reset_new_password')}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="••••••" />
            </div>

            <div className="form-group">
              <label className="form-label">{t('reset_confirm_password')}</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} placeholder="••••••" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }} disabled={sending}>
              {sending ? t('sending') : t('reset_submit')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
