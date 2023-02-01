const {
    User,
} = require('../../../structure/schemas');

module.exports = (req, res) => {
    const {
        email,
    } = req.body;

    if (!email) {
        return res.status(400).json({
            message: 'Missing email',
        });
    };

    User.findOneAndUpdate({
        id: req.user,
    }, {
        $set: {
            email,
            updatedAt: new Date(),
        },
    }, null, (err, user) => {
        if (err) {
            if (err.code === 11000) {
                return res.status(400).json({
                    message: 'Email already in use',
                });
            } else {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            }
        }

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }

        return res.json({
            message: 'Email changed',
        });
    });
};