import { SiteHeader } from '@/components/site-header'
import { TrickBrowser } from '@/components/trick-browser'
import { getTricks } from '@/lib/tricks'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ trick?: string }>
}) {
  const [{ trick }, tricks] = await Promise.all([searchParams, getTricks()])
  const initialSlug = tricks.some((t) => t.slug === trick) ? trick : tricks[0]?.slug

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader trickCount={tricks.length} />
      <main className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <TrickBrowser tricks={tricks} initialSlug={initialSlug} />
      </main>
    </div>
  )
}
