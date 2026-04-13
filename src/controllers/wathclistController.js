import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { movieId, status, rating, notes, userId } = req.body || {};

    if (!movieId || !userId) {
      return res.status(400).json({
        error: "movieId and userId are required",
      });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: Number(movieId) },
    });

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    const existingInWatchlist = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: Number(userId),
          movieId: Number(movieId),
        },
      },
    });

    if (existingInWatchlist) {
      return res.status(400).json({
        message: "Movie already in watchlist",
      });
    }

    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId: Number(userId),
        movieId: Number(movieId),
        status: status || "PLANNED",
        rating: rating ?? null,
        notes: notes || null,
      },
    });

    return res.status(201).json({
      status: "success",
      data: {
        watchlistItem,
      },
    });
  } catch (error) {
    console.error("Add to watchlist error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
