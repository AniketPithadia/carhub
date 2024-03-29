// Desc: This file contains the logic for user signup, signin, signout and google auth
// CODE WRITTEN BY RENIL SONI
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPwd = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPwd });

  try {
    await newUser.save();
    return res.json("User Created Successfully");
  } catch (error) {
    next(errorHandler(409, "User Already Exists"));
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const validUser = await User.findOne({ email });
    console.log(validUser);
    if (!validUser) return next(errorHandler(404, "User Not Found, Try Again"));
    const validPwd = bcryptjs.compareSync(password, validUser.password);
    if (!validPwd) {
      console.log("userinput", validPwd);
      console.log("db", validUser.password);
      return next(errorHandler(401, "Wrong Password,Try again"));
    }
    // Adding jwt for security reasons
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pwd, ...rest } = validUser._doc;
    // Setting the cookie that will expire in 24 hours
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been Logged out");
  } catch (error) {
    next(error);
  }
};
