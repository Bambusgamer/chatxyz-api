const {
    ChatAdmin,
} = require('../structure/schemas');

module.exports = (req, res, next) => {
    ChatAdmin.findOne({
        chat: req.chat.id,
        user: req.user.id,
    }, (err, admin) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        };

        if (!admin) {
            return res.status(403).json({
                message: 'Forbidden',
            });
        }

        req.admin = admin;

        next();
    });
};