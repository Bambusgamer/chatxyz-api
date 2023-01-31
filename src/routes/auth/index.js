const express = require('express');

const {
    authenticationState,
} = require('../../middleware');

const router = express.Router();

const signup = require('./signup');
const login = require('./login');
const status = require('./status');
const logout = require('./logout');

router.post('/signup', signup);
router.post('/login', login);
router.get('/status', authenticationState, status);
router.post('/logout', authenticationState, logout);

module.exports = router;