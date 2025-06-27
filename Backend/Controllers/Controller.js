const Url = require('../Models/Model.js');
const { nanoid } = require('nanoid'); 


const Add_shorturl = async(req,res)=>{
   const {url,validity} = req.body;
    if (!url || !validity) {
        return res.status(400).json({ error: 'URL and validity are required' });
    }
    let shortcode;
    if(req.body.shortcode){
        shortcode = req.body.shortcode;
    }else{
        shortcode = nanoid(6);
    }

    const expiry = new Date(Date.now() + validity * 60 * 1000); 

    const newUrl = new Url({
        url: url,
        shortLink: shortcode,
        expiry: expiry
    });
    newUrl.save()
        .then(() => {
            res.status(201).json( {shortLink: shortcode, expiry: expiry} );
        })
        .catch((err) => {
            console.error('Error saving URL:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
}


const get_statistics = async (req, res) => {
    const { shortLink } = req.params;
    if (!shortLink) {
        return res.status(400).json({ error: 'Short link is required' });
    }

    try {
        const urlData = await Url.findOne({ shortLink: shortLink });
        if (!urlData) {
            return res.status(404).json({ error: 'Short link not found' });
        }
        res.status(200).json(urlData);
    } catch (err) {
        console.error('Error fetching URL statistics:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { Add_shorturl,get_statistics };