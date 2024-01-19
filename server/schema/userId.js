const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    default: "-",
  },
  password: String,
  action: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default: "../image/download.png",
  },
});

const userId = mongoose.model("userIds", schema);
module.exports = userId;
