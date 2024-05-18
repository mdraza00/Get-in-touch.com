const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ultraSuperKey =
  "This is the most ultra super key that will be used to authorized the use and it has to be a super duper secret otherwise any one can use my account.";

exports.isAuthorized = async function (req, res, next) {
  if (req.cookies.authorization) {
    const token = req.cookies.authorization.split(" ")[1];
    const user = jwt.verify(token, ultraSuperKey).user;
    if (user) {
      const findUser = await User.findOne({ email: user.email });
      if (findUser) {
        req.user = user;
        next();
      } else {
        res.status(401).redirect("/login");
      }
    } else {
      res.status(401).redirect("/login");
    }
  } else {
    res.status(401).redirect("/login");
  }
};

exports.isAdmin = function (req, res, next) {
  if (req.user.role === "admin") next();
  else res.status(401).redirect("/login");
};
