const express = require('express');
const Action = require('../helpers/actionModel');
const actionRouter = express.Router();

// ACTION CRUD
// get insert update remove

actionRouter.get('/', async(req, res) => {
    try {
        const action = await Action.get();
        if(action) {
            res.json(action);
        } else {
            res.status(404).json({ message: 'The action could not be found. '});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the actions' });
    }
});

actionRouter.get('/:id', async(req, res) => {
    try {
        console.log(res);
        // const action = await Action.get(req.query);
        const action = await Action.get(req.params.id);
        if(action) {
            res.json(action);
        } else {
            res.status(404).json({ message: 'The action could not be found. '});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the actions' });
    }
});

actionRouter.post('/',checkLength, async(req, res) => {
    try {
        const { project_id, description, notes } = req.body;
        if(project_id && description.length  &&notes){
            const action = await Actions.insert(req.body);
            return res.status(200).json(action)
        } else { 
            return res.status(400).json({ message: "Post failed"})}
    } catch(err){ res.status(500).json({errorMessage: err})}
});

actionRouter.put('/:id', async (req, res) => {
    try {
        const action = await Action.update(req.params.id, req.body);
        if(action) {
            res.json(action);
        } else {
            res.status(404).json({ message: 'The action could not be found. '});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating the action."});
    }
});

actionRouter.delete('/:id', async (req, res) => {
    try {
        const count = await Actions.remove(req.params.id);
        if (count > 0) {
            res.status(201).json({ message: 'The action has been nuked' });
            } else {
            res.status(404).json({ message: 'The action could not be found' });
        }
        } catch (error) {
            console.log(error);
            res.status(500).json({
            message: 'Error removing the action',
        });
    }
});

function checkLength(req, res, next){
    const description = req.body.description
    
    if( description.length > 128 ){
        return res.status(400).json({ message: "Too long."})
    }
    next();
}
actionRouter.use((req, res, next) => {
    res.status(404).json({ message: "Router error."})
})

module.exports = actionRouter;