const zod = require("zod");
const { User } = require("../backend/db")

const userValidation = (req, res, next) => {
    const {username, password, firstName, lastName} = req.body;

    try {
        zod.object({
            username: zod.string().email(),
            password: zod.string().min(6),
            firstName: zod.string(),
            lastName: zod.string()
        }).parse({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
        next();
    } catch (err) {
        res.status(411).json({
            msg: "Incorrect Inputs",
            error: err.message
        })
    }
}

const userExists = async (req, res, next) => {
    const { username } = req.body;
    
    try {
        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(400).json({  // Changed status code to 400
                msg: "User Already Exists"
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const userExistsSignIn = async (req, res, next) => {
    const { username, password } = req.body;
    
    try {
        const exists = await User.findOne({ username, password });
        if (!exists) {
            return res.status(400).json({ 
                msg: "User Does not Exist"
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const userValidationSignIn = (req, res, next) => {
    const {username, password} = req.body;

    try {
        zod.object({
            username: zod.string().email(),
            password: zod.string().min(6)
        }).parse({
            username: username,
            password: password,
        })
        next();
    } catch (err) {
        res.status(411).json({
            msg: "Incorrect Inputs",
            error: err.message
        })
    }
}


module.exports = {
    userExists,
    userValidation,
    userExistsSignIn,
    userValidationSignIn,
}