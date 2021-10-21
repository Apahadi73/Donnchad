import express from "express";
import { body } from "express-validator";
import {
  authUserController,
  deleteUser,
  getUserById,
  getUsers,
  registerUserController,
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
      [
        // we use the body middleware to validate the body of the request body
        body("email").isEmail().withMessage("Invalid Email"),
        body("password")
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage(
            "Password must be between 4  to 20 character in length."
          ),
      ],
      (req, res, next) => registerUserController(req, res, next, this.userRepo)
    );

    this.router.route("/login").post(
      [
        // we use the body middleware to validate the body of the request body
        body("email").isEmail().withMessage("Invalid Email"),
        body("password")
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage(
            "Password must be between 4  to 20 character in length."
          ),
      ],
      (req, res, next) => authUserController(req, res, next, this.userRepo)
    );

    this.router
      .route("/")
      .get(async (req, res, next) => getUsers(req, res, next, this.userRepo));
    this.router
      .route("/:uid")
      .get(async (req, res, next) =>
        getUserById(req, res, next, this.userRepo)
      );
    this.router
      .route("/:uid")
      .put(async (req, res, next) => updateUser(req, res, next, this.userRepo));
    this.router
      .route("/:uid")
      .delete(async (req, res, next) =>
        deleteUser(req, res, next, this.userRepo)
      );
    this.router
      .route("/:uid/forgot-password")
      .post([protect], async (req, res, next) =>
        resetPassword(req, res, next, this.userRepo)
      );

    return this.router;
  }
}

export default UserRoute;
