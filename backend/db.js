const mongoose = require("mongoose");

const mongURI = databaseurl;

const connectToMongo = ()=>{
    mongoose.connect(mongURI);
    console.log("Connected to MongoDB Database successfully!");
};

module.exports = connectToMongo;
