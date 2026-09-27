import { Spade } from 'lucide-react'

export function SiteHeader({ trickCount }: { trickCount: number }) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-8 pb-8 md:px-8 md:pt-12 md:pb-10">
      <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground">
        <Spade className="size-4 fill-primary text-primary" aria-hidden="true" />
        <span className="uppercase">Flourish</span>
      </div>
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h1 className="max-w-2xl font-serif text-4xl leading-tight text-balance md:text-6xl">
          Learn cardistry, one move at a time.
        </h1>
        <p className="max-w-sm text-pretty text-muted-foreground md:text-right">
          {trickCount} moves, each with a plain-English breakdown, hand-picked tutorials, and
          examples of how performers use it on stage.
        </p>
      </div>
    </header>
  )
}
