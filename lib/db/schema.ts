import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const tricks = pgTable('tricks', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  difficulty: integer('difficulty').notNull(),
  creator: text('creator'),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }),
})

export const trickLinks = pgTable('trick_links', {
  id: serial('id').primaryKey(),
  trickId: integer('trick_id').notNull(),
  kind: text('kind').$type<'tutorial' | 'performance'>().notNull(),
  title: text('title').notNull(),
  source: text('source').notNull(),
  url: text('url').notNull(),
  note: text('note'),
})
