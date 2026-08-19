import { useEffect, useState } from 'react';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useSettings } from '../context/SettingsContext.jsx';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { settings, refetch: refetchSettings } = useSettings();
  const [activeTab, setActiveTab] = useState('approvals');
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [commissionForm, setCommissionForm] = useState({});

  const [settingsForm, setSettingsForm] = useState({
    logoUrl: '', supportEmail: '', qatarPhone: '', sriLankaPhone: '', qatarAddress: '', sriLankaAddress: '',
    facebookUrl: '', instagramUrl: '', linkedinUrl: '', whatsappUrl: '',
  });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [settingsError, setSettingsError] = useState('');

  // Populate the settings form once real settings arrive from the server
  // (context starts as null while its own fetch is in flight).
  useEffect(() => {
    if (settings) {
      setSettingsForm({
        logoUrl: settings.logoUrl || '',
        supportEmail: settings.supportEmail || '',
        qatarPhone: settings.qatarPhone || '',
        sriLankaPhone: settings.sriLankaPhone || '',
        qatarAddress: settings.qatarAddress || '',
        sriLankaAddress: settings.sriLankaAddress || '',
        facebookUrl: settings.facebookUrl || '',
        instagramUrl: settings.instagramUrl || '',
        linkedinUrl: settings.linkedinUrl || '',
        whatsappUrl: settings.whatsappUrl || '',
      });
    }
  }, [settings]);

  const updateSettingsField = (field) => (e) =>
    setSettingsForm({ ...settingsForm, [field]: e.target.value });

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSettingsError('');
    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append('images', file);
      formData.append('folder', 'branding');
      const { data } = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSettingsForm((prev) => ({ ...prev, logoUrl: data.urls[0] }));
    } catch (err) {
      setSettingsError(err.response?.data?.message || 'Logo upload failed. Please try again.');
    } finally {
      setLogoUploading(false);
      e.target.value = '';
    }
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    setSettingsSaving(true);
    setSettingsSaved(false);
    setSettingsError('');
    try {
      await api.put('/settings', settingsForm);
      await refetchSettings();
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 4000);
    } catch (err) {
      setSettingsError(err.response?.data?.message || 'Failed to save settings.');
    } finally {
      setSettingsSaving(false);
    }
  };

  const loadAll = async () => {
    try {
      const [l, b, u, c] = await Promise.all([
        api.get('/listings/admin/all'),
        api.get('/bookings/admin/all'),
        api.get('/users'),
        api.get('/commissions'),
      ]);
      setListings(l.data);
      setBookings(b.data);
      setUsers(u.data);
      setCommissions(c.data);
    } catch (err) {
      console.error('Error loading admin dashboards:', err);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const review = async (id, status) => {
    try {
      await api.put(`/listings/${id}/review`, { status });
      loadAll();
    } catch (err) {
      alert(err.response?.data?.message || t('admin_alert_review_fail'));
    }
  };

  const verifyUser = async (userId) => {
    try {
      await api.put(`/users/${userId}/verify`);
      loadAll();
    } catch (err) {
      alert(err.response?.data?.message || t('admin_alert_verify_fail'));
    }
  };

  const completeDeal = async (bookingId) => {
    const f = commissionForm[bookingId] || {};
    try {
      await api.post('/commissions/complete', {
        bookingId,
        buyerCommission: Number(f.buyerCommission || 0),
        ownerCommission: Number(f.ownerCommission || 0),
        currency: 'USD',
      });
      loadAll();
    } catch (err) {
      alert(err.response?.data?.message || t('admin_alert_complete_fail'));
    }
  };

  const updateForm = (bookingId, field) => (e) =>
    setCommissionForm({ ...commissionForm, [bookingId]: { ...commissionForm[bookingId], [field]: e.target.value } });

  // Calculate totals
  const totalRevenue = commissions.reduce((sum, item) => sum + (item.buyerCommission || 0) + (item.ownerCommission || 0), 0);

  return (
    <div>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>{t('admin_dashboard_title')}</h2>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'approvals' ? 'active' : ''}`}
          onClick={() => setActiveTab('approvals')}
        >
          {t('admin_pending_reviews')} ({listings.filter((l) => l.status === 'pending').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          {t('admin_all_bookings')} ({bookings.filter(b => b.status === 'accepted').length} active)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          {t('admin_users_title')} ({users.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'commissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('commissions')}
        >
          {t('admin_commission_reports')}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          {t('admin_site_settings')}
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'approvals' && (
        <div>
          <div className="grid">
            {listings.filter((l) => l.status === 'pending').map((l) => (
              <div className="card" key={l._id} style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--color-primary)' }}>{l.title}</h4>
                <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
                  <strong>{t('label_gem_type')}:</strong> {t(`filter_${l.gemType}`)} &middot; <strong>{t('label_weight')}:</strong> {l.weightCt} ct &middot; <strong>{t('label_price')}:</strong> ${l.priceUSD.toLocaleString()}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                  <strong>{t('admin_seller')}:</strong> {l.owner?.name} ({l.owner?.email})
                </p>
                {l.description && (
                  <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1rem', background: '#F8F9FC', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    "{l.description}"
                  </p>
                )}
                
                {/* Certification specs review */}
                {l.certification && l.certification.issuer && (
                  <div style={{ fontSize: '0.8rem', border: '1px dashed var(--color-accent)', borderRadius: 'var(--radius-sm)', padding: '0.5rem', marginBottom: '1.25rem', background: 'rgba(212, 175, 55, 0.04)' }}>
                    <strong>{t('label_cert_issuer')}:</strong> {l.certification.issuer} | <strong>{t('admin_cert_id')}:</strong> {l.certification.certNumber || 'N/A'}
                    {l.certification.fileUrl && (
                      <div style={{ marginTop: '0.25rem' }}>
                        <a href={l.certification.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontWeight: '600', textDecoration: 'underline' }}>
                          {t('admin_open_cert')} &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <button onClick={() => review(l._id, 'approved')} className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>
                    {t('admin_btn_approve')}
                  </button>
                  <button onClick={() => review(l._id, 'rejected')} className="btn btn-outline" style={{ flex: 1, padding: '0.5rem', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>
                    {t('admin_btn_reject')}
                  </button>
                </div>
              </div>
            ))}
            {listings.filter((l) => l.status === 'pending').length === 0 && (
              <div className="card" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                <p>{t('admin_no_approvals')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.map((b) => (
            <div className="card" key={b._id} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--color-primary)', fontSize: '1.15rem' }}>
                  {b.listing?.title}
                </h4>
                <span className={`badge badge-${b.status}`}>
                  {t(`owner_status_${b.status}`) || b.status}
                </span>
              </div>
              <p style={{ fontSize: '0.95rem' }}>
                <strong>{t('admin_buyer')}:</strong> {b.buyer?.name} ({b.buyer?.email}) &rarr; <strong>{t('admin_owner')}:</strong> {b.owner?.name} ({b.owner?.email})
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                <strong>{t('admin_negotiation_msg')}:</strong> "{b.message}"
              </p>

              {b.status === 'accepted' && (
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <h5 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>{t('admin_finalize_title')}</h5>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ margin: 0, flex: '1 1 200px' }}>
                      <label className="form-label">{t('admin_buyer_comm')}</label>
                      <input
                        placeholder="e.g. 50"
                        type="number"
                        style={{ maxWidth: '100%' }}
                        onChange={updateForm(b._id, 'buyerCommission')}
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0, flex: '1 1 200px' }}>
                      <label className="form-label">{t('admin_owner_comm')}</label>
                      <input
                        placeholder="e.g. 100"
                        type="number"
                        style={{ maxWidth: '100%' }}
                        onChange={updateForm(b._id, 'ownerCommission')}
                      />
                    </div>
                    <button 
                      onClick={() => completeDeal(b._id)} 
                      className="btn btn-primary"
                      style={{ padding: '0.75rem 1.5rem', flex: '1 1 150px' }}
                    >
                      {t('admin_btn_complete')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <p>{t('admin_no_bookings')}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div style={{ overflowX: 'auto' }} className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_th_name')}</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_th_email')}</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_th_phone')}</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_th_role')}</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_th_verification')}</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>{t('admin_th_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>{u.name}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{u.phone || 'N/A'}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textTransform: 'capitalize' }}>{t(`auth_role_${u.role}`) || u.role}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <span className={`badge ${u.isVerified ? 'badge-approved' : 'badge-pending'}`}>
                      {u.isVerified ? t('admin_verified') : t('admin_unverified')}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                    {!u.isVerified && u.role !== 'admin' && (
                      <button 
                        onClick={() => verifyUser(u._id)} 
                        className="btn btn-outline"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        {t('admin_btn_verify')}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'commissions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Summary Box */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #0b1e3d 0%, #173b75 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--color-accent)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('admin_total_commission')}</h4>
              <span style={{ fontSize: '3rem', fontWeight: '800' }}>
                ${totalRevenue.toLocaleString()}
              </span>
            </div>
            <div style={{ fontSize: '3.5rem', opacity: 0.2 }}>
              💰
            </div>
          </div>

          <div style={{ overflowX: 'auto' }} className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>{t('admin_ledger_title')}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_deal_id')}</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_th_gemstone')}</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_buyer_paid')}</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_seller_paid')}</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>{t('admin_date')}</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((c) => (
                  <tr key={c._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {c._id}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>
                      {c.booking?.listing?.title || 'Unknown Gem'}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-success)', fontWeight: '600' }}>
                      +${c.buyerCommission}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-success)', fontWeight: '600' }}>
                      +${c.ownerCommission}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      {new Date(c.completedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {commissions.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      {t('admin_no_commissions')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={saveSettings} className="card" style={{ width: '100%', maxWidth: '640px', padding: '2rem 2.5rem' }}>
            <div style={{ marginBottom: '1.75rem', borderBottom: '2px solid var(--color-accent)', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.45rem', color: 'var(--color-primary)' }}>{t('admin_site_settings')}</h3>
              <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>
                {t('admin_settings_desc')}
              </p>
            </div>

            {/* Logo */}
            <div className="form-group">
              <label className="form-label">{t('admin_settings_logo')}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0, background: 'var(--color-primary)' }}>
                  {settingsForm.logoUrl && (
                    <img src={settingsForm.logoUrl} alt="Current logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={logoUploading} />
              </div>
              {logoUploading && <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{t('sending') || "Uploading..."}</p>}
            </div>

            <div style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>{t('admin_settings_contact_title')}</span>
            </div>

            <div className="form-group">
              <label className="form-label">{t('admin_settings_email')}</label>
              <input type="email" value={settingsForm.supportEmail} onChange={updateSettingsField('supportEmail')} placeholder="info@ceylongemsouq.com" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">{t('admin_settings_qatar_phone')}</label>
                <input value={settingsForm.qatarPhone} onChange={updateSettingsField('qatarPhone')} placeholder="+974 ..." />
              </div>
              <div className="form-group">
                <label className="form-label">{t('admin_settings_srilanka_phone')}</label>
                <input value={settingsForm.sriLankaPhone} onChange={updateSettingsField('sriLankaPhone')} placeholder="+94 ..." />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('admin_settings_qatar_address')}</label>
              <input value={settingsForm.qatarAddress} onChange={updateSettingsField('qatarAddress')} placeholder="e.g. West Bay, Doha, Qatar" />
            </div>

            <div className="form-group">
              <label className="form-label">{t('admin_settings_srilanka_address')}</label>
              <input value={settingsForm.sriLankaAddress} onChange={updateSettingsField('sriLankaAddress')} placeholder="e.g. Colombo, Sri Lanka" />
            </div>

            <div style={{ marginTop: '1.5rem', marginBottom: '0.25rem' }}>
              <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>{t('admin_settings_social_title')}</span>
              <p style={{ fontSize: '0.8rem', marginTop: '0.35rem' }}>{t('admin_settings_social_desc')}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Facebook</label>
                <input value={settingsForm.facebookUrl} onChange={updateSettingsField('facebookUrl')} placeholder="https://facebook.com/..." />
              </div>
              <div className="form-group">
                <label className="form-label">Instagram</label>
                <input value={settingsForm.instagramUrl} onChange={updateSettingsField('instagramUrl')} placeholder="https://instagram.com/..." />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn</label>
                <input value={settingsForm.linkedinUrl} onChange={updateSettingsField('linkedinUrl')} placeholder="https://linkedin.com/company/..." />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp</label>
                <input value={settingsForm.whatsappUrl} onChange={updateSettingsField('whatsappUrl')} placeholder="https://wa.me/974..." />
              </div>
            </div>

            {settingsError && (
              <p style={{ color: 'var(--color-error)', fontSize: '0.9rem', marginBottom: '1rem' }}>{settingsError}</p>
            )}
            {settingsSaved && (
              <p style={{ color: 'var(--color-success)', fontSize: '0.9rem', marginBottom: '1rem' }}>{t('admin_settings_saved')}</p>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }} disabled={settingsSaving || logoUploading}>
              {settingsSaving ? t('sending') : t('admin_settings_save_btn')}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
