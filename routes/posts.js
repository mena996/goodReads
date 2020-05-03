const express = require('express');
const PostModel = require('../models/posts');
const router = express.Router();
router.get('/', (req, res, next) => {
    return PostModel.find({}).populate('auther_id', ['firstName', 'lastName']).exec((err, posts) => {
        if (err) return res.send(err);
        res.json(posts);
    });
});
router.get('/:id', (req, res, next) => {
    return PostModel.findById(req.params.id).populate('auther_id', ['firstName', 'lastName']).exec((err, posts) => {
        if (err) next(err);
        res.json(posts);
    });
});
router.post('/', (req, res, next) => {
    PostModel.create(req.body, (err, doc) => {
        if (err) next(err);
        res.json(doc);
    })
});
router.patch('/:id', (req, res, next) => {
    const { body: { title, body } } = req;
    const post = {
        title, body
    }
    Object.keys(post).forEach(key => post[key] === undefined && delete post[key]);
    console.log(post);
    PostModel.findByIdAndUpdate(req.params.id, post, (err) => {
        if (err) next(err);
        res.json(post);
    });
});
router.delete('/:id', (req, res, next) => {
    return PostModel.findByIdAndDelete(req.params.id, (err, posts) => {
        if (err) next(err);
        res.json(posts);
    });
});

router.use((err, req, res, next) => {
    res.send("oh no there is some thing wrong happend :( \n" + err);
});

module.exports = router;