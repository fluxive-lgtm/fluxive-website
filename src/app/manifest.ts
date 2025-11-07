import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FLUXIVE - Premium IT Services',
    short_name: 'FLUXIVE',
    description: 'Premium IT Services, Marketing Solutions, AI Automation, Web Development, Penetration Testing, and Cybersecurity',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#00DC82',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/fluxive-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
