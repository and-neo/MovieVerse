import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, createReview);

router.get("/:contentType/:tmdbId", getReviews);

router
    .route("/:reviewId")
    .patch(protect, updateReview)
    .delete(protect, deleteReview);

export default router;
