import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  resetPassword,
  updateUser,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

class UserRoute {
  constructor(userRepo) {
    this.userRepo = userRepo;
    // creates express router
    this.router = express.Router();
  }

  // creates user routes
  createUserRoute() {
    this.router.route("/signup").post(
      //   [
      //     // we use the body middleware to validate the body of the request body
      //     body("email").isEmail().withMessage("Invalid Email"),
      //     body("password")
      //       .trim()
      //       .isLength({ min: 4, max: 20 })
      //       .withMessage(
      //         "Password must be between 4  to 20 character in length."
      //       ),
      //   ],
      (req, res) => registerUser(req, res, this.userRepo)
    );

    this.router.route("/login").post(
      //   [
      //     // we use the body middleware to validate the body of the request body
      //     body("email").isEmail().withMessage("Invalid Email"),
      //     body("password")
      //       .trim()
      //       .isLength({ min: 4, max: 20 })
      //       .withMessage(
      //         "Password must be between 4  to 20 character in length."
      //       ),
      //   ],
      (req, res) => authUser(req, res, this.userRepo)
    );

    this.router
      .route("/")
      .get(async (req, res) => getUsers(req, res, this.userRepo));
    this.router
      .route("/:uid")
      .get(async (req, res) => getUserById(req, res, this.userRepo));
    this.router
      .route("/:uid")
      .put(async (req, res) => updateUser(req, res, this.userRepo));
    this.router
      .route("/:uid")
      .delete(async (req, res) => deleteUser(req, res, this.userRepo));
    this.router
      .route("/:uid/forgot-password")
      .post([protect], async (req, res) =>
        resetPassword(req, res, this.userRepo)
      );

    return this.router;
  }
}

export default UserRoute;
