const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');


// import routes
const postRoute = require('./routes/posts');


// middlewares -> function that execute when routes are hit
// app.use('/', () => {
//     console.log('Some logic to run');
// })
app.use('/posts', postRoute);
    

// routes
app.get('/', (req, res) => {
    res.send('we are on home');
});


// connect mongoose
mongoose.connect('process.env.DB_connection', { useNewUrlParser: true, useUnifiedTopology: true } , () => {
    console.log('connected to db');
})

//listen
app.listen(3000);