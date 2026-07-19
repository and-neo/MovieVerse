import jwt from "jsonwebtoken";

import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

/**
 * Protects routes by validating the JWT token.
 */

const protect = catchAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Not authorized. No token provided.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
        return next(
            new AppError(
                "The user associated with this token no longer exists.",
                401,
            ),
        );
    }

    req.user = user;

    next();
});

export { protect };
