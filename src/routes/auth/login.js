const {
    User,
    UserAuthentication,
    UserSession,
} = require('../../structure/schemas');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

module.exports = async (req, res) => {
    const {
        email,
        username,
        password,
    } = req.body;

    if ((!email && !username) || !password) {
        return res.status(400).json({
            message: 'Missing required fields',
        });
    }

    const user = await User.findOne({
        $or: [{
            email,
        }, {
            username,
        }],
    }).exec()
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        });

    if (!user) {
        return res.status(400).json({
            message: 'Invalid credentials',
        });
    }

    const userAuthentication = await UserAuthentication.findOne({
        user,
    }).exec()
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        });

    if (!userAuthentication) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }

    const hash = crypto.pbkdf2Sync(password, userAuthentication.salt, 1000, 64, 'sha512').toString('hex');

    if (hash !== userAuthentication.hash) {
        return res.status(400).json({
            message: 'Invalid credentials',
        });
    }

    const token = jwt.sign({ user: user.id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });

    const expiresAt = Date.now() + config.jwt.expiresIn;

    const userSession = new UserSession({
        user: user.id,
        token,
        expiresAt,
    });

    await userSession.save()
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        });

    return res.status(200).json({
        message: 'Logged in',
        token,
    });
};