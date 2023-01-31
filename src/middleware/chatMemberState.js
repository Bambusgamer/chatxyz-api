module.exports = (req, res, next) => {
    console.log(req.chat, req.user)
    if (req.chat.members.indexOf(req.user) === -1) {
        return res.status(403).json({
            message: 'Forbidden',
        });
    }

    next();
};