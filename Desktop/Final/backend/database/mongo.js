const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://prakharkumar1314:4h0TKimFXaHO8MyJ@cluster0.kwskxal.mongodb.net/Stake"
);

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
