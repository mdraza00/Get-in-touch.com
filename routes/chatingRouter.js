const express = require("express");
const authController = require("../controller/authController");
const chatingController = require("../controller/chatingController");
const chatingRouter = express.Router();

chatingRouter.get(
  "/",
  authController.isAuthorized,
  chatingController.sendChatPage
);
module.exports = chatingRouter;
