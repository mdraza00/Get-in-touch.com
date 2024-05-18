const express = require("express");
const authController = require("../controller/authController");
const friendsController = require("../controller/freindsController");
const friendsRouter = express.Router();

friendsRouter
  .get("/", authController.isAuthorized, friendsController.sendfriendsPage)
  .post("/", authController.isAuthorized, friendsController.sendFriendRequest);
module.exports = friendsRouter;
