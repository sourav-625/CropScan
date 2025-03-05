const mongoose = require("mongoose");

const mongURI = "mongodb://localhost:27017/Ag-Tech?directConnection=true&tls=false&readPreference=primary";

const connectToMongo = ()=>{
    mongoose.connect(mongURI);
    console.log("Connected to MongoDB Database successfully!");
};

module.exports = connectToMongo;