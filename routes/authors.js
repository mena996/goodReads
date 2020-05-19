const express = require('express');
const AuthorModel = require('../models/authors');
const BookModel = require('../models/books');

const router = express.Router();

// router.get('/', (req, res, next) => {
//     return PostModel.find({}).populate('auther_id', ['firstName', 'lastName']).exec((err, posts) => {
//         if (err) return res.send(err);
//         res.json(posts);
//     });
// });

//need hook
// router.get('/:id/books', (req, res, next) => {
//     return AuthorModel.findById(req.params.id).populate('books').exec((err, author) => {
//         if (err) next(err);
//         res.json(author);
//     });
// });

router.get('/', async(req, res, next) => {
    try{
        const authors = await AuthorModel.find({}).populate('author');
        if(!authors) next("authors not found")
        else res.json(authors);
    }catch(err){
        next("whoops... we can't display authors something wrong.");
    }
});

router.get('/:id', async(req, res, next) => {
    try{
        const author = await AuthorModel.findById(req.params.id);
        if(!author) next("author not found")
        else res.json(author);
    }catch(err){
        next("whoops... something wrong.");
    }
});


// without hook
router.get('/:id/books', (req, res, next) => {
    return BookModel.find({}).populate('author').populate('category').where('author').equals(req.params.id).exec((err, books) => {
        if (err) next(err);
        else res.json(books);
    });
});


router.post('/', async(req, res, next) => {
    try {
        const { firstName, lastName, birthDate, image, books } = req.body;
        const author = await AuthorModel.create({
            firstName,
            lastName,
            birthDate,
            image,
            books
        });
        res.send(author)
    } catch {
        next("Erorr while adding a author");
    }
});
router.patch('/:id', async(req, res, next) => {
    try {
        const author = await AuthorModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (!author) next("author not found");
        else res.json(author);
    } catch {
        next("Error in editing author")
    }
});
router.delete('/:id', async(req, res, next) => {
    try {
        const author = await AuthorModel.findByIdAndDelete(req.params.id);
        if (!author) next("author not found");
        else res.json(author);
    } catch {
        next("Error in removing author")
    }
});

router.use((err, req, res, next) => {
    res.send("oh no there is some thing wrong happend :( \n" + err);
});

module.exports = router;