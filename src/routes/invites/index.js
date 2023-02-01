const express = require('express');

const {
    authenticationState,
} = require('../../middleware');

const router = express.Router();

const id = require('./id');

router.use('/:id', authenticationState, id);

module.exports = router;