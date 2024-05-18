const multer = require("multer");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");

const ultraSuperKey =
  "This is the most ultra super key that will be used to authorized the use and it has to be a super duper secret otherwise any one can use my account.";

exports.sendHomepage = async function (req, res) {
  const posts = await Post.find({ email: req.user.email });
  res.status(200).render("homepage.ejs", {
    pageTitle: "Homepage",
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    posts: posts,
    profilePhoto: req.user.profilePhoto,
  });
};
exports.addPost = async function (req, res) {
  const { filename, path } = req.file;
  const { firstName, lastName, email } = req.user;
  const post = new Post({
    filename,
    path,
    email,
    firstName,
    lastName,
  });
  try {
    await post.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("An Error has occured, error = " + err);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    return next(null, "./public/posts");
  },
  filename: function (req, file, next) {
    return next(null, `${req.user.email}-${Date.now()}-${file.originalname}`);
  },
});
exports.upload = multer({ storage });
