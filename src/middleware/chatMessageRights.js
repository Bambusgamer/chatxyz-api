const {
    ChatMessage,
    ChatAdmin,
} = require('../structure/schemas');

module.exports = (req, res, next) => {
    const {
        messageId
    } = req.params;

    if (!messageId) {
        return res.status(400).json({
            message: 'Bad request',
        });
    }

    if (req.chat.creator === req.user.id) return next();

    ChatAdmin.findOne({
        chat: req.chat.id,
        user: req.user.id,
    }, (err, admin) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        };

        if (admin) return next();

        ChatMessage.findOne({
            chat: req.chat.id,
            id: messageId,
        }, (err, message) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            };

            if (!message) {
                return res.status(404).json({
                    message: 'Message not found',
                });
            };

            if (message.author !== req.user.id) {
                return res.status(403).json({
                    message: 'Forbidden',
                });
            };

            next();
        });
    });
};