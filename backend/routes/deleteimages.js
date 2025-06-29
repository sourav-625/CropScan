const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

// Route: Delete an existing image using DELETE "/api/images/deleteimage/:id"
router.delete("/deleteimage/:id", async (req, res) => {
    try {
        // Find the image by ID
        let image = await Image.findById(req.params.id);
        
        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }

        // Delete the image
        await Image.findByIdAndDelete(req.params.id);

        res.json({ success: "Your image has been deleted", image });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
