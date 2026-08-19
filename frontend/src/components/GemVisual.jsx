// Shared visual language for gemstone types: a background gradient +
// faceted SVG illustration (used when a listing has no photo yet), plus
// a small colored pill badge. Keeping this in one file means the grid
// and the detail page always render a gem type identically.

export const GEM_THEME = {
  sapphire: { gradientFrom: '#0d47a1', gradientTo: '#1976d2', fill: '#1565C0', accent: '#42A5F5', badgeBg: '#E3F2FD', badgeText: '#0d47a1' },
  catseye: { gradientFrom: '#4e342e', gradientTo: '#8d6e63', fill: '#5D4037', accent: '#AFB42B', badgeBg: '#EFEBE9', badgeText: '#4e342e' },
  moonstone: { gradientFrom: '#78909c', gradientTo: '#b0bec5', fill: '#78909c', accent: '#E0F7FA', badgeBg: '#ECEFF1', badgeText: '#455A64' },
  spinel: { gradientFrom: '#5c0632', gradientTo: '#ad1457', fill: '#880E4F', accent: '#EC407A', badgeBg: '#FCE4EC', badgeText: '#880E4F' },
  alexandrite: { gradientFrom: '#004d40', gradientTo: '#00796b', fill: '#004D40', accent: '#26A69A', badgeBg: '#E0F2F1', badgeText: '#004D40' },
  ruby: { gradientFrom: '#880e4f', gradientTo: '#d32f2f', fill: '#B71C1C', accent: '#FF5252', badgeBg: '#FFEBEE', badgeText: '#B71C1C' },
  other: { gradientFrom: '#ff6f00', gradientTo: '#ffa000', fill: '#E65100', accent: '#FFB300', badgeBg: '#FFF3E0', badgeText: '#E65100' },
};

export function getGemTheme(gemType) {
  return GEM_THEME[gemType] || GEM_THEME.other;
}

export function GemIllustration({ gemType, height = 200 }) {
  const theme = getGemTheme(gemType);
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height,
      }}
    >
      <svg viewBox="0 0 100 100" width={height * 0.4} height={height * 0.4}>
        <polygon points="50,10 85,35 85,65 50,90 15,65 15,35" fill={theme.fill} stroke="#FFF" strokeWidth="2" />
        <polygon points="50,10 50,90 15,35 85,35" fill="rgba(255,255,255,0.15)" />
        <polygon points="50,25 70,40 70,60 50,75 30,60 30,40" fill={theme.accent} />
      </svg>
    </div>
  );
}

export function GemTypeBadge({ gemType, label }) {
  const theme = getGemTheme(gemType);
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '0.3rem 0.7rem',
        borderRadius: '999px',
        background: theme.badgeBg,
        color: theme.badgeText,
      }}
    >
      {label}
    </span>
  );
}
