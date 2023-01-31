const {
    Chat,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    if (req.user !== req.chat.owner) {
        return res.status(403).json({
            message: 'Forbidden',
        });
    }

    Chat.deleteOne({
        id: req.chat.id,
    }, (err) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        };

        return res.json({
            message: 'Chat deleted',
        });
    });
};