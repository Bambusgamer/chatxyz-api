const {
    ChatAdmin,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    ChatAdmin.find({
        chat: req.chat.id,
    }, (err, admins) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        };

        return res.json({
            message: 'Admins fetched',
            admins: admins.map((admin) => {
                return {
                    user: admin.user,
                };
            }),
        });
    });
}