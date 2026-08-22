import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t, language } = useLanguage();

  return (
    <div className="services-page-outer" style={{ padding: '6rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
      <section style={{ maxWidth: '760px', margin: '0 auto 3rem', textAlign: 'center' }}>
        <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
          {language === 'en' ? 'What We Offer' : 'ماذا نقدم'}
        </span>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1.25rem', fontFamily: 'var(--font-title)' }}>
          {language === 'en' ? 'Two Direct Pathways to Trade' : 'مساران مباشران للتجارة'}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
          {language === 'en'
            ? 'Ceylon Gem Souq exists to remove the layers between Sri Lankan gem owners and serious buyers across the Middle East. Here is exactly what that looks like for each side.'
            : 'يهدف سوق أحجار سيلان الكريمة إلى إزالة الطبقات الوسيطة بين مالكي الأحجار السريلانكيين والمشترين الجادين في الشرق الأوسط. إليك بالضبط كيف يبدو ذلك لكل طرف.'}
        </p>
      </section>

      <section style={{ margin: '4rem auto' }}>
        <div className="role-split-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }}>
          {/* Card 1: For Buyers */}
          <div className="role-card" style={{ padding: '3rem 2.5rem', background: '#061224', border: '1px solid rgba(197, 168, 92, 0.25)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem' }}>
            <div className="role-card-icon-wrap" style={{ color: 'var(--color-accent)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h4 className="role-card-title" style={{ color: 'white', fontSize: '1.5rem', fontFamily: 'var(--font-title)', margin: '0' }}>
              {language === 'en' ? 'For Discerning Buyers' : 'للمشترين وهواة الاقتناء'}
            </h4>
            <p className="role-card-desc" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6', margin: '0', flexGrow: 1 }}>
              {language === 'en'
                ? "Browse verified, lab-certified Ceylon sapphires, rubies, and alexandrites directly from the source. Coordinate secure payments and logistics with full trade protection."
                : "تصفح الياقوت السيلاني والسبينيل المعتمد والموثق مخبرياً مباشرة من المصدر. نسق المدفوعات والخدمات اللوجستية الآمنة مع حماية كاملة للتجارة."}
            </p>
            <Link to="/listings" className="btn btn-outline" style={{ borderColor: '#C5A85C', color: '#C5A85C', padding: '0.75rem 1.5rem', borderRadius: '6px', border: '1px solid #C5A85C', textDecoration: 'none', fontWeight: '600' }}>
              {language === 'en' ? 'Explore the Collection' : 'استكشف المجموعة'}
            </Link>
          </div>

          {/* Card 2: For Owners */}
          <div className="role-card" style={{ padding: '3rem 2.5rem', background: '#061224', border: '1px solid rgba(197, 168, 92, 0.25)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem' }}>
            <div className="role-card-icon-wrap" style={{ color: 'var(--color-accent)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h4 className="role-card-title" style={{ color: 'white', fontSize: '1.5rem', fontFamily: 'var(--font-title)', margin: '0' }}>
              {language === 'en' ? 'For Gem & Mine Owners' : 'لأصحاب الأحجار والمناجم'}
            </h4>
            <p className="role-card-desc" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6', margin: '0', flexGrow: 1 }}>
              {language === 'en'
                ? "List your rough or cut inventory, showcase official laboratory reports, and sell directly to high-net-worth buyers in Doha and across the Middle East."
                : "اعرض مخزونك من الأحجار المصقولة أو الخام، واعرض تقارير المختبرات الرسمية، وبع مباشرة للمشترين ذوي الملاءة المالية في الدوحة والشرق الأوسط."}
            </p>
            <Link to="/register?role=owner" className="btn btn-secondary" style={{ background: '#C5A85C', color: '#020a16', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>
              {language === 'en' ? 'Register as Seller' : 'سجل كبائع'}
            </Link>
          </div>
        </div>
      </section>

      {/* What happens next, for both sides */}
      <section
        style={{ maxWidth: '880px', margin: '0 auto 2rem', padding: '2.5rem 3rem', background: '#061224', border: '1px solid rgba(197,168,92,0.15)', borderRadius: '12px', textAlign: 'center' }}
      >
        <h3 style={{ color: 'var(--color-accent)', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-title)' }}>
          {language === 'en' ? 'What We Don’t Do' : 'ما لا نقوم به'}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem', lineHeight: '1.75', margin: '0' }}>
          {language === 'en'
            ? "We don't hold your money, and we don't own or sell gemstones ourselves. Once a booking is accepted, buyer and seller finalize price and logistics directly between themselves — our role ends at making sure the listing was reviewed and the introduction was real."
            : "نحن لا نحتفظ بأموالكم، ولا نملك الأحجار الكريمة أو نبيعها بأنفسنا. بمجرد قبول طلب الحجز، يتفق البائع والمشتري مباشرة على السعر والتفاصيل اللوجستية؛ ينتهي دورنا عند التأكد من مراجعة المعروض وصحة التعارف."}
        </p>
      </section>
    </div>
  );
}
