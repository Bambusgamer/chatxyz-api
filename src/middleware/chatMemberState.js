module.exports = (req, res, next) => {
    if (req.chat.members.indexOf(req.user) === -1) {
        return res.status(403).json({
            message: 'Forbidden',
        });
    }

    next();
};