import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Listings from './pages/Listings.jsx';
import GemDetail from './pages/GemDetail.jsx';
import OwnerDashboard from './pages/OwnerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { useLanguage } from './context/LanguageContext.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { useSettings } from './context/SettingsContext.jsx';
import logo from './assets/logo.png';
import Terms from './pages/Terms.jsx';
import Certifications from './pages/Certifications.jsx';

export default function App() {
  const { toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Falls back to the bundled logo asset until an admin uploads a real one
  // via Site Settings, so the header is never broken/blank before setup.
  const displayLogo = settings?.logoUrl || logo;

  const getPageClass = () => {
    if (location.pathname === '/') return 'page-home';
    if (location.pathname === '/listings') return 'page-listings';
    return 'page-standard';
  };

  return (
    <div className={getPageClass()} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header>
        <div className="header-container">
          <Link to="/" className="logo-group" onClick={() => setMobileMenuOpen(false)}>
            <img src={displayLogo} alt="Ceylon Gem Souq" className="logo-mark" />
            <span className="logo-divider" />
            <span className="logo-tagline">{t('hero_subtitle')}</span>
          </Link>

          {/* Hamburger Mobile Menu Toggle */}
          <button 
            className={`menu-toggle ${mobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link 
              to="/listings" 
              className={`nav-link ${isActive('/listings') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('listings')}
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            {user?.role === 'owner' && (
              <Link 
                to="/owner" 
                className={`nav-link ${isActive('/owner') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('my_dashboard')}
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('admin')}
              </Link>
            )}
            
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('login')}
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary"
                  style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('register')}
                </Link>
              </>
            ) : (
              <button 
                onClick={handleLogout} 
                className="btn btn-outline"
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                {t('logout')}
              </button>
            )}
            
            <button 
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }} 
              className="btn-lang"
            >
              {t('toggle_lang')}
            </button>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<GemDetail />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/certifications" element={<Certifications />} />
        </Routes>
      </main>

      <footer>
        <div className="footer-container">
          <div>
            <div className="footer-logo">
              <img src={displayLogo} alt="Ceylon Gem Souq" style={{ height: '32px', width: '32px', borderRadius: '4px', verticalAlign: 'middle', marginInlineEnd: '0.6rem' }} />
              {t('hero_title')}
            </div>
            <p className="footer-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {t('hero_desc')}
            </p>
          </div>
          <div>
            <div className="footer-title">{t('footer_specialties_title')}</div>
            <ul className="footer-links">
              <li><Link to="/listings?gemType=sapphire">{t('filter_sapphire')}</Link></li>
              <li><Link to="/listings?gemType=catseye">{t('filter_catseye')}</Link></li>
              <li><Link to="/listings?gemType=spinel">{t('filter_spinel')}</Link></li>
              <li><Link to="/listings?gemType=alexandrite">{t('filter_alexandrite')}</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-title">{t('footer_platform_title')}</div>
            <ul className="footer-links">
              <li><Link to="/about">{t('footer_about_link')}</Link></li>
              <li><Link to="/terms">{t('terms_nav')}</Link></li>
              <li><Link to="/certifications">{t('certs_nav')}</Link></li>
              <li><Link to="/contact">{t('footer_contact_link')}</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-title">{t('footer_connect_title')}</div>
            <a href={`mailto:${settings?.supportEmail || 'info@ceylongemsouq.com'}`} className="footer-contact-item">
              &#9993; {settings?.supportEmail || 'info@ceylongemsouq.com'}
            </a>
            {settings?.qatarPhone && (
              <a href={`tel:${settings.qatarPhone.replace(/\s/g, '')}`} className="footer-contact-item">
                &#9742; {settings.qatarPhone}
              </a>
            )}
            <Link to="/contact" className="footer-contact-item" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
              {t('footer_send_message')} &rarr;
            </Link>

            {(settings?.facebookUrl || settings?.instagramUrl || settings?.linkedinUrl || settings?.whatsappUrl) && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                {settings?.facebookUrl && (
                  <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>
                  </a>
                )}
                {settings?.instagramUrl && (
                  <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                  </a>
                )}
                {settings?.linkedinUrl && (
                  <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.5 8.75h6.9V21H3.5V8.75Zm7.7 0h5.7v1.68h.08c.8-1.4 2.6-2.7 5.3-2.7 5.7 0 6.7 3.4 6.7 7.9V21h-5V16.6c0-2.6 0-5.9-3.4-5.9-3.4 0-3.9 2.6-3.9 5.7V21h-5.4V8.75Z"/></svg>
                  </a>
                )}
                {settings?.whatsappUrl && (
                  <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.6 14.3c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.2-3.6-.8-3-1.3-5-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.2.3-.3.5l-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1l1-1.1c.2-.3.4-.2.7-.1.3.1 1.7.8 2 1 .3.1.5.2.5.3.1.2.1.7-.1 1.3Z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} {t('hero_title')}. {t('footer_rights')}</div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>{settings?.qatarAddress || 'West Bay, Doha, Qatar'}</span>
            <span>&middot;</span>
            <span>{settings?.sriLankaAddress || 'Colombo, Sri Lanka'}</span>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <button
        className={`scroll-to-top ${showScrollBtn ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>
    </div>
  );
}
