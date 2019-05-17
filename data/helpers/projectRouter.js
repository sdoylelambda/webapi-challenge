const express = require('express');

const Project = require('./projectModel');
// const Action = require('../helpers/actionModel');

const router = express.Router();

// Project CRUD

router.get('/', async(req, res) => {
    try {
        console.log(res);
        // const project = await Project.get(req.query);
        const project = await Project.get();
        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the projects' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id)
        project ? res.status(200).json(project) : res.status(404).json({ message: "no such id available"})
    } catch(err){ res.status(500).json({ error: err});}
})

router.get('/:id/actions', async(req, res) => {
    try {
        console.log(res);
        const project = await Project.getProjectActions(req.params.id);
        if(project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'The project could not be found. '});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the projects' });
    }
});

// insert  Project.insert()  ?
router.post('/', async(req, res) => {
    try {
        const project = await Project.insert(req.body);
        const {name, description} = req.body;
        name && description ? res.status(200).json(project) : res.status(400),json({
            message: "Name and Description both required"
        })
    } catch(err){ res.status(500).json({ error: err});}
})


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

// get insert update remove

// router.get('/', async(req, res) => {
//     try {
//         console.log(res);
//         const action = await Action.get(req.query);
//         res.status(200).json(action);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error retrieving the actions' });
//     }
// });


// router.post('./:id', async(req, res) => {
//     try {
//         const action = await Actions.insert(req.params.action);
//         if(action) {
//             res.status(204).json(action);
//         } else {
//             res.status(404).json({ message: 'The action could not be found. '});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error retrieving the actions' });
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const action = await Action.update(req.params.id, req.body);
//         if(action) {
//             res.json(action);
//         } else {
//             res.status(404).json({ message: 'The action could not be found. '});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Error updating the action."});
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const count = await Actions.remove(req.params.id);
//         if (count > 0) {
//             res.status(201).json({ message: 'The action has been nuked' });
//             } else {
//             res.status(404).json({ message: 'The action could not be found' });
//         }
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//             message: 'Error removing the action',
//         });
//     }
// });

module.exports = router;