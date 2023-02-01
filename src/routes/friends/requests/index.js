const express = require('express');

const router = express.Router();

const get = require('./get');
const id = require('./id');

router.get('/', get);
router.use('/:id', id);

module.exports = router;