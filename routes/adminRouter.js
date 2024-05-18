const express = require("express");

const authController = require("../controller/authController");
const adminController = require("../controller/adminController");

const adminRouter = express.Router();

adminRouter
  .get(
    "/",
    authController.isAuthorized,
    authController.isAdmin,
    adminController.loadAdminPanel
  )
  .post(
    "/",
    authController.isAuthorized,
    authController.isAdmin,
    adminController.loadAllUsers
  )
  .get(
    "/manage-users",
    authController.isAuthorized,
    authController.isAdmin,
    adminController.sendManageUserPage
  )
  .post(
    "/manage-users",
    authController.isAuthorized,
    authController.isAdmin,
    adminController.manageUser
  );

module.exports = adminRouter;
