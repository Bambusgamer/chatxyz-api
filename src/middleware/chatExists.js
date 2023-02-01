const {
    Chat,
} = require('../structure/schemas');

module.exports = (req, res, next) => {
    Chat.findOne({
        id: req.params.chatId,
    }, (err, chat) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        };

        if (!chat) {
            return res.status(404).json({
                message: 'Chat not found',
            });
        }

        req.chat = chat;

        next();
    });
};