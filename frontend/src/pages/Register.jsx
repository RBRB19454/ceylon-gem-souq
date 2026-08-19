import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'owner' ? 'owner' : 'buyer';
  const [form, setForm] = useState({ name: '', email: '', password: '', role: initialRole, phone: '', preferredLanguage: 'en' });
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await register(form);
      navigate(data.role === 'owner' ? '/owner' : '/listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
      <form onSubmit={handleSubmit} className="card" style={{ width: '100%', maxWidth: '440px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          {t('auth_register_title')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {t('hero_subtitle')}
        </p>

        {error && (
          <div style={{ color: 'var(--color-error)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.9rem', borderLeft: '3px solid var(--color-error)' }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">{t('auth_name')}</label>
          <input
            placeholder="Enter your full name"
            value={form.name}
            onChange={update('name')}
            required
          />hange
        </div>

        <div className="form-group">
          <label className="form-label">{t('auth_email')}</label>
          <input
            placeholder="email@example.com"
            type="email"
            value={form.email}
            onChange={update('email')}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t('auth_password')}</label>
          <input
            placeholder="******"
            type="password"
            value={form.password}
            onChange={update('password')}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t('auth_phone')}</label>
          <input
            placeholder="+94 77 123 4567"
            value={form.phone}
            onChange={update('phone')}
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t('auth_role')}</label>
          <select value={form.role} onChange={update('role')}>
            <option value="buyer">{t('auth_role_buyer')}</option>
            <option value="owner">{t('auth_role_owner')}</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">{t('auth_pref_lang')}</label>
          <select value={form.preferredLanguage} onChange={update('preferredLanguage')}>
            <option value="en">English</option>
            <option value="ar">العربية (Arabic)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }}>
          {t('auth_btn_register')}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '1.5rem' }}>
          {t('auth_have_account')}{' '}
          <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: '600', textDecoration: 'underline' }}>
            {t('auth_switch_login')}
          </Link>
        </p>
      </form>
    </div>
  );
}
