import asyncHandler from "express-async-handler";
import brcypt from "bcrypt";

import pool from "../db/dbConfig.js";
import { checkCollegeEmail } from "../utilities/emailValidators.js";
import generateToken from "../utilities/generateToken.js";
import { Constants, Result } from "../utilities/Constants.js";
import redisClient from "../db/redisConfig.js";
import {
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "../services/user_services/UserServices.js";
import { BadRequestError } from "../types/Errors.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  var { password } = req.body;

  if (!email) {
    res.status(400);
    throw new BadRequestError("Email Missing");
  }

  const isValidCollegeEmail = checkCollegeEmail(email);
  if (!isValidCollegeEmail) {
    res.status(400);
    throw new BadRequestError("Invalid College Email Address!");
  }

  // checks whether the user already exists in the db or not
  const dbres = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  // if user exists in the db
  if (dbres && dbres.rows.length > 0) {
    res.status(400);
    throw new BadRequestError(
      "Account with this email already exists. Please try to login instead!"
    );
  }

  brcypt.hash(password, Constants.saltRounds, function (err, hashedPassword) {
    password = hashedPassword;
    pool.query(
      "INSERT INTO users (firstName, lastName, email, password, phoneNumber) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, password, phoneNumber],
      (error, results) => {
        if (error) {
          res.status(400);
          throw new Error(error.message);
        }

        const resData = results.rows[0];
        const { uid } = resData;
        const token = generateToken(uid, email);

        res.status(201);
        res.json({ uid, email, token });
      }
    );
  });
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // checks for the user in db using its email
  const dbres = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  // if we get successful res
  if (dbres) {
    // extracts user information
    const userInfo = dbres.rows[0];

    // if we find valid user info
    if (userInfo) {
      const uid = userInfo.uid;
      // checks for password matchs
      const passwordMatched = await brcypt.compare(password, userInfo.password);

      // if password matches
      if (passwordMatched) {
        // stores userInfo to the redis cache
        redisClient.setex("currentUser", 3600, JSON.stringify(userInfo));

        // generates token for the frontend
        const token = generateToken(uid, email);

        // sends res to the frontend
        const resData = {
          uid,
          email,
          token,
        };
        res.status(200).json(resData);
      } else {
        res.status(404);
        throw new BadRequestError("Invalid Password. Please try again!");
      }
    } else {
      res.status(404);
      throw new NotFoundError("User not found.");
    }
  } else {
    res.status(404);
    throw new NotFoundError("User not found.");
  }
});

// @desc    Get a list of user
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res) => {
  const responseData = await getUsersService();

  // response handling
  res.status(responseData.status);
  res.json(responseData);
});

export const getUserById = asyncHandler(async (req, res) => {
  const uid = parseInt(req.params.id);
  const responseData = await getUserService(uid);

  res.status(200).json({ responseData });
});

// @desc    Update user account
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const uid = parseInt(req.params.id);
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  // updates user information in the db
  const responseData = await updateUserService(
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    uid
  );

  // response handling
  res.status(200).json({ responseData });
});

// @desc    Delete user account
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res) => {
  const uid = parseInt(req.params.id);

  // deletes user from the db
  const responseData = await deleteUserService(uid);

  // response handling
  res.status(200).json({ responseData });
});
