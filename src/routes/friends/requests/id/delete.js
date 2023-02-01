const {
    UserFriendRequest,
} = require('../../../../structure/schemas');

module.exports = (req, res) => {
    const {
        id,
    } = req.body;

    if (!id) {
        return res.status(400).json({
            message: 'Missing id',
        });
    }

    UserFriendRequest.countDocuments({
        user: req.user,
        friend: id,
    }, (err, count) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        };

        if (count === 0) {
            return res.status(400).json({
                message: 'Friend request not found',
            });
        };

        UserFriendRequest.deleteOne({
            user: req.user,
            friend: id,
        }, (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            };

            return res.json({
                message: 'Friend request deleted',
            });
        });

    });
};