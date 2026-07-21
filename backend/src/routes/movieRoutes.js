import express from "express";

import {
    getMovieDetailsController,
    getPopularMoviesController,
    getTrendingMoviesController,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/trending", getTrendingMoviesController);
router.get("/popular", getPopularMoviesController);
router.get("/:movieId", getMovieDetailsController);

export default router;
