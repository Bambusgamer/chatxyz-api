const {
    User,
    UserFriend,
    UserFriendRequest,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    const {
        userId,
    } = req.body;

    if (!userId) {
        return res.status(400).json({
            message: 'Missing friendId',
        });
    }

    User.findOne({
        id: userId,
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
            friend: userId,
        }, {
            user: userId,
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

    UserFriendRequest.findOne({
        $or: [{
            user: req.user,
            friend: userId,
        }, {
            user: userId,
            friend: req.user,
        }],
    }, (err, friendRequest) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        if (friendRequest && friendRequest.user === req.user) {
            return res.status(400).json({
                message: 'Friend request already sent',
            });
        } else if (friendRequest && friendRequest.user === userId) {
            UserFriend.findOneAndUpdate({
                $or: [{
                    user: req.user,
                    friend: userId,
                }, {
                    user: userId,
                    friend: req.user,
                }],
            }, {
                $set: {
                    user: req.user,
                    friend: userId,
                },
            }, {
                upsert: true,
            }, (err, friend) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error',
                    });
                }

                UserFriendRequest.updateOne({
                    $or: [{
                        user: req.user,
                        friend: userId,
                    }, {
                        user: userId,
                        friend: req.user,
                    }],
                }, {
                    $set: {
                        accepted: true,
                        updatedAt: Date.now(),
                    },
                }, (err, friendRequest) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'Internal server error',
                        });
                    }

                    return res.status(200).json({
                        message: 'Friend request accepted',
                    });
                });
            });
        }
    });

    const newFriendRequest = new UserFriendRequest({
        user: req.user,
        friend: userId,
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