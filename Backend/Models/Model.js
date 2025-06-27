const mongoose = require('mongoose'); 

const Url = new mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    shortLink:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    expiry:{
        type:Date,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Url', Url);