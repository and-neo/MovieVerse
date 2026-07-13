import mongoose from "mongoose";

/**
 * User model.
 *
 * Stores account information for registered users of the application.
 * Passwords are stored as hashed values using bcrypt.
 */

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        profileImage: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("User", userSchema);
