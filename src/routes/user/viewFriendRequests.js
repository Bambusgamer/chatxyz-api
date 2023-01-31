const {
    UserFriendRequest,
} = require('../../structure/schemas');

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

        return res.json({
            message: 'Friend requests retrieved',
            // how do i map trough a array and delete one specific value?
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