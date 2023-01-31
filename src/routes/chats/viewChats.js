const {
    Chat,
} = require('../../structure/schemas');

module.exports = (req, res) => {

    // fetch all chats wich include the user in Chat.members<array>
    Chat.find({
        members: req.user,
    }, (err, chats) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        return res.json({
            message: 'Chats retrieved',
            chats: chats.map(chat => ({
                id: chat.id,
                name: chat.name,
                members: chat.members,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt,
            })),
        });
    });
};