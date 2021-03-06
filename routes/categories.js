const express = require('express');
const CategoryModel = require('../models/categories');
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
        const { name } = req.body;
        const category = await CategoryModel.create({
            name,
        });
        res.send(category)
    } catch{
        next("Erorr while adding a category");
    }
});
router.patch('/:id', async(req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (!category) next("category not found");
        else res.json(category);
    } catch{
        next("Error in editing category")
    }
});
router.delete('/:id', async(req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id);
        if (!category) next("category not found");
        else res.json(category);
    } catch{
        next("Error in removing category")
    }
});


router.use((err, req, res, next) => {
    res.send("oh no there is some thing wrong happend :( \n" + err);
});

module.exports = router;