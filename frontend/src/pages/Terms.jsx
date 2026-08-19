import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

export default function Terms() {
  const { settings } = useSettings();
  const { t, language } = useLanguage();
  const supportEmail = settings?.supportEmail || 'info@ceylongemsouq.com';

  return (
    <div>
      <section style={{ maxWidth: '760px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
        <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
          {t('terms_eyebrow')}
        </span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{t('terms_title')}</h1>
        <p style={{ fontSize: '0.95rem' }}>{t('terms_last_updated')}</p>
      </section>

      {language === 'ar' && (
        <div
          className="card"
          style={{
            maxWidth: '760px',
            margin: '0 auto 2.5rem',
            padding: '1.25rem 1.5rem',
            background: 'rgba(212, 175, 55, 0.06)',
            border: '1px dashed var(--color-accent)',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>
            {t('terms_ar_notice')}
          </p>
        </div>
      )}

      <div
        className="card"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '2.5rem 3rem',
          textAlign: 'left',
          direction: 'ltr',
          lineHeight: 1.75,
        }}
      >
        <h3>1. Who We Are</h3>
        <p>
          Ceylon Gem Souq ("the Platform," "we," "us") is an online marketplace that connects
          Sri Lankan gemstone owners ("Gem Owners") with buyers, primarily across the Middle East
          ("Buyers"). We are a facilitator, not a gemstone dealer: we do not own, physically hold,
          grade, or sell any gemstone listed on the Platform. By creating an account or using the
          Platform, you agree to these Terms & Conditions.
        </p>

        <h3>2. Accounts & Verification</h3>
        <p>
          Users register as a Buyer, Gem Owner, or Administrator. Gem Owner and Buyer accounts are
          subject to verification by our administrators before certain actions (such as approving a
          listing) are enabled. You are responsible for keeping your account credentials confidential
          and for all activity under your account.
        </p>

        <h3>3. Listings & Certification</h3>
        <p>
          Gem Owners are solely responsible for the accuracy of the information they submit for a
          listing, including certification details, origin, weight, and condition. Our administrators
          review listings before they go live, but this review is a moderation step, not an
          independent gemological verification or a guarantee of authenticity. Buyers are encouraged
          to independently verify certification and, wherever practical, request additional
          documentation before finalizing a purchase.
        </p>

        <h3>4. Booking Requests & Communication</h3>
        <p>
          A Buyer may send a booking request expressing interest in a listed gemstone. If the Gem
          Owner accepts, both parties receive each other's contact details to negotiate and finalize
          the transaction directly. The Platform is not a party to that negotiation or sale and does
          not mediate, guarantee, or enforce the terms either party agrees to between themselves.
        </p>

        <h3>5. No Payment Processing</h3>
        <p>
          The Platform does not process, hold, or store any payment information, and no funds pass
          through the Platform at any point. Once a booking is accepted, Buyer and Gem Owner arrange
          and complete payment entirely between themselves, by whatever method they agree to, entirely
          at their own risk. We strongly encourage both parties to take reasonable precautions when
          arranging payment and delivery.
        </p>

        <h3>6. Commission</h3>
        <p>
          Upon a Gem Owner and Buyer confirming that a deal has been completed, our administrators
          record the transaction and the commission owed by each party to the Platform, as agreed at
          the time of listing or booking. Attempting to use the Platform to identify a counterparty
          and then knowingly complete a sale outside the Platform specifically to avoid commission is
          a violation of these Terms.
        </p>

        <h3>7. Prohibited Conduct</h3>
        <p>
          You may not use the Platform to: list counterfeit, stolen, or knowingly misrepresented
          gemstones; harass, defraud, or mislead another user; circumvent the booking or commission
          process in bad faith; or attempt to access accounts, data, or systems you are not authorized
          to access.
        </p>

        <h3>8. Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, the Platform is not liable for: the authenticity,
          quality, or condition of any gemstone; any dispute, loss, or damage arising from a
          transaction between a Buyer and Gem Owner; shipping, customs, import/export compliance, or
          delivery of any gemstone; or any payment made directly between users. The Platform is
          provided "as is," and we do not guarantee uninterrupted or error-free operation.
        </p>

        <h3>9. Account Suspension</h3>
        <p>
          We may suspend or terminate an account that violates these Terms, engages in fraudulent
          activity, or poses a risk to other users, with or without prior notice where circumstances
          require it.
        </p>

        <h3>10. Changes to These Terms</h3>
        <p>
          We may update these Terms from time to time as the Platform evolves. Continued use of the
          Platform after changes are posted constitutes acceptance of the revised Terms.
        </p>

        <h3>11. Governing Law</h3>
        <p>
          These Terms are governed by the laws of the State of Qatar, without regard to its conflict
          of law provisions.{' '}
          <em>
            (Placeholder — to be confirmed with legal counsel given the Platform's cross-border
            operations between Qatar and Sri Lanka.)
          </em>
        </p>

        <h3>12. Contact</h3>
        <p>
          Questions about these Terms can be sent to{' '}
          <a href={`mailto:${supportEmail}`} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
            {supportEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
