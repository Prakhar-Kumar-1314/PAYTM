const zod = require("zod");
const { User } = require("../backend/db")

const userValidation = (req, res, next) => {
    const {username, password, firstName, lastName} = req.body;

    try {
        zod.object({
            username: zod.string().email(),
            password: zod.string().min(6),
            firstName: zod.string(),
            lastname: zod.string()
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

const userExists = (req, res, next) => {
    const {username, password} = req.body;

    try {
        User.findOne({
            username: username,
            password: password
        })
            .then((data) => {
                if (data) {
                    res.status(411).json({
                        msg: "User Already exists"
                    })
                } else {
                    next();
                }
         }) 
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

module.exports = {
    userExists,
    userValidation
}