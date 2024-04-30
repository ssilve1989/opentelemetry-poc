CREATE TABLE IF NOT EXISTS "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer,
	"rating" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ratings" ADD CONSTRAINT "ratings_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
