const express = require('express');
const categoryModel = require('../models/categories')
const BookModel = require('../models/books')
const router = express.Router();


router.get('/', (req, res) => {
    categoryModel.find({}, (err, categories) => {
        if (err) return res.send(err)
        res.json(categories)
    })
})

/* adding to database
router.post('/', (req, res) => {
    const { body: { name, bookId } } = req;
    const add = new categoryModel({
        name,
        bookId
    })
    add.save((err, category) => {
        if (err) return res.send(err);
        res.json(category);
    })
})*/


router.get('/:id', (req, res) => {
    categoryModel.findById(req.params.id, (err, categories) => {
        if (err) res.send(err)
        res.json(categories)
    })
})

router.get('/:id/books', (req, res) => {
    id = req.params.id
    BookModel.find({ category: id }, (err, category_book) => {
        if (err) return res.send(err)
        res.json(category_book)
    })
})

module.exports = router;