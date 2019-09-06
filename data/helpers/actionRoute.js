const express = require('express')
const Action = require('../helpers/actionModel')
const router = express.router()


router.get('/', (req, res) => {
    const { id } = req.params.id
    Action.get()
    .then(res =>  res.status(200).json())
    .catch(err => res.status(400).json({err: err}))
});

router.post('/', (req, res) => {
    const { action } = req.body
    Action.insert()
    .then(res => res.status(200).json(action))
    .catch(err => res.status(400).json({ err: err }))
});

router.put('/:id', (req, res) => {
    const { post } = req.params.post
    const { id } = req.params.id
    Action.update()
    .then(res => res.status(200).json(post))
    .catch(err => res.status(400).json({ err: err }))
});

router.delete('/:id', (req, res) => {
    const { id } = req.params.id
    Action.remove()
    .then(res => res.status(200).json(id))
    .catch(err => res.status(400).json({ err: err }))
});


// Custom Middleware

function validateUser(req, res, next) {
    const { id } = req.params
    Action.get(id)
    .then(user => {
        if(user) {
            req.user = user
            next();
        } else {
            res.status(400).json({ err: 'error' })
        }
    })
}
