import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import AffiliateLink from '../../../components/AffiliateLink'

interface Props {
  source: any
}

export default function ProjectPage({ source }: Props) {
  return <MDXRemote {...source} components={{ AffiliateLink }} />
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/projects'))
  return files.map((filename) => ({
    slug: filename.replace('.mdx', '')
  }))
}

export async function generateMetadata({ params }: { params: { slug: string }}) {
  const filePath = path.join(process.cwd(), 'content/projects', `${params.slug}.mdx`)
  const content = fs.readFileSync(filePath, 'utf8')
  const frontmatter = content.match(/---\n([\s\S]*?)\n---/)?.[1] || ''
  return { title: frontmatter.match(/title: "(.*)"/)?.[1] || 'Project' }
}

export async function generatePage({ params }: { params: { slug: string }}) {
  const filePath = path.join(process.cwd(), 'content/projects', `${params.slug}.mdx`)
  const content = fs.readFileSync(filePath, 'utf8')
  const mdxSource = await serialize(content)
  return { source: mdxSource }
}
