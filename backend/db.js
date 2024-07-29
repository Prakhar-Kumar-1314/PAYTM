const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://prakharkumar1314:4h0TKimFXaHO8MyJ@cluster0.kwskxal.mongodb.net/Paytm");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
}
