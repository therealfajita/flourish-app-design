import { ArrowUpRight, GraduationCap, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Trick, TrickLink } from '@/lib/tricks'
import { DifficultyMeter } from './difficulty-meter'

export function TrickDetail({ trick }: { trick: Trick }) {
  return (
    <article className="rounded-xl border bg-card p-6 md:p-10">
      <p className="text-xs font-semibold tracking-widest text-primary uppercase">{trick.category}</p>
      <h2 className="mt-2 font-serif text-4xl text-balance md:text-5xl">{trick.name}</h2>

      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y py-4 text-sm">
        <div className="flex flex-col gap-1">
          <dt className="text-xs text-muted-foreground">Difficulty</dt>
          <dd>
            <DifficultyMeter level={trick.difficulty} showLabel />
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-xs text-muted-foreground">Origin</dt>
          <dd>{trick.creator ?? 'Unknown'}</dd>
        </div>
      </dl>

      <p className="mt-6 max-w-prose text-lg leading-relaxed text-pretty">{trick.description}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <LinkGroup icon={GraduationCap} title="Learn it" subtitle="Video tutorials" links={trick.tutorials} />
        <LinkGroup icon={Sparkles} title="See it in action" subtitle="Performances & shows" links={trick.performances} />
      </div>
    </article>
  )
}

function LinkGroup({
  icon: Icon,
  title,
  subtitle,
  links,
}: {
  icon: LucideIcon
  title: string
  subtitle: string
  links: TrickLink[]
}) {
  return (
    <section>
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">{`· ${subtitle}`}</span>
      </div>
      {links.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No links yet.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-lg border bg-background p-4 transition-colors hover:border-foreground/40"
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="font-medium text-pretty">{link.title}</span>
                  {link.note && <span className="text-sm text-muted-foreground text-pretty">{link.note}</span>}
                  <span className="text-xs font-medium text-primary">{link.source}</span>
                </span>
                <ArrowUpRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
