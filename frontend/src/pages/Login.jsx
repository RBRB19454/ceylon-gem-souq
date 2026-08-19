import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password);
      navigate(data.role === 'owner' ? '/owner' : data.role === 'admin' ? '/admin' : '/listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 0' }}>
      <form onSubmit={handleSubmit} className="card" style={{ width: '100%', maxWidth: '420px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          {t('auth_login_title')}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '2rem' }}>
          {t('hero_subtitle')}
        </p>

        {error && (
          <div style={{ color: 'var(--color-error)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.9rem', borderLeft: '3px solid var(--color-error)' }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">{t('auth_email')}</label>
          <input 
            placeholder="john@example.com" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t('auth_password')}</label>
          <input 
            placeholder="******" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }}>
          {t('auth_btn_login')}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '1.5rem' }}>
          {t('auth_no_account')}{' '}
          <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: '600', textDecoration: 'underline' }}>
            {t('auth_switch_register')}
          </Link>
        </p>
      </form>
    </div>
  );
}
