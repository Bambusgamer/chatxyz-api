const express = require('express');

const router = express.Router();

const get = require('./get');
const relationships = require('./relationships');

router.get('/', get);
router.use('/relationships', relationships);

module.exports = router;