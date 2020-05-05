const express = require('express');
const reviewModel = require('../models/reviewbooks');
const router = express.Router();

// get all review test 
router.get('/', (req, res, next) => {
    return reviewModel.find({}).populate('book').populate('user').exec((err, review) => {
        if (err) next(err);
        res.json(review);
    });
});


//get user review 
router.get('/:id', (req, res, next) => {
    return reviewModel.findById(req.params.id).populate('user').populate('book').exec((err, review) => {
        if (err) next(err);
        res.json(review);
    });
});


//new review
router.post('/', (req, res, next) => {
    reviewModel.create(req.body, (err, doc) => {
        if (err) next(err);
        res.json(doc);
    })
});



// update review
router.patch('/:id', (req, res, next) => {
    const { body: { review } } = req;
    reviewModel.findByIdAndUpdate(req.params.id,
    {review},
    {new: true , runValidators: true},
    (err,review)=>{
        if(err) next(err);
        res.json(review)
    })
});


//delete review
router.delete('/:id', (req, res, next) => {
    return reviewModel.findByIdAndDelete(req.params.id, (err, reviews) => {
        if (err) next(err);
        res.json(reviews);
    });
});

router.use((err, req, res, next) => {
    res.send("oh no there is some thing wrong happend :( \n" + err);
});


module.exports = router;