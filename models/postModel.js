const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  filename: String,
  path: String,
  email: String,
  firstName: String,
  lastName: String,
});

const Post = mongoose.model("Posts", postSchema);
module.exports = Post;
