const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
    filename:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
  });

  const Image = mongoose.model("image",ImageSchema);
  module.exports = Image