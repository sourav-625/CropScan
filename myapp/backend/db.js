const mongoose = require("mongoose");

const mongURI = "mongodb+srv://ninjaplays792020:letsgowithatlas@omsinghatlas.wi2ab.mongodb.net/Ag-Tech";

const connectToMongo = ()=>{
    mongoose.connect(mongURI);
    console.log("Connected to MongoDB Database successfully!");
};

module.exports = connectToMongo;