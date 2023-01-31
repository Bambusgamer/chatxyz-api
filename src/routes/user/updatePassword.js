const {
    UserAuthentication,
    UserSession,
} = require('../../structure/schemas');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

module.exports = async (req, res) => {
    const user = req.user;
    const {
        password,
    } = req.body;

    if (!password) {
        return res.status(400).json({
            message: 'Missing password',
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

    if (hash === userAuthentication.hash) {
        return res.status(400).json({
            message: 'Password is the same',
        });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    await userAuthentication.updateOne({
        user,
    }, {
        $set: {
            hash: newHash,
            updatedAt: Date.now(),
        },
    }).exec()
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        });

    await UserSession.updateMany({
        user
    }, {
        $set: {
            isDeleted: true,
            updatedAt: Date.now(),
        },
    }).exec()
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        });

    const token = jwt.sign({
        user
    }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });

    const session = new UserSession({
        user,
        token,
        expiresAt: Date.now() + config.jwt.expiresIn,
    });

    await session.save()
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        });

    return res.json({
        message: 'Logged in',
        token,
    });
};