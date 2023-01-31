const express = require('express');

const router = express.Router();


router.use('/', (req, res, next) => {
    console.log(`Request to ${req.path}. Fields: ${JSON.stringify(req.body)}`)
    next();
})

const auth = require('./auth');
const user = require('./user');
const chat = require('./chats');

router.use('/auth', auth);
router.use('/user', user);
router.use('/chats', chat);


module.exports = router;