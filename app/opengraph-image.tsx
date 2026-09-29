import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Tanuj Jenna — AI-Native Developer'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#05060a',
          padding: 84,
          position: 'relative',
        }}
      >
        {/* glow */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(34,211,238,0.30) 0%, rgba(5,6,10,0) 68%)',
          }}
        />

        {/* TJ mark */}
        <svg width="92" height="92" viewBox="0 0 100 100" style={{ marginBottom: 34 }}>
          <path d="M22 8 H78 L92 22 V78 L78 92 H22 L8 78 V22 Z" stroke="#22d3ee" strokeWidth="3" strokeLinejoin="round" fill="none" opacity="0.5" />
          <path d="M24 34 H52 M38 34 V70" stroke="#22d3ee" strokeWidth="8" strokeLinecap="square" fill="none" />
          <path d="M74 30 V58 Q74 70 63 70 Q55 70 53 62" stroke="#38bdf8" strokeWidth="8" strokeLinecap="square" fill="none" />
        </svg>

        <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, color: '#ffffff', letterSpacing: -1.5 }}>
          Tanuj Jenna
        </div>

        <div style={{ display: 'flex', fontSize: 38, color: '#22d3ee', marginTop: 16 }}>
          I build applications where AI does real work.
        </div>

        <div style={{ display: 'flex', fontSize: 25, color: 'rgba(255,255,255,0.50)', marginTop: 22 }}>
          Web · Mobile · Backend · AI — from requirement to deployment
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 7,
            background: 'linear-gradient(90deg, #22d3ee, #38bdf8, #22d3ee)',
          }}
        />
      </div>
    ),
    size,
  )
}
