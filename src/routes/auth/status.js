module.exports = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You are logged in',
    });
};