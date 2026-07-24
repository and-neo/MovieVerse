import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
    addFavorite,
    getFavorites,
    removeFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.route("/").get(protect, getFavorites).post(protect, addFavorite);
router.delete("/:contentType/:tmdbId", protect, removeFavorite);

export default router;
