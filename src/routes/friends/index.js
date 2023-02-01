const express = require('express');

const {
    authenticationState,
} = require('../../middleware');

const router = express.Router();

const get = require('./get');
const userId = require('./userId');
const requests = require('./requests');

router.get('/', authenticationState, get);
router.use('/:userId', authenticationState, userId);
router.use('/requests', authenticationState, requests);

module.exports = router;