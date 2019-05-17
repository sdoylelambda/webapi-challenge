require('dotenv').config();

const express = require('express');

const helmet = require('helmet');

const morgan = require('morgan');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.get('/', checkName, (req, res) => {
    res.send(`
    <p>Hello from server.js</p>
    `);
});

module.exports = server;