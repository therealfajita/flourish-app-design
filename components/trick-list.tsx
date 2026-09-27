import type { Trick } from '@/lib/tricks'
import { cn } from '@/lib/utils'
import { DifficultyMeter } from './difficulty-meter'

export function TrickList({
  tricks,
  selectedSlug,
  onSelect,
}: {
  tricks: Trick[]
  selectedSlug?: string
  onSelect: (slug: string) => void
}) {
  if (tricks.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No moves match your search.</p>
  }

  return (
    <ul className="flex flex-col divide-y rounded-lg border bg-card">
      {tricks.map((trick) => {
        const active = trick.slug === selectedSlug
        return (
          <li key={trick.id}>
            <button
              type="button"
              onClick={() => onSelect(trick.slug)}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors first:rounded-t-lg hover:bg-muted',
                active && 'bg-muted',
              )}
            >
              <span className="flex min-w-0 flex-col">
                <span className={cn('truncate font-medium', active && 'text-primary')}>{trick.name}</span>
                <span className="truncate text-xs text-muted-foreground">{trick.category}</span>
              </span>
              <DifficultyMeter level={trick.difficulty} />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
