const express = require('express');

const Project = require('./projectModel');
const Action = require('../helpers/actionModel');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const project = await Project.find(req.query);
        res.status(232).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the projects' });
    }
});


module.exports = router;