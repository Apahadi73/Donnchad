import express from 'express'
import { body } from "express-validator";

import { registerUser } from '../controllers/userControllers.js'

const router = express.Router()

// routes
router.route("/signup").post([
    // we use the body middleware to validate the body of the request body
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4  to 20 character in length."),
  ],registerUser)

export {router as userRouter}