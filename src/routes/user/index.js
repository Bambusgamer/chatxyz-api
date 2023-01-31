const {
    authenticationState,
} = require('../../middleware');

const router = require('express').Router();

const updateUsername = require('./updateUsername');
const updateEmail = require('./updateEmail');
const updatePassword = require('./updatePassword');

const createFriendRequest = require('./createFriendRequest');
const acceptFriendRequest = require('./acceptFriendRequest');
const rejectFriendRequest = require('./rejectFriendRequest');
const deleteFriendRequest = require('./deleteFriendRequest');
const viewFriendRequests = require('./viewFriendRequests');
const deleteFriend = require('./deleteFriend');
const viewFriends = require('./viewFriends');

router.put('/username', authenticationState, updateUsername);
router.put('/email', authenticationState, updateEmail);
router.put('/password', authenticationState, updatePassword);

router.post('/friends/requests', authenticationState, createFriendRequest);
router.put('/friends/requests/accept', authenticationState, acceptFriendRequest);
router.put('/friends/requests/reject', authenticationState, rejectFriendRequest);
router.delete('/friends/requests', authenticationState, deleteFriendRequest);
router.get('/friends/requests', authenticationState, viewFriendRequests);
router.delete('/friends', authenticationState, deleteFriend);
router.get('/friends', authenticationState, viewFriends);


module.exports = router;