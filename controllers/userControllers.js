import asyncHandler from "express-async-handler";
import { checkCollegeEmail } from "../utilities/emailValidators.js";
import generateToken from "../utilities/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Invalid email address!");
  }

  const isValidCollegeEmail = checkCollegeEmail(email);
  if (!isValidCollegeEmail) {
    res.status(400);
    throw new Error("Invalid College Email Address!");
  }

  const token = generateToken("token1");
  res.status(201);
  res.json({ email, token });
});
