const express = require('express');

const router = express.Router();

const get = require('./get');
const accept = require('./accept');

router.get('/', get);
router.post('/accept', accept);

module.exports = router;