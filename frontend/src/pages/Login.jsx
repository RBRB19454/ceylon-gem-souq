import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import loginBg from '../assets/login_bg.jpg';

export default function Login() {
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleSocialLogin = (platform) => {
    alert(`OAuth simulation: Continuing with ${platform}`);
  };

  return (
    <div className="login-page-container">
      {/* Split layout — left: floating text, right: dark card */}
      <div className="login-split-grid">

        {/* Left: branding text floating on top of the background image */}
        <div className="login-info-panel">
          <span className="login-eyebrow" style={{ color: 'var(--color-accent)' }}>{t('auth_eyebrow')}</span>
          <h1 className="login-intro-title">
            {t('auth_login_intro_title')}
            <span>Ceylon Gem Souq</span>
          </h1>
          <div className="login-ornament">
            <span className="line" />
            <span className="diamond" />
            <span className="line" />
          </div>
          <p className="login-intro-desc" style={{ maxWidth: '420px' }}>{t('auth_login_intro_desc')}</p>
        </div>

        {/* Right: dark glass card with the form */}
        <div className="login-form-col">
          <form onSubmit={handleSubmit} className="login-card-gold">

            {/* Gold Diamond Icon and Headers */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div style={{ color: '#C5A85C', marginBottom: '0.75rem' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C5A85C" strokeWidth="1.5">
                  <polygon points="12,2 22,8.5 12,22 2,8.5" />
                  <polyline points="2,8.5 12,12 22,8.5" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
              </div>
              <h2 className="login-card-title">{t('auth_login_title')}</h2>
              <p className="login-card-subtitle">{t('auth_login_card_subtitle')}</p>
            </div>

            {error && (
              <div style={{
                color: 'var(--color-error)',
                background: 'rgba(239, 68, 68, 0.08)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem',
                fontSize: '0.88rem',
                borderLeft: '3px solid var(--color-error)',
                textAlign: language === 'ar' ? 'right' : 'left'
              }}>
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>
                {t('auth_email')}
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon prefix">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل عنوان بريدك الإلكتروني' : 'Enter your email address'}
                  required
                  style={{
                    direction: language === 'ar' ? 'rtl' : 'ltr',
                    textAlign: language === 'ar' ? 'right' : 'left'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', margin: 0 }}>
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <Link to="/forgot-password" className="login-forgot-link">
                  {t('auth_forgot_password')}
                </Link>
              </div>
              <div className="login-input-wrapper">
                <span className="login-input-icon prefix">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل كلمة المرور الخاصة بك' : 'Enter your password'}
                  required
                  style={{
                    direction: language === 'ar' ? 'rtl' : 'ltr',
                    textAlign: language === 'ar' ? 'right' : 'left',
                    paddingInlineEnd: '2.5rem'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-input-icon suffix"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: showPassword ? 1 : 0.5 }}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', userSelect: 'none' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-custom-checkbox"
              />
              <label htmlFor="rememberMe" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', cursor: 'pointer' }}>
                {t('auth_remember_me')}
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="login-gradient-btn">
              {language === 'ar' ? 'تسجيل الدخول ←' : 'Sign In \u2192'}
            </button>

            {/* Divider */}
            <div className="login-or-divider">
              <span className="line" />
              <span className="text">{t('auth_or_divider')}</span>
              <span className="line" />
            </div>

            {/* Social logins */}
            <div className="login-social-row">
              <button type="button" onClick={() => handleSocialLogin('Google')} className="login-social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginInlineEnd: '0.4rem' }}>
                  <path fill="#EA4335" d="M12 5.04c1.67 0 3.2.58 4.39 1.71l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.68 1.39 7.56l3.85 2.99c.92-2.77 3.49-4.51 6.76-4.51z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.27H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.01 3.67-8.73z" />
                  <path fill="#FBBC05" d="M5.24 10.55A7.05 7.05 0 0 1 5 12c0 .51.04 1.01.12 1.49l-3.85 2.99A11.83 11.83 0 0 1 1 12c0-1.55.3-3.03.85-4.4l3.39 2.95z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.91c-1.1.74-2.5 1.18-4.2 1.18-3.27 0-5.84-1.74-6.76-4.51L1.39 16.44C3.37 20.32 7.35 23 12 23z" />
                </svg>
                {t('auth_btn_google')}
              </button>

              <button type="button" onClick={() => handleSocialLogin('Apple')} className="login-social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginInlineEnd: '0.4rem' }}>
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-.7-.34-1.42-.51-2.14-.51-.73 0-1.47.17-2.17.51-1.07.49-2.07.45-3.05-.4C3.8 17.53 2.1 11.23 4.96 6.35c1.43-2.45 3.96-3.87 6.64-3.87.82 0 1.63.15 2.4.45.62.24 1.25.32 1.87.32.61 0 1.25-.08 1.86-.32.78-.3 1.58-.45 2.4-.45 2.68 0 5.21 1.42 6.64 3.87-4.14 2.5-3.48 8.4 1 10.15-.9 2.25-2.18 4.43-3.72 5.93zM15.97 2.13c1.1-1.33.95-3.13.95-3.13s-1.8.15-2.9 1.48c-1.12 1.35-.95 3.12-.95 3.12s1.8-.13 2.9-1.47z" />
                </svg>
                {t('auth_btn_apple')}
              </button>
            </div>

            {/* Footer */}
            <p className="login-card-footer" style={{ textAlign: 'center', fontSize: '0.88rem', marginTop: '1.75rem', marginBottom: 0 }}>
              {t('auth_dont_have_account')}{' '}
              <Link to="/register" style={{ color: '#C5A85C', fontWeight: '600', textDecoration: 'underline' }}>
                {t('auth_create_one')}
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="login-trust-strip">
        <div className="login-trust-item">
          <div className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h4>{t('trust_secure_title')}</h4>
            <p>{t('trust_secure_desc')}</p>
          </div>
        </div>
        <div className="login-trust-item">
          <div className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12,2 22,8.5 12,22 2,8.5" />
            </svg>
          </div>
          <div>
            <h4>{t('trust_verified_title')}</h4>
            <p>{t('trust_verified_desc')}</p>
          </div>
        </div>
        <div className="login-trust-item">
          <div className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div>
            <h4>{t('trust_global_title')}</h4>
            <p>{t('trust_global_desc')}</p>
          </div>
        </div>
        <div className="login-trust-item">
          <div className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </div>
          <div>
            <h4>{t('trust_support_title')}</h4>
            <p>{t('trust_support_desc')}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
