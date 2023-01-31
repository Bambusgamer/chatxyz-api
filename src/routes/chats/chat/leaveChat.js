const {
    Chat,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    if (req.user !== req.chat.owner) {
        return res.status(403).json({
            message: 'Forbidden',
        });
    }

    Chat.updateOne({
        id: req.chat.id,
    }, {
        $pull: {
            members: req.user,
        }
    }, (err, chat) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        };

        return res.json({
            message: 'Chat left',
        });
    });
};
