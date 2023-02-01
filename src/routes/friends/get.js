const {
    UserFriend,
} = require('../../structure/schemas');

module.exports = (req, res) => {
    UserFriend.find({
        $or: [{
            user: req.user,
        }, {
            friend: req.user,
        }],
    }, (err, friends) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        return res.json({
            message: 'Friends retrieved',
            friends,
        });
    });
};