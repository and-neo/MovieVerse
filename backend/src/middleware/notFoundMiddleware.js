import AppError from "../utils/AppError.js";

/**
 * Handles requests to undefined API routes.
 */

function notFoundMiddleware(req, res, next) {
    next(new AppError(`Route ${req.originalUrl} was not found.`, 404));
}

export default notFoundMiddleware;
