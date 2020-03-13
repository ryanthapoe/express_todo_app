const express = require('express');
const router = express.Router();
const todoModel = require('../models/Todo');

router.get('/', async (req, res) => {
    const result = await todoModel.get();
    res.render('index', {todos : result, title: "My Todo"});
})

router.get('/approve/:id', async (req, res) => {
    const id = req.params.id;
    if(isNaN(id)){
        next();
    } else {
        const result = await todoModel.updateStatus(id);
        res.redirect(`/${result.id}`);
    }
})

router.get('/form', (req, res) => {
    res.render('form', {title: "Todo Form"});
})

router.get('/form/:id', async (req, res) => {
    const id = req.params.id;
    if(isNaN(id)){
        next();
    } else {
        const result = await todoModel.get(id);
        const todo = result[0];
        res.render('form' , {title: "Todo Form", todo, method:`${id}?_method=PUT`});
    }
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
        res.render('form', {error : result.error, title: "Todo Form"})
    } else {
        res.redirect(`/${result.id}`);
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = {...req.body, id};
    const result = await todoModel.update(payload);
    if(result.code > 0){
        res.render('form', {error : result.error, title: "Todo Form"})
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