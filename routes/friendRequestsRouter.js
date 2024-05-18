const express = require("express");
const authController = require("../controller/authController");
const friendRequestsController = require("../controller/friendRequestsController");

const friendRequestsRouter = express.Router();

friendRequestsRouter
  .get(
    "/",
    authController.isAuthorized,
    friendRequestsController.sendFriendRequestsPage
  )
  .post("/", authController.isAuthorized, friendRequestsController.addFriend);

module.exports = friendRequestsRouter;
