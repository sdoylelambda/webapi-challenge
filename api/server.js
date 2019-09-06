
const express = require('express');
const server = express();

server.use(express.json())

const projectRouter = require('../data/helpers/projectRoute')
const actionRouter = require('../data/helpers/actionRoute')

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    console.log("hlllllll",res)
    res.status(200).json({ api: 'up'})
});

module.exports = server;