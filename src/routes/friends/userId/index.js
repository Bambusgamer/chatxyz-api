const express = require('express');

const router = express.Router();

const _delete = require('./delete');
const _post = require('./post');

router.delete('/', _delete);
router.post('/', _post);

module.exports = router;