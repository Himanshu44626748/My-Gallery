const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    _id: Number,
    imageName:  {
        type: String,
        requied: true,
      },
    imageUrl:  {
        type: String,
        requied: true,
      },
      imageDetail:  {
        type: String,
        requied: true,
      }
});

const image = new mongoose.model("image", imageSchema);

module.exports = image;