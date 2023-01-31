const {
    ChatMessage,
} = require('../../../structure/schemas');
const idFactory = require('../../../structure/idFactory');

module.exports = async (req, res) => {
    const {
        content,
    } = req.body;

    if (!content) {
        return res.status(400).json({
            message: 'Bad request',
        });
    }

    const id = idFactory();

    const message = new ChatMessage({
        chat: req.chat.id,
        id,
        author: req.user,
        content,
    });

    message.save((err, message) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        return res.json({
            message: 'Message sent',
        });
    });
};