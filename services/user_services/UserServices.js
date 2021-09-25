import pool from "../../Configs/dbConfig.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../types/Errors.js";

// @desc    Get a list of user from the db
// @input: nothing
// @return: list of users in the db
export const getUsersService = async () => {
  const responseData = await pool.query("SELECT * from users;");
  if (responseData) {
    const userslist = responseData.rows;
    if (userslist.length > 0) {
      return responseData.rows;
    } else {
      throw new NotFoundError("No users found!");
    }
  } else {
    throw new InternalServerError(
      "Something went wrong while fetching the users from the db"
    );
  }
};

// @desc    Get a user from the db
// @input:  User id - uid
// @return: return user in the db matching the unique user id
export const getUserService = async (uid) => {
  const responseData = await pool.query("SELECT * FROM users WHERE uid = $1;", [
    uid,
  ]);
  if (responseData) {
    if (responseData.rows.length > 0) {
      return responseData.rows[0];
    } else {
      throw new NotFoundError("No account found!");
    }
  } else {
    throw new InternalServerError(
      "Something went wrong while fetching the users from the db"
    );
  }
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
  const userExists = await checkUserInDB(uid);

  // if user does not exists in the db
  if (!userExists) {
    throw new NotFoundError("Account does not exist.");
  }

  const responseData = await pool.query(
    "UPDATE users SET firstName = $1, lastName = $2,email = $3, password = $4,phoneNumber = $5 WHERE uid = $6",
    [firstName, lastName, email, password, phoneNumber, uid]
  );

  if (responseData) {
    if (responseData.rowCount > 0) {
      return {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        uid,
      };
    } else {
      throw new InternalServerError(
        "Something went wrong while fetching the users from the db"
      );
    }
  } else {
    throw new InternalServerError(
      "Something went wrong while fetching the users from the db"
    );
  }
};

// @description: delete the user from the user table
// @input: uid - user id
// @return: response object
export const deleteUserService = async (uid) => {
  // checks whether the user exists in the db or not
  const userExists = await checkUserInDB(uid);

  // if user does not exists in the db
  if (!userExists) {
    throw new BadRequestError("Account does not exist.");
  }

  // deletes user from the db
  const responseData = await pool.query("DELETE FROM users WHERE uid = $1", [
    uid,
  ]);

  if (responseData) {
    if (responseData.rowCount > 0) {
      return {
        message: `Successfully deleted user ${uid}.`,
      };
    } else {
      throw new InternalServerError(
        "Something went wrong while deleting the user from the db"
      );
    }
  } else {
    throw new InternalServerError(
      "Something went wrong while deleting the user from the db"
    );
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

// @description: check whether email already exists in the database or not
// @input: uid - user id
// @access  private
// @return: True or False
export const checkEmailInDB = async (email) => {
  const responseData = await pool.query("SELECT FROM users WHERE email = $1", [
    email,
  ]);
  return responseData.rowCount >= 1;
};
