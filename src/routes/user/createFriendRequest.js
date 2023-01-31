const {
    User,
    UserFriend,
    UserFriendRequest,
} = require('../../structure/schemas');

module.exports = async (req, res) => {
    const {
        friendId,
    } = req.body;

    if (!friendId) {
        return res.status(400).json({
            message: 'Missing friendId',
        });
    }

    User.findOne({
        id: friendId,
    }, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }
    });


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
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        if (friend) {
            return res.status(400).json({
                message: 'Already friends',
            });
        }
    });

    const friendRequest = await UserFriendRequest.findOne({
        $or: [{
            user: req.user,
            friend: friendId,
        }, {
            user: friendId,
            friend: req.user,
        }],
    }).exec()
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        });

    if (friendRequest) {
        return res.status(400).json({
            message: 'Already sent a friend request',
        });
    }

    const newFriendRequest = new UserFriendRequest({
        user: req.user,
        friend: friendId,
    });

    newFriendRequest.save(err => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        return res.json({
            message: 'Friend request sent',
        });
    });
};