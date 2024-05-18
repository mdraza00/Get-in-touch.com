const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  profilePhoto: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  friendRequests: [String],
  friends: [String],
  isActive: { type: Boolean, default: true },
});

UserSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 15);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.log(err);
  }
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
