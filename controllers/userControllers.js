import asyncHandler from "express-async-handler";

import { checkCollegeEmail } from "../utilities/emailValidators.js";
import {
  deleteUserService,
  getUsersService,
  updateUserService,
  resetPasswordService,
  getUserByIdService,
} from "../services/UserServices.js";
import { BadRequestError, NotAuthorizedError } from "../types/Errors.js";
import {
  authUserService,
  registerUserService,
} from "../services/AutheticationServices.js";
import ReqBodyPolisher from "../utilities/ReqBodyPolisher.js";

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
export const registerUser = asyncHandler(async (req, res, next, userRepo) => {
  const { firstname, lastname, email, phoneNumber, password } = req.body;
  try {
    if (!email) {
      throw new BadRequestError("Email Missing");
    }

    const isValidCollegeEmail = checkCollegeEmail(email);
    if (!isValidCollegeEmail) {
      throw new BadRequestError("Invalid College Email Address!");
    }

    const responseData = await registerUserService({
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
    });

    res.status(201).json(responseData);
  } catch (e) {
    next(e);
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res, next, userRepo) => {
  const { email, password } = req.body;
  try {
    const responseData = await authUserService(email, password, userRepo);
    res.status(201).json(responseData);
  } catch (e) {
    next(e);
  }
});

// @desc    Get a list of users
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res, next, userRepo) => {
  console.log("reached getUsers controller");
  try {
    const responseData = await getUsersService(userRepo);
    res.status(200).json(responseData);
  } catch (e) {
    next(e);
  }
});

// @desc    Get an user by id
// @route   GET /api/users/:uid
// @access  Public
export const getUserById = asyncHandler(async (req, res, next, userRepo) => {
  const uid = parseInt(req.params.uid);
  try {
    const responseData = await getUserByIdService(uid, userRepo);
    res.status(200).json(responseData);
  } catch (e) {
    next(e);
  }
});

// @desc    Update user account
// @route   PUT /api/users/:uid
// @access  Private
export const updateUser = asyncHandler(async (req, res, next, userRepo) => {
  const uid = parseInt(req.params.uid);

  try {
    const userInfo = ReqBodyPolisher.polishUser(req.body);

    // updates user information in the db
    const responseData = await updateUserService(userInfo, uid, userRepo);

    // response handling
    res.status(200).json(responseData);
  } catch (e) {
    next(e);
  }
});

// @desc    Delete user account
// @route   DELETE /api/users/:uid
// @access  Public
export const deleteUser = asyncHandler(async (req, res, next, userRepo) => {
  const uid = parseInt(req.params.uid);
  try {
    // deletes user from the db
    const responseData = await deleteUserService(uid, userRepo);

    // response handling
    res.status(200).json(responseData);
  } catch (e) {
    next(e);
  }
});

// @desc    reset password for the current user
// @route   POST /api/users/:uid/forgot-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next, userRepo) => {
  const paramId = parseInt(req.params.uid);

  const { uid, email } = req.userInfo;
  try {
    if (paramId == uid) {
      const { newPassword } = req.body;
      // reset password for the current user
      const responseData = await resetPasswordService(
        uid,
        newPassword,
        userRepo
      );

      // response handling
      res.status(200).json(responseData);
    } else {
      throw new NotAuthorizedError("Account not authorized to change password");
    }
  } catch (e) {
    next(e);
  }
});
