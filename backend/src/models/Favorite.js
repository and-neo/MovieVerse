import mongoose from "mongoose";

/**
 * Favorite model.
 *
 * Stores the movies and TV shows that a user has added
 * to their personal favorites list.
 */

const favoriteSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Favorite", favoriteSchema);
