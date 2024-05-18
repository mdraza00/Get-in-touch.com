const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const ultraSuperKey =
  "This is the most ultra super key that will be used to authorized the use and it has to be a super duper secret otherwise any one can use my account.";

exports.createNewUser = async function (req, res) {
  const isUserExists = await User.findOne({ email: req.body.email });
  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(403).render("signup", { error: "passwordNotMatch" });
  }
  if (isUserExists === null) {
    const profilePhoto = "userDefaultImage.jpg";
    const userData = req.body;
    userData.profilePhoto = profilePhoto;
    const user = new User(userData);
    try {
      await user.save();
      const token = jwt.sign({ user }, ultraSuperKey);
      req.user = user;
      return res
        .status(200)
        .clearCookie("authorization")
        .cookie("authorization", `bearer ${token}`)
        .redirect("/");
    } catch (error) {
      return res.send(`An Error has been occured Error = ${error}`);
    }
  } else {
    return res.status(403).render("signup", { error: "userAlreadyExists" });
  }
};
exports.sendRegisterPage = function (req, res) {
  res.status(200).render("signup.ejs", { error: "" });
};
