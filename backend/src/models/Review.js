import mongoose from "mongoose";

/**
 * Review model.
 *
 * Stores user reviews and ratings for movies and TV shows.
 * References a registered user and a TMDB media item.
 */

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        tmdbId: {
            type: Number,
            required: true,
        },

        mediaType: {
            type: String,
            enum: ["movie", "tv"],
            required: true,
        },

        rating: {
            type: Number,
            required: true,
        },

        title: {
            type: String,
            default: "",
        },

        reviewText: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Review", reviewSchema);
