import express from "express";
import { body } from "express-validator";

import {
  authUser,
  deleteUser,
  getUserById,
  getUsers,
  registerUser,
  updateUser,
  resetPassword,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
router.route("/signup").post(
  [
    // we use the body middleware to validate the body of the request body
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4  to 20 character in length."),
  ],
  registerUser
);
router.route("/login").post(
  [
    // we use the body middleware to validate the body of the request body
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4  to 20 character in length."),
  ],
  authUser
);

// for testing purpose
router.route("/").get(getUsers);
router.route("/:uid").get(getUserById);
router.route("/:uid").put(updateUser);
router.route("/:uid").delete(deleteUser);

// update password route
router.route("/:uid/forgot-password").post([protect], resetPassword);

export { router as userRouter };
