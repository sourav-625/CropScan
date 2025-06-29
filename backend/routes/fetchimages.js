const express = require("express");
const router = express.Router();
const Image = require("../models/Image")

//Route: Get all the Images using: GET "/api/images/fetchallimages" 

router.get("/fetchallimages",async (req,res)=>{

    const images = await Image.find();
    res.json(images);
   
});


module.exports = router;