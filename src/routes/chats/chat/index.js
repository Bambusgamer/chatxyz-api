const {
    chatExists,
    chatAdminState,
    chatMemberState,
    chatCreatorState,
    chatMessageRights,
} = require('../../../middleware');
const router = require('express').Router();

const viewChat = require('./viewChat');

const viewMessages = require('./viewMessages');
const sendMessage = require('./sendMessage');
const editMessage = require('./editMessage');
const deleteMessage = require('./deleteMessage');

const addAdmin = require('./addAdmin');
const removeAdmin = require('./removeAdmin');
const viewAdmins = require('./viewAdmins');
const viewMembers = require('./viewMembers');

const updateName = require('./updateName');
const updateDescription = require('./updateDescription');

const kickMember = require('./kickMember');
const deleteChat = require('./deleteChat');
const leaveChat = require('./leaveChat');

router.get('/:chatId', chatExists, chatMemberState, viewChat);

router.get('/:chatId/messages', chatExists, chatMemberState, viewMessages);
router.post('/:chatId/messages', chatExists, chatMemberState, sendMessage);
router.put('/:chatId/messages/:messageId', chatExists, chatMemberState, editMessage);
router.delete('/:chatId/messages/:messageId', chatExists, chatMemberState, chatMessageRights, deleteMessage);

router.post('/:chatId/admins', chatExists, chatCreatorState, addAdmin);
router.delete('/:chatId/admins', chatExists, chatCreatorState, removeAdmin);
router.get('/:chatId/admins', chatExists, chatCreatorState, viewAdmins);
router.get('/:chatId/members', chatExists, chatCreatorState, viewMembers);

router.put('/:chatId/name', chatExists, chatAdminState, updateName);
router.put('/:chatId/description', chatExists, chatAdminState, updateDescription);

router.delete('/:chatId/members', chatExists, chatAdminState, kickMember);
router.delete('/:chatId/', chatExists, chatCreatorState, deleteChat);
router.post('/:chatId/leave', chatExists, chatMemberState, leaveChat);

module.exports = router;