const { Router } = require("express");
const { userValidation, userExists, userValidationSignIn, userExistsSignIn, authMiddleware } = require("../auth");
const { User, Account } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require("zod");

userRouter.post("/signup", userValidation, userExists, async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;

        const user = await User.create({
            username,
            password,
            firstName,
            lastName
        });

        const userId = user._id;

        await Account.create({
            userId, 
            amount: 1 + Math.random() * 10000 
        });

        const token = jwt.sign({ userId }, JWT_SECRET);

        res.status(200).json({
            message: "User created successfully",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

userRouter.post("/signin", userValidationSignIn, userExistsSignIn, async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username, password });

        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            res.status(200).json({
                token
            });
            return;
        }
        res.status(401).json({
            message: "Error while logging in"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error signing in",
            error: error.message
        });
    }
});

const updateBody = zod.object({
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
    const parsed = updateBody.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({
            msg: "Error while updating information",
            error: parsed.error.errors
        });
        return;
    }

    try {
        await User.updateOne({ _id: req.userID }, req.body);
        res.status(200).json({
            msg: "User updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
});

userRouter.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter} },
                { lastName: { "$regex": filter} }
            ]
        });

        res.status(200).json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
});

module.exports = {
    userRouter,
};
