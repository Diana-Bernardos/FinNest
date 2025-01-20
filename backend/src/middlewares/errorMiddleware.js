// src/middlewares/errorMiddleware.js
const errorMiddleware = {
    errorHandler: (err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Error interno del servidor';

        const errorResponse = {
            error: message,
            ...(process.env.NODE_ENV === 'development' && {
                stack: err.stack,
                details: err.details
            })
        };

        if (err.validation) {
            errorResponse.validation = err.validation;
        }

        res.status(statusCode).json(errorResponse);
    },

    notFound: (req, res) => {
        res.status(404).json({
            error: 'Ruta no encontrada',
            path: req.originalUrl
        });
    },

    async errorHandler(err, req, res, next) {
        // Log error
        console.error(err);

        // Errores específicos
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Error de validación',
                details: err.details
            });
        }

        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({
                error: 'No autorizado'
            });
        }

        if (err.name === 'ForbiddenError') {
            return res.status(403).json({
                error: 'Acceso denegado'
            });
        }

        // Error genérico
        res.status(500).json({
            error: 'Error interno del servidor',
            ...(process.env.NODE_ENV === 'development' && { details: err.message })
        });
    }
};

module.exports = errorMiddleware;