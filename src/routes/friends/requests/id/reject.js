const {
    UserFriendRequest,
} = require('../../../../structure/schemas');

module.exports = (req, res) => {
    const {
        id,
    } = req.body;

    if (!id) {
        return res.status(400).json({
            message: 'Missing userId',
        });
    }

    UserFriendRequest.countDocuments({
        user: id,
    }, (err, count) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        if (count === 0) {
            return res.status(400).json({
                message: 'Friend request not found',
            });
        }

        UserFriendRequest.updateOne({
            $or: [{
                user: req.user,
                friend: id,
            }, {
                user: id,
                friend: req.user,
            }],
        }, {
            $set: {
                rejected: true,
                updatedAt: Date.now(),
            }
        }, (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            }

            return res.json({
                message: 'Friend request rejected',
            });
        });
    });
}