import { cn } from '@/lib/utils'

const LABELS = ['Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert']

export function difficultyLabel(level: number) {
  return LABELS[Math.min(Math.max(level, 1), 5) - 1]
}

export function DifficultyMeter({ level, showLabel = false }: { level: number; showLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex gap-0.5" aria-hidden="true">
        {LABELS.map((_, i) => (
          <span
            key={i}
            className={cn('h-3 w-2 rounded-[2px] border', i < level ? 'border-primary bg-primary' : 'border-border bg-transparent')}
          />
        ))}
      </span>
      {showLabel ? (
        <span className="text-sm">{difficultyLabel(level)}</span>
      ) : (
        <span className="sr-only">{`Difficulty: ${difficultyLabel(level)}`}</span>
      )}
    </span>
  )
}
