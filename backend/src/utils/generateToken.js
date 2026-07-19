import jwt from "jsonwebtoken";

/**
 * Generates a signed JWT for an authenticated user.
 */

function generateToken(userId) {
    if (!process.env.JWT_SECRET) {
        throw new Error(
            "JWT_SECRET is not defined in the environment variables.",
        );
    }

    return jwt.sign(
        {
            userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        },
    );
}

export default generateToken;
