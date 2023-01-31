const express = require('express');
const config = require('../config');

const connect = require('./structure/mongoose');

connect(config.db.uri);

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));