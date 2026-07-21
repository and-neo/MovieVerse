import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        contentType: {
            type: String,
            enum: ["movie", "tv"],
            required: true,
        },

        tmdbId: {
            type: Number,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: [1, "Rating must be at least 1."],
            max: [10, "Rating cannot exceed 10."],
        },

        reviewText: {
            type: String,
            required: true,
            trim: true,
            minlength: [10, "Review must contain at least 10 characters."],
            maxlength: [2000, "Review cannot exceed 2000 characters."],
        },
    },
    {
        timestamps: true,
    },
);

reviewSchema.index(
    {
        user: 1,
        contentType: 1,
        tmdbId: 1,
    },
    {
        unique: true,
    },
);

reviewSchema.index({
    contentType: 1,
    tmdbId: 1,
    createdAt: -1,
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
