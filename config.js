module.exports = {
    port: 3101,
    db: {
        uri: 'mongodb://192.168.178.170:27017/chatxyz',
    },
    jwt: {
        expiresIn: (1000 * 60 * 60 * 24 * 14),
        secret: 'secret',
    },
}