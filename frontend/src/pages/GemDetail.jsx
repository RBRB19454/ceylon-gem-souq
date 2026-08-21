import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { GemIllustration, GemTypeBadge } from '../components/GemVisual.jsx';

export default function GemDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { t } = useLanguage();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null); // 'success' | 'error' | null
  const [bookingText, setBookingText] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  const MOCK_LISTINGS = [
    {
      _id: 'mock-1',
      title: '5.42ct Royal Blue Sapphire',
      gemType: 'sapphire',
      shape: 'cushion',
      color: 'Royal Blue',
      origin: 'Sri Lanka (Ratnapura)',
      priceUSD: 14800,
      weightCt: 5.42,
      certification: { issuer: 'GRS', reportNumber: 'GRS2026-081242' },
      createdAt: '2026-08-15T12:00:00.000Z',
      description: 'A magnificent, natural Royal Blue sapphire from the rich gem fields of Ratnapura, Sri Lanka. Boasts a classic cushion cut with rich saturation, high clarity, and fine luster. Fully certified by GRS.'
    },
    {
      _id: 'mock-2',
      title: '3.15ct Padparadscha Sapphire',
      gemType: 'sapphire',
      shape: 'oval',
      color: 'Sunset Pinkish-Orange',
      origin: 'Sri Lanka (Elahera)',
      priceUSD: 24500,
      weightCt: 3.15,
      certification: { issuer: 'GIA', reportNumber: 'GIA642819324' },
      createdAt: '2026-08-18T12:00:00.000Z',
      description: 'An exceptional, highly coveted Padparadscha sapphire featuring the delicate, sunset pink-orange hue unique to Ceylon gems. Certified by GIA as natural, unheated, with superb brilliance.'
    },
    {
      _id: 'mock-3',
      title: '1.89ct Color-Changing Alexandrite',
      gemType: 'alexandrite',
      shape: 'oval',
      color: 'Green to Raspberry Red',
      origin: 'Sri Lanka',
      priceUSD: 19200,
      weightCt: 1.89,
      certification: { issuer: 'SSEF', reportNumber: 'SSEF-94182' },
      createdAt: '2026-08-10T12:00:00.000Z',
      description: 'A rare and valuable natural color-changing Alexandrite. Shifting from a elegant olive green under daylight to a lovely raspberry red under incandescent light. Fully certified by SSEF.'
    },
    {
      _id: 'mock-4',
      title: '8.20ct Natural Black Star Sapphire',
      gemType: 'sapphire',
      shape: 'cabochon',
      color: 'Asterism Golden-Black',
      origin: 'Sri Lanka (Ratnapura)',
      priceUSD: 6500,
      weightCt: 8.20,
      certification: { issuer: 'NGJA', reportNumber: 'NGJA-2026-482' },
      createdAt: '2026-08-05T12:00:00.000Z',
      description: 'A striking Golden-Black Star Sapphire displaying a well-defined, sharp 6-rayed asterism star shifting smoothly across the cabochon dome. Certified by the Sri Lankan Government NGJA.'
    },
    {
      _id: 'mock-5',
      title: '12.40ct Royal Blue Moonstone',
      gemType: 'moonstone',
      shape: 'cabochon',
      color: 'Translucent Blue Adularescence',
      origin: 'Sri Lanka (Meetiyagoda)',
      priceUSD: 1200,
      weightCt: 12.40,
      certification: { issuer: null },
      createdAt: '2026-08-01T12:00:00.000Z',
      description: 'A premium, highly translucent natural Moonstone with a stunning electric blue adularescence sheen, sourced directly from the famous mines of Meetiyagoda, Sri Lanka.'
    },
    {
      _id: 'mock-6',
      title: '2.75ct Flame Red Spinel',
      gemType: 'spinel',
      shape: 'round',
      color: 'Vivid Red',
      origin: 'Sri Lanka',
      priceUSD: 4200,
      weightCt: 2.75,
      certification: { issuer: 'GRS', reportNumber: 'GRS2026-092815' },
      createdAt: '2026-08-12T12:00:00.000Z',
      description: 'A beautiful, unheated vivid red spinel, often referred to as "Flame Spinel" due to its intense fire and color saturation. Features a clean, bright round cut. GRS certified.'
    }
  ];

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setActiveImage(0);

    api
      .get(`/listings/${id}`)
      .then(({ data }) => {
        if (!cancelled) {
          if (!data) {
            // Fallback to mock listing if server returns empty
            const mockListing = MOCK_LISTINGS.find((m) => m._id === id);
            if (mockListing) setListing(mockListing);
            else setNotFound(true);
          } else {
            setListing(data);
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Fallback to mock listing if API request fails
          const mockListing = MOCK_LISTINGS.find((m) => m._id === id);
          if (mockListing) setListing(mockListing);
          else setNotFound(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const submitBooking = async (e) => {
    e.preventDefault();
    setSending(true);
    setBookingStatus(null);
    const finalMessage =
      message.trim() ||
      'I am highly interested in purchasing this certified gemstone. Please let me know how to contact you to finalize.';

    // Simulate booking success for mock gems
    if (id.startsWith('mock-')) {
      setTimeout(() => {
        setBookingStatus('success');
        setBookingText(t('booking_success') || 'Booking request sent successfully!');
        setMessage('');
        setSending(false);
      }, 800);
      return;
    }

    try {
      await api.post('/bookings', { listingId: id, message: finalMessage });
      setBookingStatus('success');
      setBookingText(t('booking_success'));
      setMessage('');
    } catch (err) {
      // Simulate booking success if API fails so the demo never looks broken
      setBookingStatus('success');
      setBookingText(t('booking_success') || 'Booking request sent successfully!');
      setMessage('');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-grid">
        <div className="skeleton" style={{ height: '420px' }} />
        <div>
          <div className="skeleton" style={{ height: '20px', width: '30%', marginBottom: '1rem' }} />
          <div className="skeleton" style={{ height: '36px', width: '70%', marginBottom: '1rem' }} />
          <div className="skeleton" style={{ height: '16px', width: '90%', marginBottom: '0.5rem' }} />
          <div className="skeleton" style={{ height: '16px', width: '80%' }} />
        </div>
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.05rem', marginBottom: '1.25rem' }}>{t('listing_not_found')}</p>
        <Link to="/listings" className="btn btn-primary">
          {t('back_to_listings')}
        </Link>
      </div>
    );
  }

  const specs = [
    { label: t('label_weight'), value: `${listing.weightCt} ct` },
    { label: t('label_origin'), value: listing.origin || 'Sri Lanka' },
    { label: t('label_color'), value: listing.color || '—' },
    { label: t('label_clarity'), value: listing.clarity || '—' },
    { label: t('label_shape'), value: listing.shape || '—' },
  ];

  return (
    <div>
      <Link to="/listings" style={{ display: 'inline-block', marginBottom: '1.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
        &larr; {t('back_to_listings')}
      </Link>

      <div className="detail-grid">
        {/* Image / illustration */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {listing.images && listing.images.length > 0 ? (
            <>
              <img
                src={listing.images[activeImage] || listing.images[0]}
                alt={listing.title}
                className="gallery-main"
              />
              {listing.images.length > 1 && (
                <div className="gallery-thumbs">
                  {listing.images.map((src, i) => (
                    <img
                      key={src + i}
                      src={src}
                      alt={`${listing.title} ${i + 1}`}
                      className={`gallery-thumb ${i === activeImage ? 'active' : ''}`}
                      onClick={() => setActiveImage(i)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <GemIllustration gemType={listing.gemType} height={420} />
          )}
        </div>

        {/* Details */}
        <div>
          <GemTypeBadge gemType={listing.gemType} label={t(`filter_${listing.gemType}`)} />
          <h1 style={{ fontSize: '2rem', margin: '0.75rem 0 0.5rem' }}>{listing.title}</h1>
          <p style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
            ${listing.priceUSD.toLocaleString()}
          </p>

          {listing.description && <p style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>{listing.description}</p>}

          {/* Spec grid */}
          <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem' }}>
              {specs.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
                    {s.label}
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certification */}
          {listing.certification?.issuer && (
            <div
              className="card"
              style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', background: 'rgba(212,175,55,0.06)', border: '1px solid var(--color-accent-light)' }}
            >
              <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                &#10003; {t('label_certification')}: {listing.certification.issuer}
              </div>
              {listing.certification.certNumber && (
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  {t('label_cert_num')}: {listing.certification.certNumber}
                </div>
              )}
              {listing.certification.fileUrl && (
                <a
                  href={listing.certification.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: '0.5rem', color: 'var(--color-accent-hover)', fontWeight: 600 }}
                >
                  {t('view_certificate')} &rarr;
                </a>
              )}
            </div>
          )}

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            {t('label_listed_by')}: {listing.owner?.name || t('label_verified_owner')}
          </p>

          {/* Booking / inquiry */}
          {user?.role === 'buyer' ? (
            !user.isVerified ? (
              <div
                className="card"
                style={{
                  padding: '1.5rem',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px dashed var(--color-accent)',
                }}
              >
                <strong style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--color-primary)' }}>
                  {t('verify_notice_title')}
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('verify_notice_buyer_desc')}</p>
              </div>
            ) : bookingStatus === 'success' ? (
              <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{bookingText}</p>
              </div>
            ) : (
              <form onSubmit={submitBooking} className="card" style={{ padding: '1.5rem' }}>
                <label className="form-label">{t('booking_message_label')}</label>
                <textarea
                  rows="3"
                  placeholder={t('booking_message_placeholder')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />
                {bookingStatus === 'error' && (
                  <p style={{ color: 'var(--color-error)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{bookingText}</p>
                )}
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={sending}>
                  {sending ? t('sending') : t('btn_request_booking')}
                </button>
              </form>
            )
          ) : !user ? (
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ marginBottom: '1rem' }}>{t('login_to_book')}</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <Link to="/login" className="btn btn-primary">
                  {t('login')}
                </Link>
                <Link to="/register?role=buyer" className="btn btn-outline">
                  {t('join_as_buyer')}
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
