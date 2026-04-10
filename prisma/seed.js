import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "27984097-e7d8-4477-9d78-058bd2b4c80d";

const movies = [
  {
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, and others intertwine.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runtime: 154,
    posterUrl: "https://example.com/pulpfiction.jpg",
    userId: userId,
  },
  {
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    userId: userId,
  },
];

const main = async () => {
  console.log("Seeding movies...");

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${movie.title}`);
  }
  console.log("Seeding completed.");
};

main()
  .catch((err) => {
    console.error("Error seeding data:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
