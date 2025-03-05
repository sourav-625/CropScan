const connectToMongo = require("./db");
const express = require('express');
const cors = require("cors");

connectToMongo();
const app = express()
const port = 5000

app.use(cors());
app.use(express.json({ limit: "10mb" }));  // Increases the JSON body size limit to 10MB.
app.use(express.urlencoded({ limit: "10mb", extended: true })); //Increases the limit for URL-encoded form data.

//Available Routes
app.use("/api/images", require("./routes/addimages"));

app.listen(port, () => {
    console.log(`Backend Server listening on port ${port}`)
  });