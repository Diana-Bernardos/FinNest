
/*const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = {
    apiLimiter: rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100,
        message: { error: 'Demasiadas peticiones, por favor intenta más tarde' },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            res.status(429).json({
                error: 'Demasiadas peticiones',
                retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
                limit: req.rateLimit.limit
            });
        }
    }),

    loginLimiter: rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hora
        max: 5,
        message: { error: 'Demasiados intentos de inicio de sesión' },
        standardHeaders: true,
        legacyHeaders: false,
        skipSuccessfulRequests: true,
        handler: (req, res) => {
            res.status(429).json({
                error: 'Demasiados intentos de inicio de sesión',
                retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
            });
        }
    })
};

module.exports = rateLimitMiddleware;*/