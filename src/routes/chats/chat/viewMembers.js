module.exports = (req, res) => {
    return res.json({
        message: 'Members fetched',
        members: req.chat.members.map((member) => ({
            user: member.user,
        })),
    });
};