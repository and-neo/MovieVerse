import "dotenv/config";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import errorMiddleware from "./middleware/errorMiddleware.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import tvRoutes from "./routes/tvRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

const app = express();

// Security middleware

app.use(helmet());

// Request middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development logging

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Health-check route

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "MovieVerse API is running.",
    });
});

// API routes

app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/search", searchRoutes);

// Undefined routes

app.use(notFoundMiddleware);

// Global error handler

app.use(errorMiddleware);

export default app;
