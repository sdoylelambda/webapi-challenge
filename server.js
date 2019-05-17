require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

const projectRouter = require('./data/helpers/projectRouter.js');
const actionRouter = require('./data/helpers/actionRouter.js');

// hmm
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);
// server.use('/api/', projectRouter);
// server.use(projectRouter);


server.get('/', (req, res) => {
    res.send(`
    <p>Hello from server.js</p>
    `);
});

module.exports = server;