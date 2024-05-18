const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userModel = require("./models/userModel");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const homepageRouter = require("./routes/homepageRouter");
const chatingRouter = require("./routes/chatingRouter");
const friendsRouter = require("./routes/friendsRouter");
const userProfileRouter = require("./routes/userProfileRouter");
const friendRequestsRouter = require("./routes/friendRequestsRouter");
const adminRouter = require("./routes/adminRouter");
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", "views");

// routes
app.use("/", homepageRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/chat", chatingRouter);
app.use("/friends", friendsRouter);
app.use("/my-profile", userProfileRouter);
app.use("/friend-requests", friendRequestsRouter);
app.use("/admin", adminRouter);
module.exports = app;
