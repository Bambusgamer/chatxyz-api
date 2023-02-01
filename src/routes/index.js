const express = require('express');

const router = express.Router();


router.use('/', (req, res, next) => {
    console.log(`Request to ${req.path}. Fields: ${JSON.stringify(req.body)}`)
    next();
})

const auth = require('./auth');
const users = require('./users');
const friends = require('./friends');
const invites = require('./invites');
const chats = require('./chats');

router.use('/auth', auth);
router.use('/users', users);
router.use('/friends', friends);
router.use('/invites', invites);
router.use('/chats', chats);


module.exports = router;