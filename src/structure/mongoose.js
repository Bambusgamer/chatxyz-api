const mongoose = require('mongoose');

module.exports = (uri) => {
    mongoose.connection.on('connected', () => console.log('Mongoose connected'));
    mongoose.connection.on('error', (err) => console.log('Mongoose error', err));
    mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));
    mongoose.connect(uri, { useNewUrlParser: true, });
};