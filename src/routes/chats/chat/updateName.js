const {
    Chat,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    const {
        name,
    } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Bad request',
        });
    };

    Chat.updateOne({
        id: req.chat.id,
    }, {
        $set: {
            name,
            updatedAt: Date.now(),
        },
    }, (err, chat) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        };

        return res.json({
            message: 'Chat name updated',
        });
    });
};