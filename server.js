const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

const port = process.env.port || 5000;
const app = express();
mongoose.connect('mongodb://localhost:27017/blogs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('started conniction to mongodb');
    } else {
        console.log(err);
    }
});
mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use((req, res, next) => {
    console.log(new Date(),req.method,req.url);
    next();
});
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.get('/', (req, res, next) => {
    res.send('HELLO iam the root path');
    next('sdfghjklsdfghjk');
});

app.use((err, req, res, next) => {
    res.send("oh no there is some thing wrong happend :( \n" + err);
});
app.listen(port, (err) => {
    if (!err) console.log(`started new server on port ${port}`)
})