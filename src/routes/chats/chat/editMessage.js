const {
    ChatMessage,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    const {
        content,
    } = req.body;
    const {
        messageId,
    } = req.params;

    if (!content) {
        return res.status(400).json({
            message: 'Bad request',
        });
    };

    ChatMessage.findOne({
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

        if (message.author !== req.user) {
            return res.status(403).json({
                message: 'Forbidden',
            });
        };

        message.content = content;

        message.save((err, message) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error',
                });
            };

            return res.json({
                message: 'Message edited',
            });
        });
    });
};