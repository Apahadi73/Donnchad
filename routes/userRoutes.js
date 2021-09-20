import express from "express";
import { body } from "express-validator";

import {
  deleteUser,
  getUserById,
  getUsers,
  registerUser,
  updateUser,
} from "../controllers/userControllers.js";

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

// for testing purpose
router.route("/").get(getUsers);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

export { router as userRouter };
