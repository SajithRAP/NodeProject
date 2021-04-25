const express = require('express');
const app = express();
// Mongoose - mongodb connection
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Cross domain fectching. Cors will give access
app.use(cors());

// Body parser is required to convert data into appropriate format or it will be undefined
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// import routes
const postRoute = require('./routes/posts');


// middlewares -> function that execute when routes are hit
// app.use('/', () => {
//     console.log('Some logic to run');
// })
app.use('/posts', postRoute);


// routes
app.get('/', (req, res) => {
    res.send(`
        we are on home
        <br/>
        Navigate to /posts and /data routes
        <br/>
        /posts/id
    `);
});
app.get('/data', (req, res) => {
    res.send('we are on data');
});

// connect mongoose
// mongoose.connect('process.env.DB_connection', { useNewUrlParser: true }, () => {
//     console.log('connected to db');
// })

// mongoose.connect('process.env.DB_connection')
mongoose.createConnection(process.env.DB_connection, { useNewUrlParser: true, useUnifiedTopology: true })

//listen
app.listen(3000);




// fetch data 
// fetch('http://localhost:3000/posts')
//   .then(result => {
//     return result.json()
//   })
//   .then(data => {
//     console.log(data);
//   })
