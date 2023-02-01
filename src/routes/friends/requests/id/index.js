const express = require('express');

const router = express.Router();

const _delete = require('./delete');
const accept = require('./accept');
const reject = require('./reject');

router.delete('/', _delete);
router.post('/accept', accept);
router.post('/reject', reject);

module.exports = router;