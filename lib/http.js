const withMiddleware = (middlewareStack, cb) => {
    return async (req, res) => {
        for (let middleware of middlewareStack) {
            await middleware(req, res);
        }
        await cb(req, res);
    };
};

const withResponseHandler = (cb) => {
    return async (req, res) => {
        try {
            await cb(req, res);
        } catch (err) {
            return res.json({
                error: err.message,
            });
        }
    };
};

export { withMiddleware, withResponseHandler };
