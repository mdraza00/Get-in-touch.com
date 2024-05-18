const User = require("../models/userModel");

exports.sendChatPage = async function (req, res) {
  const friends = [];
  for (let i = 0; i < req.user.friends.length; i++) {
    const { firstName, lastName, email, profilePhoto } = await User.findOne({
      email: req.user.friends[i],
    });
    friends.push({
      name: `${firstName} ${lastName}`,
      profilePhoto: profilePhoto,
    });
  }
  res.status(200).render("chating.ejs", {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    profilePhoto: req.user.profilePhoto,
    friends: friends,
  });
};
