import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import generateToken from "../utils/generateToken.js";

/**
 * Registers a new user and returns an authentication token.
 */

const registerUser = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(
            new AppError("Username, email and password are required.", 400),
        );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });

    if (existingUser) {
        const message =
            existingUser.email === normalizedEmail
                ? "Email is already in use."
                : "Username is already in use.";

        return next(new AppError(message, 409));
    }

    const user = await User.create({
        username: normalizedUsername,
        email: normalizedEmail,
        password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
        status: "success",
        data: {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl,
                role: user.role,
                favorites: user.favorites,
                watchlist: user.watchlist,
                createdAt: user.createdAt,
            },
        },
    });
});

/**
 * Authenticates a user and returns an authentication token.
 */

const loginUser = catchAsync(async (req, res, next) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return next(
            new AppError("Email or username and password are required.", 400),
        );
    }

    const normalizedIdentifier = identifier.trim().toLowerCase();

    const user = await User.findOne({
        $or: [
            { email: normalizedIdentifier },
            { username: normalizedIdentifier },
        ],
    }).select("+password");

    if (!user) {
        return next(new AppError("Invalid email, username or password.", 401));
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        return next(new AppError("Invalid email, username or password.", 401));
    }

    const token = generateToken(user._id);

    res.status(200).json({
        status: "success",
        data: {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl,
                role: user.role,
                favorites: user.favorites,
                watchlist: user.watchlist,
                createdAt: user.createdAt,
            },
        },
    });
});

/**
 * Returns the authenticated user's profile.
 */

const getProfile = catchAsync(async (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                avatarUrl: req.user.avatarUrl,
                role: req.user.role,
                favorites: req.user.favorites,
                watchlist: req.user.watchlist,
                createdAt: req.user.createdAt,
            },
        },
    });
});

export { loginUser, registerUser, getProfile };
