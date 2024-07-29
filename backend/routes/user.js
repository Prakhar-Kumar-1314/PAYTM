const { Router } = require("express");
const { User, Account } = require("../db");
const { userValidation, userExists, userValidationSignIn, userExistsSignIn, authMiddleware } = require("../auth");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require("zod");

const userRouter = Router();

userRouter.post("/signup", userValidation, userExists, async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    try {
        const user = await User.create({
            username,
            password,
            firstName,
            lastName
        });

        const userID = user._id;

        await Account.create({
            userId: userID,
            amount: 1 + Math.random() * 10000
        });

        const token = jwt.sign({ userId: userID }, JWT_SECRET);

        res.status(200).json({
            message: "User created successfully",
            token
        });
    } catch (err) {
        res.status(500).json({ msg: "Error creating user", error: err.message });
    }
});

userRouter.post("/signin", userValidationSignIn, userExistsSignIn, async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error while logging in", error: err.message });
    }
});

const updateBody = zod.object({
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
    try {
        const success = updateBody.safeParse(req.body);

        if (!success.success) {
            return res.status(400).json({
                msg: "Invalid input data",
                error: success.error.format()
            });
        }

        await User.updateOne({ _id: req.userId }, req.body);
        res.status(200).json({ msg: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error updating user", error: err.message });
    }
});

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter} },
                { lastName: { "$regex": filter} }
            ]
        });

        res.status(200).json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        res.status(500).json({ msg: "Error fetching users", error: err.message });
    }
});

module.exports = {
    userRouter
};
