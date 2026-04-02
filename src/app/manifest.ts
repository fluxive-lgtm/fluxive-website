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
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
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
