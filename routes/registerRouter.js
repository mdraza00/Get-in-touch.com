const express = require("express");
const registerController = require("../controller/registerController");
const registerRouter = express.Router();
registerRouter.get("/", registerController.sendRegisterPage);
registerRouter.post("/", registerController.createNewUser);
module.exports = registerRouter;
