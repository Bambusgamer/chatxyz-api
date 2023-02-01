const {
    User,
} = require('../../../structure/schemas');

module.exports = (req, res) => {
    const {
        userId
    } = req.params;

    if (!userId) {
        return res.status(400).json({
            message: 'Missing userId',
        });
    };

    User.findOne({
        id: userId,
    }, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        };

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        };

        return res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
            }
        });
    });
};