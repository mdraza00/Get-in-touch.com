const express = require("express");
const jwt = require("jsonwebtoken");
const loginController = require("../controller/loginController");
const loginRouter = express.Router();

loginRouter.get("/", loginController.sendLoginPage);
loginRouter.post("/", loginController.findAndLogInUser);
module.exports = loginRouter;
