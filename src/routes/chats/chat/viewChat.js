const {
    Chat,
} = require('../../../structure/schemas');

module.exports = async (req, res) => {
    return res.json({
        message: 'Chat found',
        chat: {
            id: req.chat.id,
            name: req.chat.name,
            type: req.chat.type,
            members: req.chat.members,
        },
    });
};