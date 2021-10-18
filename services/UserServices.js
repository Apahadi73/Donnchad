import DBUser from "../db/dbUser.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../types/Errors.js";

// @desc    Get a list of user from the db
// @input: nothing
// @return: list of users in the db
export const getUsersService = async () => {
  const responseData = await DBUser.getUsers();
  if (responseData) {
    if (responseData.length > 0) {
      return responseData;
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
  const responseData = await DBUser.getUser(uid);
  if (responseData) {
    if (responseData.length > 0) {
      return responseData[0];
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
  firstname,
  lastname,
  email,
  password,
  phonenumber,
  uid
) => {
  // checks whether the user exists in the db or not
  const userExists = await DBUser.getUser(uid);

  // if user does not exists in the db
  if (!userExists.length > 0) {
    throw new NotFoundError("Account does not exist.");
  }

  const responseData = await DBUser.updateUser({
    firstname,
    lastname,
    email,
    password,
    phonenumber,
    uid,
  });
  if (responseData > 0) {
    `Successfully deleted user ${uid}.`;
  } else {
    throw new InternalServerError(
      "Something went wrong while updating the users from the db"
    );
  }
};

// @description: delete the user from the user table
// @input: uid - user id
// @return: response object
export const deleteUserService = async (uid) => {
  // checks whether the user exists in the db or not
  const userExists = await DBUser.getUser(uid);

  // if user does not exists in the db
  if (!userExists) {
    throw new BadRequestError("Account does not exist.");
  }

  // deletes user from the db
  const responseData = await DBUser.deleteUser(uid);

  if (responseData) {
    return `Successfully deleted user ${uid}.`;
  } else {
    throw new InternalServerError(
      "Something went wrong while deleting the user from the db"
    );
  }
};

// @description: reset current user's password
// @input: uid - user id, email - user email
// @return: `password changed successfully`
export const resetPasswordService = async (uid, newPassword) => {
  // checks whether the user exists in the db or not
  const userExists = await DBUser.getUser(uid);

  // if user does not exists in the db
  if (!userExists) {
    throw new BadRequestError("Account does not exist.");
  }

  // deletes user from the db
  const responseData = await DBUser.resetPassword(uid, newPassword);

  if (responseData) {
    return `Password changed successfully for user ${uid}.`;
  } else {
    throw new InternalServerError(
      "Something went wrong while reseting the user's password from the db"
    );
  }
};
