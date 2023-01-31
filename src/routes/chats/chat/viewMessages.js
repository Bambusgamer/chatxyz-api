const {
    ChatMessage,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    const {
        count,
        before,
        after,
        around,
    } = req.query;

    const query = {
        chat: req.chat.id,
    };

    if (before) {
        query.createdTimestamp = {
            $lt: before,
        };
    }
    else if (after) {
        query.createdTimestamp = {
            $gt: after,
        };
    }
    else if (around) {
        query.createdTimestamp = {
            $lt: around,
            $gt: around - 1000,
        };
    }

    if (count) {
        query.limit = Math.min(count, 100);
    }

    ChatMessage.find(query, (err, messages) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        return res.json({
            message: 'Messages found',
            messages: messages.map(message => ({
                id: message.id,
                author: message.author,
                content: message.content,
                createdTimestamp: message.createdTimestamp,
            })),
        });
    });
}