const { Router } = require("express");
const { userValidation, userExists } = require("../validation");
const { User } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")

userRouter.post("/signup", userValidation, userExists, async (req, res) => {
    const {username, password, firstName, lastName} = req.body;

        const user = await User.create({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
        const userID = user._id;

        const token = jwt.sign({userID}, JWT_SECRET)

        res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

module.exports = {
    userRouter,
}

