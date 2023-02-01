const {
    UserFriendRequest,
} = require('../../../structure/schemas');

module.exports = (req, res) => {
    UserFriendRequest.find({
        $or: [{
            user: req.user,
        }, {
            friend: req.user,
        }],
    }, (err, friendRequests) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        return res.status(200).json({
            message: 'Friend requests retrieved',
            friendRequests: friendRequests.map(friendRequest => ({
                user: friendRequest.user,
                friend: friendRequest.friend,
                accepted: friendRequest.accepted,
                rejected: friendRequest.rejected,
                createdAt: friendRequest.createdAt,
                updatedAt: friendRequest.updatedAt,
            })),
        });
    });
};