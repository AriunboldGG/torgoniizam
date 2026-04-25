import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Торгоны зам - Онлайн дуудлага худалдааны платформ'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  const logoData = readFileSync(join(process.cwd(), 'public/svg/header/main-logo-light.svg'))
  const logoSrc = `data:image/svg+xml;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0e1117 0%, #1a1d2e 60%, #131316 100%)',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top orange strip */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: '#FF4405',
          }}
        />

        {/* Bottom orange strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: '#FF4405',
          }}
        />

        {/* Orange glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,68,5,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            zIndex: 1,
          }}
        >
          {/* Main logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={400}
            height={256}
            alt="Торгоны зам"
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 500,
              color: '#c4cedf',
              letterSpacing: '1px',
            }}
          >
            Онлайн дуудлага худалдааны платформ
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
