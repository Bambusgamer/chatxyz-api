module.exports = (req, res, next) => {
    if (req.chat.creator !== req.user) {
        return res.status(403).json({
            message: 'Forbidden',
        });
    }

    next();
};