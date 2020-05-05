require('dotenv').config()  
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');
const categoryRouter = require('./routes/categories');


const port = process.env.port || 5000;
const app = express();
mongoose.connect('mongodb://localhost:27017/goodReads', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/categories', categoryRouter);


app.get('/', (req, res, next) => {
    res.send('HELLO iam the root path');
    next('error statment');
});

app.use((err, req, res, next) => {
    res.send("oh no there is some thing wrong happend :( \n" + err);
});
app.listen(port, (err) => {
    if (!err) console.log(`started new server on port ${port}`)
})