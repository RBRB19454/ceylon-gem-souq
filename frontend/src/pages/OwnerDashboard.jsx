import { useEffect, useState } from 'react';
import api from '../api/client';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const emptyForm = {
  gemType: 'sapphire',
  title: '',
  description: '',
  weightCt: '',
  priceUSD: '',
  color: '',
  clarity: '',
  shape: '',
  origin: 'Sri Lanka',
  certIssuer: '',
  certNumber: '',
  certFileUrl: '',
  images: [],
};

export default function OwnerDashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('inventory');
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const loadAll = async () => {
    try {
      const [l, b] = await Promise.all([api.get('/listings/mine'), api.get('/bookings/mine')]);
      setListings(l.data);
      setBookings(b.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (form.images.length + files.length > 6) {
      setUploadError('You can upload a maximum of 6 photos.');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('images', file));

      const { data } = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));
    } catch (err) {
      console.error(err);
      setUploadError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const submitListing = async (e) => {
    e.preventDefault();
    if (user && !user.isVerified) {
      alert(t('verify_error_message') || 'Account verification required');
      return;
    }
    try {
      const payload = {
        gemType: form.gemType,
        title: form.title,
        description: form.description,
        weightCt: Number(form.weightCt),
        priceUSD: Number(form.priceUSD),
        color: form.color,
        clarity: form.clarity,
        shape: form.shape,
        origin: form.origin,
        certification: {
          issuer: form.certIssuer,
          certNumber: form.certNumber,
          fileUrl: form.certFileUrl,
        },
        images: form.images,
      };

      if (editingId) {
        await api.put(`/listings/${editingId}`, payload);
        setEditingId(null);
      } else {
        await api.post('/listings', payload);
      }

      setForm(emptyForm);
      setUploadError('');
      loadAll();
      setActiveTab('inventory'); // switch tab on success
    } catch (err) {
      alert(err.response?.data?.message || t('owner_alert_submit_fail'));
    }
  };

  const respond = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/respond`, { status });
      loadAll();
    } catch (err) {
      alert(err.response?.data?.message || t('owner_alert_respond_fail'));
    }
  };

  const startEdit = (l) => {
    setEditingId(l._id);
    setForm({
      gemType: l.gemType || 'sapphire',
      title: l.title || '',
      description: l.description || '',
      weightCt: l.weightCt || '',
      priceUSD: l.priceUSD || '',
      color: l.color || '',
      clarity: l.clarity || '',
      shape: l.shape || '',
      origin: l.origin || 'Sri Lanka',
      certIssuer: l.certification?.issuer || '',
      certNumber: l.certification?.certNumber || '',
      certFileUrl: l.certification?.fileUrl || '',
      images: l.images || [],
    });
    setActiveTab('add'); // switch to form tab
  };

  const abandonEditAndGo = (tab) => {
    setEditingId(null);
    setUploadError('');
    setForm(emptyForm);
    setActiveTab(tab);
  };

  return (
    <div>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>{t('owner_dashboard_title')}</h2>

      {/* Tabs */}
      <div className="tabs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
        <button 
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => {
            if (editingId) abandonEditAndGo('inventory');
            else setActiveTab('inventory');
          }}
          style={{ background: 'none', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'inventory' ? 'var(--color-primary)' : 'var(--color-text-muted)', borderBottom: activeTab === 'inventory' ? '3px solid var(--color-accent)' : '3px solid transparent', transition: 'var(--transition)' }}
        >
          {t('owner_my_inventory')}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
          style={{ background: 'none', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'add' ? 'var(--color-primary)' : 'var(--color-text-muted)', borderBottom: activeTab === 'add' ? '3px solid var(--color-accent)' : '3px solid transparent', transition: 'var(--transition)' }}
        >
          {editingId ? t('owner_edit_listing_title') : t('owner_add_listing')}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => {
            if (editingId) abandonEditAndGo('bookings');
            else setActiveTab('bookings');
          }}
          style={{ background: 'none', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', color: activeTab === 'bookings' ? 'var(--color-primary)' : 'var(--color-text-muted)', borderBottom: activeTab === 'bookings' ? '3px solid var(--color-accent)' : '3px solid transparent', transition: 'var(--transition)' }}
        >
          {t('owner_booking_requests')} ({bookings.filter(b => b.status === 'requested').length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'inventory' && (
        <div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {listings.map((l) => (
              <div className="card" key={l._id} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--color-primary)', fontSize: '1.15rem' }}>{l.title}</h4>
                    <span className={`badge badge-${l.status}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {t(`owner_status_${l.status}`) || l.status}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', marginBottom: '1rem' }}>
                    <p style={{ marginBottom: '0.4rem' }}>
                      <strong>{t('label_gem_type')}:</strong> {t(`filter_${l.gemType}`)} &middot; <strong>{t('label_weight')}:</strong> {l.weightCt} ct
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                      <strong>{t('label_price')}:</strong> ${l.priceUSD.toLocaleString()}
                    </p>
                    
                    {l.certification && l.certification.issuer && (
                      <div style={{ fontSize: '0.8rem', background: 'var(--color-sapphire-light)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-sapphire)' }}>
                        <strong>{t('label_certification')}:</strong> {l.certification.issuer} ({l.certification.certNumber || 'No ID'})
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                  <button 
                    onClick={() => startEdit(l)}
                    className="btn btn-outline" 
                    style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
                  >
                    {t('owner_inventory_edit')}
                  </button>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {t('owner_inventory_origin')}: {l.origin}
                  </span>
                </div>
              </div>
            ))}
            {listings.length === 0 && (
              <div className="card" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                <p>{t('owner_inventory_empty')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {user && !user.isVerified && (
            <div
              className="card"
              style={{
                width: '100%',
                maxWidth: '700px',
                marginBottom: '1.5rem',
                padding: '1.25rem 1.5rem',
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px dashed var(--color-accent)',
              }}
            >
              <strong style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--color-primary)' }}>
                {t('verify_notice_title')}
              </strong>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('verify_notice_owner_desc')}</p>
            </div>
          )}
          <form onSubmit={submitListing} className="card" style={{ width: '100%', maxWidth: '700px', padding: '2rem 2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', borderBottom: '2px solid var(--color-accent)', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.45rem', color: 'var(--color-primary)' }}>
                {editingId ? t('owner_edit_verification_title') : t('owner_add_listing')}
              </h3>
              {editingId && (
                <button type="button" onClick={() => abandonEditAndGo('inventory')} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                  {t('owner_cancel_edit')}
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* Section 1: Basic Information */}
              <div style={{ gridColumn: '1 / -1', marginBottom: '0.25rem' }}>
                <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>{t('owner_sec_basic')}</span>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">{t('owner_form_title')}</label>
                <input 
                  placeholder={t('owner_title_placeholder')}
                  value={form.title} 
                  onChange={update('title')} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('owner_form_type')}</label>
                <select value={form.gemType} onChange={update('gemType')}>
                  <option value="sapphire">{t('filter_sapphire')}</option>
                  <option value="catseye">{t('filter_catseye')}</option>
                  <option value="moonstone">{t('filter_moonstone')}</option>
                  <option value="spinel">{t('filter_spinel')}</option>
                  <option value="alexandrite">{t('filter_alexandrite')}</option>
                  <option value="ruby">{t('filter_ruby')}</option>
                  <option value="other">{t('filter_other')}</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t('owner_form_price')}</label>
                <input 
                  placeholder="e.g. 5000" 
                  type="number" 
                  value={form.priceUSD} 
                  onChange={update('priceUSD')} 
                  required 
                />
              </div>

              {/* Section 2: Physical Specifications */}
              <div style={{ gridColumn: '1 / -1', marginTop: '1rem', marginBottom: '0.25rem' }}>
                <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>{t('owner_sec_specs')}</span>
              </div>

              <div className="form-group">
                <label className="form-label">{t('owner_form_weight')}</label>
                <input 
                  placeholder="e.g. 2.50" 
                  type="number" 
                  step="0.01" 
                  value={form.weightCt} 
                  onChange={update('weightCt')} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('owner_form_color')}</label>
                <input 
                  placeholder="e.g. Royal Blue" 
                  value={form.color} 
                  onChange={update('color')} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('owner_form_clarity')}</label>
                <input 
                  placeholder="e.g. Eye Clean" 
                  value={form.clarity} 
                  onChange={update('clarity')} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('owner_form_shape')}</label>
                <input 
                  placeholder="e.g. Oval Mixed Cut" 
                  value={form.shape} 
                  onChange={update('shape')} 
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">{t('owner_form_origin')}</label>
                <input 
                  placeholder="e.g. Elahera, Sri Lanka" 
                  value={form.origin} 
                  onChange={update('origin')} 
                />
              </div>

              {/* Section 3: Certificate & Media */}
              <div style={{ gridColumn: '1 / -1', marginTop: '1rem', marginBottom: '0.25rem' }}>
                <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>{t('owner_sec_cert_media')}</span>
              </div>

              <div className="form-group">
                <label className="form-label">{t('owner_form_cert_issuer')}</label>
                <input 
                  placeholder="e.g. GIC / GRS / EGL" 
                  value={form.certIssuer} 
                  onChange={update('certIssuer')} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('owner_form_cert_number')}</label>
                <input 
                  placeholder="e.g. 9283749" 
                  value={form.certNumber} 
                  onChange={update('certNumber')} 
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">{t('owner_form_cert_link')}</label>
                <input 
                  placeholder="https://certificates.example.com/check/9283749" 
                  type="url"
                  value={form.certFileUrl} 
                  onChange={update('certFileUrl')} 
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">
                  {t('owner_form_photos_label') || "Gemstone Photos (up to 6)"}
                </label>

                {form.images.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {form.images.map((url, i) => (
                      <div key={url + i} style={{ position: 'relative', width: '72px', height: '72px' }}>
                        <img
                          src={url}
                          alt={`Gem photo ${i + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          aria-label="Remove photo"
                          style={{
                            position: 'absolute', top: '-6px', right: '-6px',
                            width: '20px', height: '20px', borderRadius: '50%',
                            background: 'var(--color-primary)', color: 'white', border: '2px solid white',
                            fontSize: '0.7rem', lineHeight: 1, cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', padding: 0,
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading || form.images.length >= 6}
                />
                {uploading && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                    {t('sending') || "Uploading..."}
                  </p>
                )}
                {uploadError && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-error)', marginTop: '0.4rem' }}>
                    {uploadError}
                  </p>
                )}
                {form.images.length >= 6 && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                    Maximum of 6 photos reached.
                  </p>
                )}
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">{t('owner_form_notes')}</label>
                <textarea 
                  placeholder={t('owner_form_notes_placeholder')} 
                  rows="4" 
                  style={{ width: '100%', fontFamily: 'inherit', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', resize: 'vertical' }}
                  value={form.description} 
                  onChange={update('description')} 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '0.85rem', fontSize: '1rem' }}>
              {editingId ? t('owner_btn_save_changes') : t('owner_btn_submit')}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.map((b) => (
            <div className="card" key={b._id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                  {b.listing?.title}
                </h4>
                <span className={`badge badge-${b.status}`}>
                  {t(`owner_status_${b.status}`) || b.status}
                </span>
              </div>

              <p style={{ fontSize: '0.95rem' }}>
                <strong>{t('owner_bookings_buyer')}:</strong> {b.buyer?.name} ({b.buyer?.email})
              </p>
              
              <div style={{ background: '#F8F9FC', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-accent)' }}>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  "{b.message}"
                </p>
              </div>

              {b.status === 'accepted' && (
                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid var(--color-success)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                  <p style={{ color: 'var(--color-success)', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {t('owner_bookings_accepted')}
                  </p>
                  <p style={{ color: 'var(--color-text-main)' }}>
                    {t('owner_bookings_accepted_desc')
                      .replace('{email}', b.buyer?.email)
                      .replace('{phone}', b.buyer?.phone || 'N/A')}
                  </p>
                </div>
              )}

              {b.status === 'requested' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                    ⚠️ {t('owner_disclaimer')}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      onClick={() => respond(b._id, 'accepted')} 
                      className="btn btn-primary"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      {t('owner_btn_accept')}
                    </button>
                    <button 
                      onClick={() => respond(b._id, 'declined')} 
                      className="btn btn-outline btn-danger"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', color: 'white' }}
                    >
                      {t('owner_btn_decline')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <p>{t('owner_bookings_empty')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
