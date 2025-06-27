const express = require('express')
const cors = require('cors')
const { nanoid } = require('nanoid')
const { Log } = require('../Logging/index.js'); 
const mongoose = require('mongoose');
const {router} = require('./Routes/urlRoutes.js');


const app = express()
const port = 3000


app.use(express.json());
app.use(cors());
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/22b91a61b1',(err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

app.use((req, res, next) => {
    const { stack, level, package, message } = req.query;
    if (!stack || !level || !package || !message) {
        res.status(400).send('Missing required query parameters: stack, level, package, message');
        return;
    }
    Log(stack, level, package, message);
    next();
});



app.get('/',(req, res) => res.send('Hello World!'));


app.use('/shorturls',router);
app.listen(port)
