const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const ultraSuperKey =
  "This is the most ultra super key that will be used to authorized the use and it has to be a super duper secret otherwise any one can use my account.";

const jwtGenerator = (user) => jwt.sign(user, ultraSuperKey);

exports.sendLoginPage = function (req, res) {
  res.render("login.ejs");
};
exports.findAndLogInUser = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user === null) {
      res.status(200).send("user not found");
    } else {
      if (await bcrypt.compare(password, user.password)) {
        if (user.isActive) {
          const cookie = jwtGenerator({ user });
          res
            .status(200)
            .cookie("authorization", `bearer ${cookie}`)
            .redirect("/");
        } else res.status(409).send("User Account is Disabled");
      } else {
        res.status(401).send("Invalid email or password");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("An error has occured the error is = " + error);
  }
};
