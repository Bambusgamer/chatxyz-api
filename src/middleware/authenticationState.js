const {
    UserSession,
} = require('../structure/schemas');
const jwt = require('jsonwebtoken');
const config = require('../../config');

// middleware to check if user is authenticated
module.exports = (req, res, next) => {
    console.log('Authentication state middleware')

    const token = req.headers['x-access-token'];
    console.log(token)

    if (!token) {
        console.log('Missing token')
        return res.status(401).json({
            message: 'Missing token',
        });
    }

    jwt.verify(token, config.jwt.secret, async (err, decoded) => {
        console.log(decoded)
        if (err) {
            console.log(err)
            console.log('Invalid token')
            return res.status(401).json({
                message: 'Invalid token',
            });
        }

        const session = await UserSession.findOne({
            user: decoded.user,
            token,
        });

        if (!session) {
            console.log('Invalid token')
            return res.status(401).json({
                message: 'Invalid token',
            });
        } else if (session.isDeleted) {
            console.log('Session deleted')
            return res.status(401).json({
                message: 'Session deleted',
            });
        } else if (session.expiresAt < Date.now()) {
            console.log('Session expired')
            return res.status(401).json({
                message: 'Session expired',
            });
        }

        req.user = decoded.user;

        console.log('User authenticated')
        next();
    });
};