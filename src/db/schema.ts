import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
});

export const ratings = pgTable('ratings', {
  id: serial('id').primaryKey(),
  movieId: integer('movie_id').references(() => movies.id),
  rating: integer('rating').notNull(),
});

export type InsertMovie = typeof movies.$inferInsert;
export type Movie = typeof movies.$inferSelect;
export type InsertRating = typeof ratings.$inferInsert;
export type Rating = typeof ratings.$inferSelect;
