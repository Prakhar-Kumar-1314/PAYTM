const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_TOKEN } = require("../config");
const { User } = require("../database/mongo");

// User Validation --- We are checking if the user passes valid inputs or not. If it does then apan error fekega warna we chill.

const userValidation = (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    zod
      .object({
        email: zod.string().email(),
        password: zod.string().min(6),
        firstName: zod.string(),
        lastName: zod.string(),
      })
      .safeParse(email, password, firstName, lastName);
    next();
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Checks if user exists during signup or not. If user exists he can't signup again and will have to login.

const userExistsSignUp = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    next(); // Proceed to the next middleware if the user doesn't exist
  } catch (err) {
    res.status(500).json({
      error: err.message, // Use 500 for server error
    });
  }
};

// Checks if user exists or not during login

const userExistsLogin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "User does not exist, please signup",
      });
    }
    next();
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Checks the login type

const userValidateSignin = (req, res, next) => {
  const { email, password } = req.body;

  try {
    const zoddd = zod.object({
      email: zod.string().email(),
      password: zod.string().min(6),
    });
    zoddd.safeParse(email, password);
    next();
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  userValidation, userValidateSignin, userExistsLogin, userExistsSignUp
};
