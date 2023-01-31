const mongoose = require('mongoose');

const User = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
});

const UserAuthentication = new mongoose.Schema({
    user: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
});

const UserSession = new mongoose.Schema({
    user: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
});

const UserFriend = new mongoose.Schema({
    user: { type: String, required: true },
    friend: { type: String, required: true },
    type: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const UserFriendRequest = new mongoose.Schema({
    user: { type: String, required: true },
    friend: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    accepted: { type: Boolean, default: false },
    rejected: { type: Boolean, default: false },
});

const Chat = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    type: { type: Number, required: true },
    members: { type: Array, required: true },
    creator: { type: String },
    name: { type: String },
    description: { type: String },
});

const ChatAdmin = new mongoose.Schema({
    chat: { type: String, required: true },
    user: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ChatMessage = new mongoose.Schema({
    chat: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdTimestamp: { type: Date, default: Date.now },
    updatedTimestamp: { type: Date, default: Date.now },
});

module.exports = {
    User: mongoose.model('User', User),
    UserAuthentication: mongoose.model('UserAuthentication', UserAuthentication),
    UserSession: mongoose.model('UserSession', UserSession),
    UserFriend: mongoose.model('UserFriend', UserFriend),
    UserFriendRequest: mongoose.model('UserFriendRequest', UserFriendRequest),
    Chat: mongoose.model('Chat', Chat),
    ChatMessage: mongoose.model('ChatMessage', ChatMessage),
    ChatAdmin: mongoose.model('ChatAdmin', ChatAdmin),
}