const mongoose = require('mongoose'); 

var Url = new mongoose.Schema({
    url:{
        type:String,
        required:true,
        unique:true
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