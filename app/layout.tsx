import type { Metadata } from 'next'
import { Sora, Instrument_Serif, Fira_Code } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  style: 'italic',
  weight: '400',
  variable: '--font-instrument',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-fira',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Website Design Agency | Nucleus Designs',
  description:
    'Nucleus Designs is a Central Coast website design agency crafting beautiful, strategic websites. From strategy to execution, we deliver results. Book a consultation.',
  alternates: {
    canonical: 'https://nucleusdesigns.com',
  },
  openGraph: {
    title: 'Website Design Agency | Nucleus Designs',
    description:
      'Nucleus Designs is a Central Coast website design agency crafting beautiful, strategic websites. From strategy to execution, we deliver results. Book a consultation.',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Design Agency | Nucleus Designs',
    description:
      'Nucleus Designs is a Central Coast website design agency crafting beautiful, strategic websites. From strategy to execution, we deliver results. Book a consultation.',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${instrumentSerif.variable} ${firaCode.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Nucleus Designs',
                description:
                  'A website design agency on the Central Coast of Australia, building beautiful, strategic websites.',
                url: 'https://nucleusdesigns.com',
                email: 'hello@nucleusdesigns.com',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Central Coast',
                  addressRegion: 'NSW',
                  addressCountry: 'AU',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: 'Website Design & Development',
                provider: { '@type': 'Organization', name: 'Nucleus Designs' },
                description:
                  'Strategic website design and development for businesses on the Central Coast of Australia.',
                areaServed: 'Central Coast, NSW, Australia',
              },
            ]),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
