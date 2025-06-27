const express = require('express')
const router=express.Router();
const {Add_shorturl,get_statistics} = require('../Controllers/Controller.js');



router.post('/',Add_shorturl);
router.get('/:shortLink',get_statistics)

module.exports=router;