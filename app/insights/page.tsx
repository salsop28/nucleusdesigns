import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Insights | Nucleus Design',
  description:
    'Perspectives on web design, digital strategy, and building websites that convert — from the team at Nucleus Design.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function InsightsPage() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />

      {/* Hero banner */}
      <section className="relative bg-[#0A0A14] pt-40 pb-24 px-6 md:px-12 overflow-hidden">
        {/* Plasma radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(123,97,255,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          <div className="eyebrow text-[#7B61FF]/80 mb-6">Perspectives &amp; Ideas</div>
          <h1
            className="drama text-[#F0EFF4] leading-none mb-6"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
          >
            Insights.
          </h1>
          <p className="text-[#F0EFF4]/50 text-lg max-w-xl leading-relaxed">
            Design strategy, web craft, and what we&rsquo;ve learned building websites for Central
            Coast businesses.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <main className="bg-[#F0EFF4] px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-[#0A0A14]/40 text-center py-24">No posts yet — check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  {post.coverImage && (
                    <Link href={`/insights/${post.slug}`} className="block overflow-hidden rounded-[1.5rem] m-3">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={800}
                        height={450}
                        className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  )}

                  <div className="flex flex-col flex-1 p-7">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                            style={{ background: 'rgba(123,97,255,0.1)', color: '#7B61FF' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="font-bold text-[#0A0A14] text-xl leading-snug mb-3">
                      <Link
                        href={`/insights/${post.slug}`}
                        className="hover:text-[#7B61FF] transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-[#0A0A14]/60 text-sm leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#0A0A14]/8">
                      <span className="mono text-[#0A0A14]/35 text-xs">
                        {formatDate(post.date)}
                      </span>
                      <Link
                        href={`/insights/${post.slug}`}
                        className="text-[#7B61FF] text-sm font-medium hover:text-[#7B61FF]/70 transition-colors duration-200"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
