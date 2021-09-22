import pool from "../../db/dbConfig.js";
import { Result } from "../../utilities/Constants.js";

// our local response object
let errorResponse = {
  type: Result.FAILED,
  status: 404,
  message: "Error!",
};

// success response
let successResponse = {
  type: Result.SUCCESS,
  status: 200,
  message: "Success",
};

// @desc    Get a list of user from the db
// @input: nothing
// @return: list of users in the db
export const getUsersService = async () => {
  // fetches list of users from the db
};

// @desc    Get a list of user from the db
// @input:  User id - uid
// @return: list of users in the db
export const getUserService = async (uid) => {
  // fetches user from the db
};

// @description: update the user with given user information
// @input: firstName, lastName, email, password, phoneNumber, uid
// @return: response object
export const updateUserService = async (
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  uid
) => {
  // checks whether the user exists in the db or not
  try {
    const userExists = await checkUserInDB(uid);

    // if user does not exists in the db
    if (!userExists) {
      errorResponse.message = "User does not exist in the database";
      return errorResponse;
    }
  } catch (error) {
    errorResponse.message = error;
    return errorResponse;
  }
  try {
    // updates user in the db
    await pool.query(
      "UPDATE users SET firstName = $1, lastName = $2,email = $3, password = $4,phoneNumber = $5 WHERE uid = $6",
      [firstName, lastName, email, password, phoneNumber, uid]
    );

    // if no error observed, send positive response
    successResponse.message = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      uid,
    };
    return successResponse;
  } catch (error) {
    // else throw error
    errorResponse.message = error;
    return errorResponse;
  }
};

// @description: delete the user from the user table
// @input: uid - user id
// @return: response object
export const deleteUserService = async (uid) => {
  // checks whether the user exists in the db or not
  try {
    const userExists = await checkUserInDB(uid);

    // if user does not exists in the db
    if (!userExists) {
      errorResponse.message = "User does not exist in the database";
      return errorResponse;
    }
  } catch (error) {
    errorResponse.message = error;
    return errorResponse;
  }
  try {
    // deletes user from the db
    await pool.query("DELETE FROM users WHERE uid = $1", [uid]);
    successResponse.message = `Successfully deleted user ${uid}`;
    return successResponse;
  } catch (error) {
    errorResponse.message = error;
    return errorResponse;
  }
};

// @description: check whether user already exists in the database or not
// @input: uid - user id
// @access  private
// @return: True or False
export const checkUserInDB = async (uid) => {
  const responseData = await pool.query("SELECT FROM users WHERE uid = $1", [
    uid,
  ]);
  return responseData.rowCount >= 1;
};
