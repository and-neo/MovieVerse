import AppError from "../utils/AppError.js";

/**
 * Handles invalid MongoDB ObjectId values.
 */

const handleCastError = (error) => {
    const message = `Invalid value for ${error.path}: ${error.value}.`;

    return new AppError(message, 400);
};

/**
 * Handles duplicate MongoDB field values.
 */

const handleDuplicateFieldsError = (error) => {
    const duplicatedField = Object.keys(error.keyValue || {})[0];

    const message = duplicatedField
        ? `${duplicatedField} is already in use.`
        : "A record with this value already exists.";

    return new AppError(message, 409);
};

/**
 * Handles Mongoose validation errors.
 */

const handleValidationError = (error) => {
    const messages = Object.values(error.errors).map(
        (validationError) => validationError.message,
    );

    return new AppError(messages.join(" "), 400);
};

/**
 * Handles invalid JWT errors.
 */

const handleJwtError = () => new AppError("Invalid authentication token.", 401);

/**
 * Handles expired JWT errors.
 */

const handleJwtExpiredError = () =>
    new AppError("Authentication token has expired.", 401);

/**
 * Sends detailed errors during development.
 */

const sendDevelopmentError = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
        stack: error.stack,
    });
};

/**
 * Sends safe operational errors in production.
 */

const sendProductionError = (error, res) => {
    if (error.isOperational) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }

    console.error("ERROR:", error);

    return res.status(500).json({
        status: "error",
        message: "Something went wrong.",
    });
};

/**
 * Global Express error handler.
 */

const errorMiddleware = (error, req, res, next) => {
    let processedError = error;

    processedError.statusCode = processedError.statusCode || 500;

    processedError.status = processedError.status || "error";

    if (processedError.name === "CastError") {
        processedError = handleCastError(processedError);
    }

    if (processedError.code === 11000) {
        processedError = handleDuplicateFieldsError(processedError);
    }

    if (processedError.name === "ValidationError") {
        processedError = handleValidationError(processedError);
    }

    if (processedError.name === "JsonWebTokenError") {
        processedError = handleJwtError();
    }

    if (processedError.name === "TokenExpiredError") {
        processedError = handleJwtExpiredError();
    }

    if (process.env.NODE_ENV === "development") {
        return sendDevelopmentError(processedError, res);
    }

    return sendProductionError(processedError, res);
};

export default errorMiddleware;
