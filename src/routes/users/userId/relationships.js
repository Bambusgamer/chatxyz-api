const {
    User,
    UserFriend,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    const {
        userId,
    } = req.params;

    if (!userId) {
        return res.status(400).json({
            message: 'Missing userId',
        });
    };

    if (userId === req.user) {
        return res.status(400).json({
            message: 'Cannot get relationships of self',
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

        UserFriend.find({
            $or: [{
                friend: userId,
            }, {
                user: userId,
            }],
        }, (err, userFriends) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            };

            if (!userFriends) {
                return res.status(400).json({
                    message: 'User has no friends in common',
                    friends: [],
                });
            };

            UserFriend.find({
                $or: [{
                    friend: req.user,
                }, {
                    user: req.user,
                }],
            }, (err, friends) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error',
                    });
                }

                if (!friends) {
                    return res.status(400).json({
                        message: 'User has no friends in common',
                        friends: [],
                    });
                }

                let filteredUserFriends = [];
                for (let i = 0; i < userFriends.length; i++) {
                    if ((userFriends[i].user === userId && userFriends[i].friend !== req.user) || (userFriends[i].friend === userId && userFriends[i].user !== req.user)) filteredUserFriends.push(userFriends[i].user === userId ? userFriends[i].friend : userFriends[i].user);
                };

                let filteredFriends = [];
                for (let i = 0; i < friends.length; i++) {
                    if ((friends[i].user === req.user && friends[i].friend !== userId) || (friends[i].friend === req.user && friends[i].user !== userId)) filteredFriends.push(friends[i].user === req.user ? friends[i].friend : friends[i].user);
                };

                let commonFriends = filteredUserFriends.filter(value => filteredFriends.includes(value));

                return res.status(200).json({
                    message: 'User has friends in common',
                    friends: commonFriends,
                });
            });
        });
    });
};