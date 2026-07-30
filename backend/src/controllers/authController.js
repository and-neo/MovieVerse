import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import generateToken from "../utils/generateToken.js";
import Review from "../models/Review.js";

function formatUserResponse(user) {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
        favorites: user.favorites,
        watchlist: user.watchlist,
        createdAt: user.createdAt,
    };
}

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

/**
 * Updates the authenticated user's profile information.
 */

const updateProfile = catchAsync(async (req, res, next) => {
    const { username } = req.body;

    if (!username || typeof username !== "string") {
        return next(new AppError("Username is required.", 400));
    }

    const normalizedUsername = username.trim().toLowerCase();

    if (normalizedUsername.length < 3) {
        return next(
            new AppError("Username must contain at least 3 characters.", 400),
        );
    }

    if (normalizedUsername === req.user.username) {
        return next(new AppError("Please enter a different username.", 400));
    }

    const existingUser = await User.findOne({
        username: normalizedUsername,
        _id: { $ne: req.user._id },
    });

    if (existingUser) {
        return next(new AppError("Username is already in use.", 409));
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            username: normalizedUsername,
        },
        {
            new: true,
            runValidators: true,
        },
    );

    if (!updatedUser) {
        return next(new AppError("User account not found.", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            user: formatUserResponse(updatedUser),
        },
    });
});

/**
 * Updates the authenticated user's password.
 */

const updatePassword = catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return next(
            new AppError(
                "Current password and new password are required.",
                400,
            ),
        );
    }

    if (newPassword.length < 8) {
        return next(
            new AppError(
                "The new password must contain at least 8 characters.",
                400,
            ),
        );
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
        return next(new AppError("User account not found.", 404));
    }

    const isCurrentPasswordCorrect =
        await user.comparePassword(currentPassword);

    if (!isCurrentPasswordCorrect) {
        return next(new AppError("Current password is incorrect.", 400));
    }

    const isSamePassword = await user.comparePassword(newPassword);

    if (isSamePassword) {
        return next(
            new AppError(
                "The new password must be different from the current password.",
                400,
            ),
        );
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
        status: "success",
        message: "Password updated successfully.",
    });
});

/**
 * Deletes the authenticated user's account and reviews.
 */

const deleteProfile = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new AppError("User account not found.", 404));
    }

    await Review.deleteMany({
        user: req.user._id,
    });

    await user.deleteOne();

    res.status(204).send();
});

export {
    deleteProfile,
    getProfile,
    loginUser,
    registerUser,
    updatePassword,
    updateProfile,
};
