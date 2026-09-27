'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import type { Trick } from '@/lib/tricks'
import { cn } from '@/lib/utils'
import { TrickList } from './trick-list'
import { TrickDetail } from './trick-detail'

export function TrickBrowser({ tricks, initialSlug }: { tricks: Trick[]; initialSlug?: string }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedSlug, setSelectedSlug] = useState(initialSlug)
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)

  const categories = useMemo(() => ['All', ...Array.from(new Set(tricks.map((t) => t.category))).sort()], [tricks])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tricks.filter(
      (t) =>
        (category === 'All' || t.category === category) &&
        (!q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || (t.creator ?? '').toLowerCase().includes(q)),
    )
  }, [tricks, query, category])

  const selected = tricks.find((t) => t.slug === selectedSlug)

  function selectTrick(slug: string) {
    setSelectedSlug(slug)
    setMobileDetailOpen(true)
    const url = new URL(window.location.href)
    url.searchParams.set('trick', slug)
    window.history.replaceState(null, '', url)
  }

  if (tricks.length === 0) {
    return <p className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">No tricks in the database yet.</p>
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
      <section aria-label="Trick library" className={cn('flex w-full flex-col gap-4 md:w-80 md:shrink-0', mobileDetailOpen && 'hidden md:flex')}>
        <label className="relative block">
          <span className="sr-only">Search tricks</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search moves, creators…"
            className="h-10 w-full rounded-md border bg-card pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                category === c ? 'border-foreground bg-foreground text-background' : 'bg-card hover:border-foreground/40',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <TrickList tricks={filtered} selectedSlug={selectedSlug} onSelect={selectTrick} />
      </section>

      <section aria-label="Trick details" className={cn('min-w-0 flex-1 md:sticky md:top-6', !mobileDetailOpen && 'hidden md:block')}>
        <button
          type="button"
          onClick={() => setMobileDetailOpen(false)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground md:hidden"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All tricks
        </button>
        {selected ? (
          <TrickDetail key={selected.slug} trick={selected} />
        ) : (
          <p className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">Pick a trick to get started.</p>
        )}
      </section>
    </div>
  )
}
