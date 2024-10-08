const zod = require("zod");
const { User } = require("./db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const userValidation = (req, res, next) => {
    const { username, password, firstName, lastName } = req.body;

    try {
        zod.object({
            username: zod.string().email(),
            password: zod.string().min(6),
            firstName: zod.string(),
            lastName: zod.string()
        }).parse({ username, password, firstName, lastName });
        next();
    } catch (err) {
        res.status(411).json({
            msg: "Incorrect Inputs",
            error: err.message
        });
    }
};

const userExists = async (req, res, next) => {
    const { username } = req.body;

    try {
        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(400).json({ msg: "User Already Exists" });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const userExistsSignIn = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const exists = await User.findOne({ username, password });
        if (!exists) {
            return res.status(400).json({ msg: "User Does not Exist" });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const userValidationSignIn = (req, res, next) => {
    const { username, password } = req.body;

    try {
        zod.object({
            username: zod.string().email(),
            password: zod.string().min(6)
        }).parse({ username, password });
        next();
    } catch (err) {
        res.status(411).json({
            msg: "Incorrect Inputs",
            error: err.message
        });
    }
};

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    userExists,
    userValidation,
    userExistsSignIn,
    userValidationSignIn,
    authMiddleware
};
