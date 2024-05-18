const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const ultraSuperKey =
  "This is the most ultra super key that will be used to authorized the use and it has to be a super duper secret otherwise any one can use my account.";

const jwtGenerator = (user) => jwt.sign(user, ultraSuperKey);

exports.sendUserProfilePage = async function (req, res) {
  res.status(200).render("userProfile.ejs", {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    dob: req.user.dob,
    profilePhoto: req.user.profilePhoto,
  });
};

exports.updateUserInformation = async function (req, res) {
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    req.body,
    { new: true }
  );
  const cookie = jwtGenerator({ user });

  res.cookie("authorization", `bearer ${cookie}`).redirect("/my-profile");
};

exports.changePassword = async function (req, res) {
  const isPasswordCorrect = await bcrypt.compare(
    req.body.previousPassword,
    req.user.password
  );
  if (isPasswordCorrect) {
    if (req.body.previousPassword !== req.body.newPassword) {
      const newPassword = await bcrypt.hash(req.body.newPassword, 15);
      const user = await User.findOneAndUpdate(
        req.user,
        {
          password: newPassword,
        },
        { new: true }
      );
      const cookie = jwtGenerator({ user });
      return res
        .cookie("authorization", `bearer ${cookie}`)
        .redirect("/my-profile");
    } else return res.send("previous password and new passoword is same");
  } else return res.send("Password does not mathch");
};

exports.deleteAccount = async (req, res) => {
  await User.findOneAndDelete(req.user);
  res.redirect("/my-profile");
};

exports.disableAccount = async (req, res) => {
  await User.findOneAndUpdate(req.user, { isActive: false });
  res.redirect("/my-profile");
};

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    return next(null, "./public/userProfileImages");
  },
  filename: function (req, file, next) {
    return next(
      null,
      `${req.user.email.replace(".", "dot")}.${file.originalname.split(".")[1]}`
    );
  },
});

exports.upload = multer({ storage });

exports.updateProfilePhoto = async function (req, res) {
  const profilePhoto = `${req.user.email.replace(".", "dot")}.${
    req.file.originalname.split(".")[1]
  }`;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { profilePhoto: profilePhoto },
    { new: true }
  );
  const cookie = jwtGenerator({ user });
  res.cookie("authorization", `bearer ${cookie}`).redirect("/my-profile");
};
