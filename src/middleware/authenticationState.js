const {
    UserSession,
} = require('../structure/schemas');
const jwt = require('jsonwebtoken');
const config = require('../../config');

// middleware to check if user is authenticated
module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
        });
    }

    jwt.verify(token, config.jwt.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Invalid token',
            });
        }

        const session = await UserSession.findOne({
            user: decoded.user,
            token,
        });

        if (!session) {
            return res.status(401).json({
                message: 'Invalid token',
            });
        } else if (session.isDeleted) {
            return res.status(401).json({
                message: 'Deleted token',
            });
        } else if (session.expiresAt < Date.now()) {
            return res.status(401).json({
                message: 'Expired token',
            });
        }

        req.user = decoded.user;

        next();
    });
};