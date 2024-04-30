import pg from 'pg';
import { InsertMovie, InsertRating, movies, ratings } from './schema.js';
import { drizzle } from 'drizzle-orm/node-postgres';
import { faker } from '@faker-js/faker';

const { Client } = pg;
const connectionString = 'postgres://postgres@localhost:5432/opentelemetry';

const main = async () => {
  console.log('seeding database');

  const client = new Client({ connectionString });
  await client.connect();
  const db = drizzle(client);

  const movieData: InsertMovie[] = [];

  for (let i = 0; i < 100; i++) {
    movieData.push({
      title: `The ${faker.word.adjective()} ${faker.word.noun()}`,
    });
  }

  const insertResult = await db
    .insert(movies)
    .values(movieData)
    .returning({ insertedId: movies.id });

  // create 1000 ratings for each movie
  const ratingData: InsertRating[] = insertResult.flatMap((movie) => {
    const ratings = [];
    for (let i = 0; i < 1000; i++) {
      ratings.push({
        movieId: movie.insertedId,
        rating: faker.number.int({ min: 1, max: 5 }),
      });
    }
    return ratings;
  });

  // break each rating data into chunks of 100 and then insert those chunks
  const chunkedRatingData = [];
  while (ratingData.length) {
    chunkedRatingData.push(ratingData.splice(0, 100));
  }

  for (const chunk of chunkedRatingData) {
    await db.insert(ratings).values(chunk);
  }
};

main()
  .then(() => {
    console.log('Seeded database with 100 movies and 1000 ratings each.');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
