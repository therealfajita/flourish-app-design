import { asc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { trickLinks, tricks } from '@/lib/db/schema'

export type TrickLink = {
  id: number
  kind: 'tutorial' | 'performance'
  title: string
  source: string
  url: string
  note: string | null
}

export type Trick = {
  id: number
  slug: string
  name: string
  category: string
  difficulty: number
  creator: string | null
  description: string
  tutorials: TrickLink[]
  performances: TrickLink[]
}

export async function getTricks(): Promise<Trick[]> {
  const [trickRows, linkRows] = await Promise.all([
    db.select().from(tricks).orderBy(asc(tricks.difficulty), asc(tricks.name)),
    db.select().from(trickLinks).orderBy(asc(trickLinks.id)),
  ])

  return trickRows.map((trick) => {
    const links = linkRows.filter((link) => link.trickId === trick.id)
    const toLink = ({ id, kind, title, source, url, note }: (typeof linkRows)[number]): TrickLink => ({
      id,
      kind,
      title,
      source,
      url,
      note,
    })
    return {
      id: trick.id,
      slug: trick.slug,
      name: trick.name,
      category: trick.category,
      difficulty: trick.difficulty,
      creator: trick.creator,
      description: trick.description,
      tutorials: links.filter((l) => l.kind === 'tutorial').map(toLink),
      performances: links.filter((l) => l.kind === 'performance').map(toLink),
    }
  })
}
