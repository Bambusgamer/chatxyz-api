const {
    ChatMessage,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    const {
        messageId,
    } = req.params;

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

        message.remove((err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            };

            return res.json({
                message: 'Message deleted',
            });
        });
    });
};