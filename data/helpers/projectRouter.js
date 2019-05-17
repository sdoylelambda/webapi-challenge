const express = require('express');

const Project = require('./projectModel');
const Action = require('../helpers/actionModel');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        console.log(res);
        const project = await Project.find(req.query);
        res.status(232).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the projects' });
    }
});

// insert  remove get2
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.update(req.params.id, req.body);
        if(project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'The project could not be found. '});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating the project."});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Project.remove(req.params.id);
        if (count > 0) {
            res.status(201).json({ message: 'The project has been nuked' });
            } else {
            res.status(404).json({ message: 'The project could not be found' });
        }
        } catch (error) {
            console.log(error);
            res.status(500).json({
            message: 'Error removing the project',
        });
    }
});


module.exports = router;