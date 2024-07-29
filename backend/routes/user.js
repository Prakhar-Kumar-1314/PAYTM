const { Router } = require("express");
const { userValidation, userExists, userValidationSignIn, userExistsSignIn } = require("../validation");
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

userRouter.post("/signin", userValidationSignIn, userExistsSignIn, async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username, password});

    if (user) {
        const token = jwt.sign({userID: user._id}, JWT_SECRET);
        res.status(200).json({
        token: token
    })
    return;
}
    res.status(411).json({
        message: "Error while logging in"
    })

})

module.exports = {
    userRouter,
}

