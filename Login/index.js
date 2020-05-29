const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');


// connect to db
mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('db connection is set')
});

// body parser
app.use(express.json());

// import routes
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, ()=> {
    console.log('App is running');
})