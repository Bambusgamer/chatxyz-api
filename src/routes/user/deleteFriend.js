const {
    UserFriend, UserFriendRequest,
} = require('../../structure/schemas');

module.exports = (req, res) => {
    const {
        friendId,
    } = req.body;

    UserFriend.findOne({
        $or: [{
            user: req.user,
            friend: friendId,
        }, {
            user: friendId,
            friend: req.user,
        }],
    }, (err, friend) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        if (!friend) {
            return res.status(400).json({
                message: 'Friend not found',
            });
        }

        UserFriend.deleteOne({
            _id: friend._id,
        }, (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            }

            return res.json({
                message: 'Friend deleted',
            });
        });
    });
};