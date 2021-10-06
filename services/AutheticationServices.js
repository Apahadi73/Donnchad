import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} from "../types/Errors.js";
import brcypt from "bcrypt";
import { Constants } from "../utilities/Constants.js";
import generateToken from "../utilities/generateToken.js";
// import redisClient from "../Configs/redisConfig.js";
import DBUser from "../db/dbUser.js";
import DBAuthentication from "../db/dbAuthentication.js";

// @description: register new user
// @input: firstName, lastName, email,  phoneNumber,  password,
// @access  public
// @return: uid, email, token
export const registerUserService = async ({
  firstname,
  lastname,
  email,
  phoneNumber,
  password,
}) => {
  // checks whether the user exists in the db or not
  const user = await DBUser.checkEmailInDB(email);
  // if user exists in the db
  if (user.length > 0) {
    throw new BadRequestError(
      "Account with this email already exists. Please try to login instead!"
    );
  }

  const hashedPassword = await brcypt.hash(password, Constants.saltRounds);

  // registers new user in the database
  const responseData = await DBAuthentication.registerUser(
    firstname,
    lastname,
    email,
    hashedPassword,
    phoneNumber
  );

  if (responseData) {
    const { uid } = responseData[0];
    const token = generateToken(uid, email);
    return { uid, email, token };
  } else {
    throw InternalServerError(
      "Something went wrong while registering the user account from the db"
    );
  }
};

// @description: authenticates the user
// @input: firstName, lastName, email,  phoneNumber,  password,
// @access  public
// @return: uid, email, token
export const authUserService = async ({ email, password }) => {
  // checks for the user in db using its email
  const userInfo = await DBUser.checkEmailInDB(email);

  // if we find valid user info
  if (userInfo.length > 0) {
    const uid = userInfo[0].uid;
    const hashedPassword = userInfo[0].password;
    // checks for password match
    const passwordMatched = await brcypt.compare(password, hashedPassword);

    // if password matches
    if (passwordMatched) {
      // generates token for the frontend
      const token = generateToken(uid, email);

      return {
        uid,
        email,
        token,
      };
    } else {
      throw new BadRequestError("Invalid Password. Please try again!");
    }
  } else {
    throw new NotFoundError("User not found.");
  }
};
