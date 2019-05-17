const express = require('express');

const Action = require('../helpers/actionModel');

const actionRouter = express.Router();


// ACTION CRUD

// get insert update remove

actionRouter.get('/', async(req, res) => {
    try {
        console.log(res);
        const action = await Action.get(req.query);
        res.status(200).json(action);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the actions' });
    }
});

// insert?
actionRouter.post('./:id', async(req, res) => {
    try {
        const action = await Actions.insert(req.params.action);
        if(action) {
            res.status(204).json(action);
        } else {
            res.status(404).json({ message: 'The action could not be found. '});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the actions' });
    }
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

module.exports = actionRouter;