import asyncHandler from "express-async-handler";
import brcypt from "bcrypt";

import pool from "../db/dbConfig.js";
import { checkCollegeEmail } from "../utilities/emailValidators.js";
import generateToken from "../utilities/generateToken.js";
import { Constants } from "../utilities/Constants.js";

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

  brcypt.hash(password, Constants.saltRounds, function (err, hashedPassword) {
    password = hashedPassword;
    console.log(password);
    pool.query(
      "INSERT INTO users (firstName, lastName, email, password, phoneNumber) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, password, phoneNumber],
      (error, results) => {
        if (error) {
          throw new Error(error.message);
        }

        const responseData = results.rows[0];
        const { uid } = responseData;
        const token = generateToken(uid, email);

        res.status(201);
        res.json({ email, token, uid });
      }
    );
  });
});

// for testing purpose
export const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY uid ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getUserById = (request, response) => {
  const uid = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE uid = $1", [uid], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const updateUser = (request, response) => {
  const uid = parseInt(request.params.id);
  const { firstName, lastName, email, password, phoneNumber } = request.body;

  pool.query(
    "UPDATE users SET firstName = $1, lastName = $2,email = $3, password = $4,phoneNumber = $5 WHERE uid = $6",
    [firstName, lastName, email, password, phoneNumber, uid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json({ message: `User info updated for user ${uid}` });
    }
  );
};
