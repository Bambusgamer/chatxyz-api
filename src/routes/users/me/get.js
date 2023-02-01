const {
    User,
} = require('../../../structure/schemas');

module.exports = (req, res) => {
    User.findOne({
        id: req.user,
    }, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            }
        });
    });
};