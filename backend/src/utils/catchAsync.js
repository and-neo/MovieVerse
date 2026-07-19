/**
 * Forwards rejected async controller promises
 * to the global error middleware.
 */

function catchAsync(controller) {
    return function (req, res, next) {
        Promise.resolve(controller(req, res, next)).catch(next);
    };
}

export default catchAsync;
