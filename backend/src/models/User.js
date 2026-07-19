import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const libraryItemSchema = new mongoose.Schema(
    {
        contentType: {
            type: String,
            enum: ["movie", "tv"],
            required: true,
        },

        tmdbId: {
            type: Number,
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        posterPath: {
            type: String,
            default: null,
        },

        addedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    },
);

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required."],
            unique: true,
            trim: true,
            minlength: [3, "Username must contain at least 3 characters."],
            maxlength: [30, "Username cannot exceed 30 characters."],
        },

        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address.",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: [8, "Password must contain at least 8 characters."],
            select: false,
        },

        avatarUrl: {
            type: String,
            default: null,
            trim: true,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        favorites: {
            type: [libraryItemSchema],
            default: [],
        },

        watchlist: {
            type: [libraryItemSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

/**
 * Hashes the user's password before saving it.
 */

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12);
});

/**
 * Compares a plain-text password with the stored password hash.
 */

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
