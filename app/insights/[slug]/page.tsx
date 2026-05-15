import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | Nucleus Design`,
    description: post.excerpt,
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const posts = getAllPosts()
  if (!posts.find((p) => p.slug === slug)) notFound()

  const post = await getPostBySlug(slug)

  return (
    <>
      <Navbar />

      {/* Cover image hero */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover object-center"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#0A0A14]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/40 to-transparent" />
      </div>

      {/* Article header */}
      <div className="bg-[#0A0A14] px-6 md:px-12 pb-16 -mt-1">
        <div className="max-w-3xl mx-auto text-center pt-12">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: 'rgba(123,97,255,0.15)', color: '#7B61FF' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1
            className="drama text-[#F0EFF4] leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-[#F0EFF4]/35">
            <span className="mono text-xs">{post.author}</span>
            <span className="w-px h-3 bg-[#F0EFF4]/20" />
            <span className="mono text-xs">{formatDate(post.date)}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="bg-[#F0EFF4] px-6 md:px-12 py-20">
        <div
          className="max-w-2xl mx-auto prose-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Back link */}
      <div className="bg-[#F0EFF4] px-6 md:px-12 pb-20">
        <div className="max-w-2xl mx-auto border-t border-[#0A0A14]/10 pt-10">
          <Link
            href="/insights"
            className="text-[#7B61FF] text-sm font-medium hover:text-[#7B61FF]/70 transition-colors"
          >
            ← Back to Insights
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}
