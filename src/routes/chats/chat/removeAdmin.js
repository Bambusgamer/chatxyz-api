const {
    ChatAdmin,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    const {
        userId
    } = req.body;

    if (!userId) {
        return res.status(400).json({
            message: 'Bad request',
        });
    }

    if (req.user === userId) {
        return res.status(403).json({
            message: 'Forbidden',
        });
    }

    if (req.chat.members.indexOf(userId) === -1) {
        return res.status(404).json({
            message: 'User not found',
        });
    }

    ChatAdmin.findOne({
        chat: req.chat.id,
        user: userId,
    }, (err, admin) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        if (!admin) {
            return res.status(404).json({
                message: 'User is not an admin',
            });
        }

        admin.remove((err, admin) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            }

            return res.json({
                message: 'User removed as admin',
            });
        });
    });
};