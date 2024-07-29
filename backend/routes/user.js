const { Router } = require("express");
const { userValidation, userExists, userValidationSignIn, userExistsSignIn, authMiddleware } = require("../auth");
const { User } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")
const zod = require("zod")

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

userRouter.post("/signin", userValidationSignIn, userExistsSignIn, authMiddleware, async (req, res) => {
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

const updateBody = zod.object({
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
})

userRouter.put("/", authMiddleware, async (req, res) => {
    const success = updateBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            msg: "Error while updating information"
        })
    }
    await User.updateOne({_id: req.userID}, req.body);
    res.status(200).json({
        msg: "User updated successfully"
    })
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [
    {
        firstName: {
            "$regex": filter 
        }, lastName: {
            "$regex": filter 
        }
    }
  ]
    })

    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = {
    userRouter,
}

