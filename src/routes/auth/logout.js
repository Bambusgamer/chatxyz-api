const {
    UserSession,
} = require('../../structure/schemas');

module.exports = (req, res) => {
    const token = req.headers['x-access-token'];

    UserSession.findOneAndUpdate({
        user: req.user,
        token,
        isDeleted: false,
    }, {
        $set: {
            isDeleted: true,
        },
    }, null, (err, sessions) => {
        if (err) {
            return res.status(500).send({
                message: 'Internal server error',
            });
        }

        return res.status(200).send({
            message: 'Logged out',
        });
    });
};