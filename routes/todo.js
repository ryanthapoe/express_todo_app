const express = require('express');
const router = express.Router();
const todoModel = require('../models/Todo')();

router.get('/', async (req, res) => {
    const result = await todoModel.get();
    res.render('index', {todos : result});
})

module.exports = router;