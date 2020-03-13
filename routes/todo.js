const express = require('express');
const router = express.Router();
const todoModel = require('../models/Todo')();

router.get('/', async (req, res) => {
    const result = await todoModel.get();
    res.render('index', {todos : result});
})

router.get('/form', (req, res) => {
    res.render('form');
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if(isNaN(id)){
        next();
    } else {
        const result = await todoModel.get(id);
        res.render('todo', result[0]);
    }
})

router.post('/', async (req, res) => {
    const payload = req.body;
    const result = await todoModel.add(payload);
    if(result.code > 0){
        res.render('form', {error : result.error})
    } else {
        res.redirect(`/${result.id}`);
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await todoModel.delete(id);
    res.redirect('/');
})
module.exports = router;