/**
 * PageHero — a consistent dark-navy banner with decorative gold corner
 * ornaments, used as the top section of every standard page.
 * Props:
 *   eyebrow  {string}   — small uppercase label above the title
 *   title    {string}   — main heading (h1)
 *   subtitle {string}   — short description below the title
 */
export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <div className="page-hero" aria-label={title}>
      {/* Decorative gold corner ornaments — match the home hero style */}
      <div className="page-hero-corner page-hero-corner--tl" aria-hidden="true" />
      <div className="page-hero-corner page-hero-corner--tr" aria-hidden="true" />
      <div className="page-hero-corner page-hero-corner--bl" aria-hidden="true" />
      <div className="page-hero-corner page-hero-corner--br" aria-hidden="true" />

      {/* Content */}
      <div className="page-hero-content">
        {eyebrow && (
          <span className="page-hero-eyebrow">{eyebrow}</span>
        )}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && (
          <p className="page-hero-subtitle">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
