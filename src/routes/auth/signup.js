const {
    User,
    UserAuthentication,
} = require('../../structure/schemas');
const crypto = require('crypto');
const idFactory = require('../../structure/idFactory');

module.exports = (req, res) => {
    const {
        email,
        username,
        password,
    } = req.body;
    console.log(req.body)

    if (!email || !username || !password) {
        return res.status(400).json({
            message: 'Missing required fields',
        });
    };

    const id = idFactory();
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const user = new User({
        id,
        email,
        username,
    });

    const userAuthentication = new UserAuthentication({
        user: id,
        hash,
        salt,
    });

    user.save()
        .then(() => userAuthentication.save())
        .then(() => {
            return res.status(200).json({
                message: 'Account created',
            });
        })
        .catch((err) => {
            if (err.code === 11000) {
                const username = User.countDocuments({
                    username: req.body.username,
                });
                const email = User.countDocuments({
                    email: req.body.email,
                });
                if (email > 0 && username > 0) {
                    return res.status(409).json({
                        message: 'Username and email already taken',
                    });
                } else if (email > 0) {
                    return res.status(409).json({
                        message: 'Email already taken',
                    });
                } else if (username > 0) {
                    return res.status(409).json({
                        message: 'Username already taken',
                    });
                }
            }

            return res.status(500).json({
                message: 'Internal server error',
            });
        });
};