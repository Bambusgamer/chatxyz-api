const {
    Chat,
} = require('../../structure/schemas');
const statics = require('../../structure/statics');
const idFactory = require('../../structure/idFactory');

module.exports = (req, res) => {
    const {
        name,
    } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Missing name',
        });
    }

    const id = idFactory();

    const chat = new Chat({
        id,
        name,
        type: statics.chatTypes.group,
        members: [req.user],
        creator: req.user,
    });

    chat.save((err) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }

        return res.json({
            message: 'Chat created',
            chat: {
                id,
                name,
                members: [req.user],
            },
        });
    });
};