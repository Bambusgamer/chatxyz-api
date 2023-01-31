const {
    authenticationState,
} = require('../../middleware');
const router = require('express').Router();

const createChat = require('./createChat');
const viewChats = require('./viewChats');
const chatRouter = require('./chat');


router.post('/', authenticationState, createChat);
router.get('/', authenticationState, viewChats);
router.use('/', authenticationState, chatRouter);

module.exports = router;