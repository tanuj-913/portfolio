'use client'

export default function Logo({
  size = 34,
  animated = true,
}: {
  size?: number
  animated?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-label="TJ"
      role="img"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="tj-stroke" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>

      {/* notched frame — cut corners read as 'engineered' rather than generic */}
      <path
        d="M22 4 H78 L96 22 V78 L78 96 H22 L4 78 V22 Z"
        stroke="url(#tj-stroke)"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* rotating inner ring */}
      <g
        style={
          animated
            ? { transformOrigin: '50px 50px', animation: 'tj-spin 12s linear infinite' }
            : undefined
        }
      >
        <circle cx="50" cy="50" r="40" stroke="#22d3ee" strokeWidth="1" strokeDasharray="6 10" opacity="0.35" />
      </g>

      {/* T */}
      <path
        d="M24 34 H52 M38 34 V70"
        stroke="url(#tj-stroke)"
        strokeWidth="7"
        strokeLinecap="square"
      />

      {/* J — shares the baseline, hooks left */}
      <path
        d="M74 30 V58 Q74 70 63 70 Q55 70 53 62"
        stroke="url(#tj-stroke)"
        strokeWidth="7"
        strokeLinecap="square"
        fill="none"
      />

      <style>{`@keyframes tj-spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  )
}
