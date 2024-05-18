const User = require("../models/userModel");

exports.loadAdminPanel = function (req, res) {
  res.status(200).render("admin", {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    dob: req.user.dob,
    profilePhoto: req.user.profilePhoto,
  });
};
exports.sendManageUserPage = async function (req, res) {
  const users = await User.find({ role: { $ne: "admin" } });
  res.status(200).render("manageUsers", {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    profilePhoto: req.user.profilePhoto,
    email: req.user.email,
    dob: req.user.dob,
    users: users,
  });
};

exports.manageUser = async function (req, res) {
  const { activate, deActivate, deleteUser } = req.body;
  if (activate) {
    const user = await User.findOneAndUpdate(
      { email: activate },
      { isActive: true },
      { new: true }
    );
  } else if (deActivate) {
    const user = await User.findOneAndUpdate(
      { email: deActivate },
      { isActive: false },
      { new: true }
    );
  } else if (deleteUser) {
    await User.findOneAndDelete({ email: deleteUser });
  }
  res.status(200).redirect("/admin/manage-users");
};

exports.loadAllUsers = function (req, res) {
  res.redirect("/admin/manage-users");
};
