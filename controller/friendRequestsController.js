const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const ultraSuperKey =
  "This is the most ultra super key that will be used to authorized the use and it has to be a super duper secret otherwise any one can use my account.";

const jwtGenerator = (user) => jwt.sign(user, ultraSuperKey);

exports.sendFriendRequestsPage = async function (req, res) {
  let users = [];
  const requests = req.user.friendRequests;
  for (let i = 0; i < requests.length; i++) {
    const user = await User.findOne({ email: requests[i] });
    users.push({
      name: `${user.firstName} ${user.lastName}`,
      profilePhoto: user.profilePhoto,
      email: user.email,
    });
  }
  res.status(200).render("friendRequests.ejs", {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    profilePhoto: req.user.profilePhoto,
    users: users,
  });
};

exports.addFriend = async function (req, res) {
  const requestSender = await User.findOne({ email: req.body.email });
  const toSended = await User.findOne({ email: req.user.email });

  requestSender.friends.push(toSended.email);
  toSended.friends.push(requestSender.email);

  friendRequests = toSended.friendRequests;
  const newFriendRequestsList = [];
  for (let i = 0; i < friendRequests.length; i++) {
    if (friendRequests.includes(requestSender.email)) continue;
    else newFriendRequestsList.push(friendRequests[i]);
  }

  await User.findOneAndUpdate(
    { email: requestSender.email },
    { friends: requestSender.friends }
  );
  const user = await User.findOneAndUpdate(
    { email: toSended.email },
    { friends: toSended.friends, friendRequests: newFriendRequestsList },
    { new: true }
  );
  const cookie = jwtGenerator({ user });
  res.cookie("authorization", `bearer ${cookie}`).redirect("/friend-requests");
};
