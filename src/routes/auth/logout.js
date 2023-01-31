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
            return res.send({
                success: false,
                message: 'Error: Server error',
            });
        }

        return res.send({
            success: true,
            message: 'Good',
        });
    });
};