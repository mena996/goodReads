const express = require('express');
const BookModel = require('../models/books');
const router = express.Router();

// router.get('/', (req, res, next) => {
//     return PostModel.find({}).populate('auther_id', ['firstName', 'lastName']).exec((err, posts) => {
//         if (err) return res.send(err);
//         res.json(posts);
//     });
// });
// router.get('/:id', (req, res, next) => {
//     return PostModel.findById(req.params.id).populate('auther_id', ['firstName', 'lastName']).exec((err, posts) => {
//         if (err) next(err);
//         res.json(posts);
//     });
// });
router.post('/', async(req, res, next) => {
    try {
        const { name, image, category, author } = req.body;
        const book = await BookModel.create({
            name, 
            image, 
            category, 
            author
        });
        res.send(book)
    } catch{
        next("Erorr while adding a book");
    }
});

router.patch('/:id', async(req, res, next) => {
    try {
        const book = await BookModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (!book) next("book not found");
        else res.json(book);
    } catch{
        next("Error in editing book")
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const book = await BookModel.findByIdAndDelete(req.params.id);
        if (!book) next("book not found");
        else res.json(book);
    } catch{
        next("Error in removing book")
    }
});


router.use((err, req, res, next) => {
    res.send("oh no there is some thing wrong happend :( \n" + err);
});

module.exports = router;