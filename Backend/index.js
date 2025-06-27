const express = require('express')
const cors = require('cors')
const { Log } = require('../Logging/index.js'); 
const mongoose = require('mongoose');
const router = require('./Routes/urlRoutes.js');


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/22b91a61b1');

// app.use((req, res, next) => {
//     const { stack, level, package, message } = req.query;
//     if (!stack || !level || !package || !message) {
//         res.status(400).send('Missing required query parameters: stack, level, package, message');
//         return;
//     }
//     Log(stack, level, package, message);
//     next();
// });



app.get('/',(req, res) => res.send('Backend Working!'));

app.use('/shorturls', router);
app.listen(port)
