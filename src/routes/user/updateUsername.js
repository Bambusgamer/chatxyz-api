const {
    User,
} = require('../../structure/schemas');

module.exports = (req, res) => {
    const {
        username,
    } = req.body;

    if (!username) {
        return res.status(400).json({
            message: 'Missing username',
        });
    }

    User.findOneAndUpdate({
        id: req.user,
    }, {
        $set: {
            username,
            updatedAt: new Date(),
        },
    }, null, (err, user) => {
        if (err) {
            console.log(err)
            if (err.code === 11000) {
                return res.status(400).json({
                    message: 'Username already in use',
                });
            } else {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            }
        }

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }

        return res.json({
            message: 'Username changed',
        });
    });
};