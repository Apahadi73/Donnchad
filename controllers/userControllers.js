import asyncHandler from "express-async-handler";
import brcypt from "bcrypt";

import pool from "../db/dbConfig.js";
import { checkCollegeEmail } from "../utilities/emailValidators.js";
import generateToken from "../utilities/generateToken.js";
import { Constants } from "../utilities/Constants.js";
import redisClient from "../db/redisConfig.js";
import { deleteUserService } from "../services/UserServices.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  var { password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Invalid email address!");
  }

  const isValidCollegeEmail = checkCollegeEmail(email);
  if (!isValidCollegeEmail) {
    res.status(400);
    throw new Error("Invalid College Email Address!");
  }

  // checks whether the user already exists in the db or not
  const dbres = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  // if user exists in the db
  if (dbres && dbres.rows.length > 0) {
    res.status(400);
    throw new Error("Account already exists! Please try to login instead!");
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
        throw new Error("Invalid Password. Please try again!");
      }
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// @desc    Get a list of user
// @route   POST /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res) => {
  const resData = await pool.query("SELECT * FROM users ORDER BY uid ASC");
  if (resData) {
    const users = resData.rows;

    if (users && users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404);
      throw new Error("No users found in the database.");
    }
  } else {
    res.status(404);
    throw new Error("Users not found.");
  }
});

export const getUserById = (req, res) => {
  const uid = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE uid = $1", [uid], (error, results) => {
    if (error) {
      res.status(400);
      throw new Error(error.message);
    }
    const userInfo = results.rows[0];
    if (userInfo) {
      // stores userInfo to the redis cache
      redisClient.setex("currentUser", 3600, JSON.stringify(userInfo));

      res.status(200).json(userInfo);
    } else {
      throw new Error("No user information found");
    }
  });
};

export const updateUser = (req, res) => {
  const uid = parseInt(req.params.id);
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  pool.query(
    "UPDATE users SET firstName = $1, lastName = $2,email = $3, password = $4,phoneNumber = $5 WHERE uid = $6",
    [firstName, lastName, email, password, phoneNumber, uid],
    (error, results) => {
      if (error) {
        res.status(400);
        throw new Error(error.message);
      }
      res.status(200).json({ message: `User info updated for user ${uid}` });
    }
  );
};

export const deleteUser = asyncHandler(async (req, res) => {
  const uid = parseInt(req.params.id);
  const isDeleted = await deleteUserService(uid);
  if (isDeleted) {
    res.status(200).json({ message: `User deleted with uid: ${uid}` });
  } else {
    res.status(400);
    throw new Error("Error while deleting the user.");
  }
});
