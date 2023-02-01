const express = require('express');

const router = express.Router();

const get = require('./get');
const username = require('./username');
const email = require('./email');
const password = require('./password');
// const avatar = require('./avatar');

router.get('/', get);
router.put('/username', username);
router.put('/email', email);
router.put('/password', password);
// router.put('/avatar', avatar);

module.exports = router;