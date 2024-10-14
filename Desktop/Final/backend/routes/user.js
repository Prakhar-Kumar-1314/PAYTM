const { Router } = require("express");
const {User} = require("../database/mongo");
const {jwt} = require("jsonwebtoken")
const {userExistsSignUp, userValidation, userValidateSignin} = require("../middleware/user");
const {JWT_SECRET_TOKEN} = require("../config");

const userRouter = Router();

userRouter.post("/signup", userExistsSignUp, userValidation , async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    try {
        const user = await User.create({
            email, password, firstName, lastName
        })

        res.status(200).json({
            message: "User created successfully",
        })
    } catch (err) {
        res.status(500).json({
            msg: "Error creating user",
            error: err.message
        })
    }
})

userRouter.post("/signin", userValidateSignin, userValidation, async (req, res) => {
    const {email, password} = req.body;

    try {
       const user = await User.findOne({ email, password });

       if (user) {
           res.status(200).json({
               message: "Signed In!"
           })
       } else {
           res.status(400).json({
               message: "User does not exist, please signup"
           })
       }
    } catch (err) {
        res.status(400).json({
            message: "Error while logging in",
            error: err.message
        })
    }
})

module.exports = {
    userRouter
}
