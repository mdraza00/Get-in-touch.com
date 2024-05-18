const User = require("../models/userModel");

exports.sendfriendsPage = async function (req, res) {
  let users;
  if (req.query.searchedFriend) {
    const name = req.query.searchedFriend.split(" ");
    users = await User.find({
      isActive: true,
      role: "user",
      firstName: name[0],
      lastName: name[1],
      email: { $ne: req.user.email, $nin: req.user.friends },
    });
  } else {
    users = await User.find({
      isActive: true,
      role: "user",
      email: { $ne: req.user.email, $nin: req.user.friends },
    });
  }
  res.render("friends.ejs", {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    users: users,
    profilePhoto: req.user.profilePhoto,
  });
};
exports.loadSearchedFriend = async function (req, res) {
  return res.send("hello");
};
exports.sendFriendRequest = async function (req, res) {
  const requestedUser = await User.findOne(req.body);
  requestedUser.friendRequests.push(req.user.email);
  const friendRequests = [...new Set(requestedUser.friendRequests)];
  const user = await User.findOneAndUpdate(
    req.body,
    {
      friendRequests: friendRequests,
    },
    { new: true }
  );

  res.redirect("/friends");
};
