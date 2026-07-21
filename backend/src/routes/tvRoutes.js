import express from "express";

import {
    getPopularTvShowsController,
    getTrendingTvShowsController,
    getTvShowDetailsController,
} from "../controllers/tvController.js";

const router = express.Router();

router.get("/trending", getTrendingTvShowsController);
router.get("/popular", getPopularTvShowsController);
router.get("/:tvId", getTvShowDetailsController);

export default router;
