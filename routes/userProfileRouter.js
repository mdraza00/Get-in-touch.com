const express = require("express");
const authController = require("../controller/authController");
const userProfileController = require("../controller/userProfileController");
const userProfileRouter = express.Router();

userProfileRouter
  .get(
    "/",
    authController.isAuthorized,
    userProfileController.sendUserProfilePage
  )
  .post(
    "/",
    authController.isAuthorized,
    userProfileController.updateUserInformation
  )
  .post(
    "/photo",
    authController.isAuthorized,
    userProfileController.upload.single("user-profile-photo"),
    userProfileController.updateProfilePhoto
  )
  .post(
    "/reset-password",
    authController.isAuthorized,
    userProfileController.changePassword
  )
  .post(
    "/delete-account",
    authController.isAuthorized,
    userProfileController.deleteAccount
  )
  .post(
    "/disable-account",
    authController.isAuthorized,
    userProfileController.disableAccount
  );

module.exports = userProfileRouter;
