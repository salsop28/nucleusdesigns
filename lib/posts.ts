import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDir = path.join(process.cwd(), 'content', 'posts')

export type PostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage: string
  tags: string[]
  author: string
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        coverImage: data.coverImage ?? '',
        tags: data.tags ?? [],
        author: data.author ?? 'Nucleus Design',
      } satisfies PostMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<PostMeta & { content: string }> {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), 'utf-8')
  const { data, content: body } = matter(raw)
  const content = await marked(body)
  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    coverImage: data.coverImage ?? '',
    tags: data.tags ?? [],
    author: data.author ?? 'Nucleus Design',
    content,
  }
}
