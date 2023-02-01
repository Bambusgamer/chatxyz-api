const {
    authenticationState,
} = require('../../middleware');

const router = require('express').Router();

const me = require('./me');
const userId = require('./userId');

router.use('/@me', authenticationState, me);
router.use('/:userId', authenticationState, userId);

module.exports = router;