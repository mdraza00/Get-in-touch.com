const express = require("express");
const homepageController = require("../controller/homepageController");
const authController = require("../controller/authController");
const homepageRouter = express.Router();

homepageRouter.get(
  "/",
  authController.isAuthorized,
  homepageController.sendHomepage
);
homepageRouter.post(
  "/",
  authController.isAuthorized,
  homepageController.upload.single("postImage"),
  homepageController.addPost
);
module.exports = homepageRouter;
