// src/middlewares/loggingMiddleware.js
const loggingMiddleware = {
    requestLogger: (req, res, next) => {
        const start = Date.now();
        
        res.on('finish', () => {
            const duration = Date.now() - start;
            const log = {
                timestamp: new Date().toISOString(),
                method: req.method,
                path: req.originalUrl,
                status: res.statusCode,
                duration: `${duration}ms`,
                ip: req.ip,
                userAgent: req.get('user-agent'),
                userId: req.user?.id
            };

            console.log(JSON.stringify(log));
        });

        next();
    },

    errorLogger: (err, req, res, next) => {
        const errorLog = {
            timestamp: new Date().toISOString(),
            error: {
                name: err.name,
                message: err.message,
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
            },
            request: {
                method: req.method,
                path: req.path,
                query: req.query,
                body: req.body,
                ip: req.ip,
                userId: req.user?.id
            }
        };

        console.error(JSON.stringify(errorLog));
        next(err);
    }
};

module.exports = loggingMiddleware;