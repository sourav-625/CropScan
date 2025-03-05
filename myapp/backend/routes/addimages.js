const express = require("express");
const router = express.Router();
const Image = require("../models/Image")

//Route: Add a new Image as JSON using: POST "api/images/addimage"

router.post("/addimage",async (req , res)=>{

    const{filename,type,image} = req.body;

    const img = new Image({
        filename,type,image
    });

    const savedImage = await img.save();
    res.json(savedImage); 
});


module.exports = router;