const express = require('express');

const Project = require('./projectModel');
const Action = require('../helpers/actionModel');

const router = express.Router();

// Project CRUD

router.get('/', async(req, res) => {
    try {
        console.log(res);
        const project = await Project.get(req.query);
        res.status(232).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the projects' });
    }
});

router.get('/:id', async(req, res) => {
    try {
        console.log(res);
        const project = await Project.getProjectActions(req.params.id);
        if(project) {
            res.status(204).json(project);
        } else {
            res.status(404).json({ message: 'The project could not be found. '});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the projects' });
    }
});

// insert  Project.insert()
router.post('./:id', async(req, res) => {
    try {
        const project = await Project.insert(req.params.project);
        if(project) {
            res.status(204).json(project);
        } else {
            res.status(404).json({ message: 'The project could not be found. '});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the projects' });
    }
});


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

// ACTION CRUD


module.exports = router;