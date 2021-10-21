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
export const registerUser = asyncHandler(async (req, res, userRepo) => {
  const { firstname, lastname, email, phoneNumber, password } = req.body;

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
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res, userRepo) => {
  const { email, password } = req.body;
  const responseData = await authUserService(email, password, userRepo);
  res.status(201).json(responseData);
});

// @desc    Get a list of users
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res, userRepo) => {
  console.log("reached getUsers controller");
  const responseData = await getUsersService(userRepo);
  res.status(200).json(responseData);
});

// @desc    Get an user by id
// @route   GET /api/users/:uid
// @access  Public
export const getUserById = asyncHandler(async (req, res, userRepo) => {
  const uid = parseInt(req.params.uid);
  const responseData = await getUserByIdService(uid, userRepo);
  res.status(200).json(responseData);
});

// @desc    Update user account
// @route   PUT /api/users/:uid
// @access  Private
export const updateUser = asyncHandler(async (req, res, userRepo) => {
  const uid = parseInt(req.params.uid);

  const userInfo = ReqBodyPolisher.polishUser(req.body);

  // updates user information in the db
  const responseData = await updateUserService(userInfo, uid, userRepo);

  // response handling
  res.status(200).json(responseData);
});

// @desc    Delete user account
// @route   DELETE /api/users/:uid
// @access  Public
export const deleteUser = asyncHandler(async (req, res, userRepo) => {
  const uid = parseInt(req.params.uid);

  // deletes user from the db
  const responseData = await deleteUserService(uid, userRepo);

  // response handling
  res.status(200).json(responseData);
});

// @desc    reset password for the current user
// @route   POST /api/users/:uid/forgot-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res, userRepo) => {
  const paramId = parseInt(req.params.uid);

  const { uid, email } = req.userInfo;

  if (paramId == uid) {
    const { newPassword } = req.body;
    // reset password for the current user
    const responseData = await resetPasswordService(uid, newPassword, userRepo);

    // response handling
    res.status(200).json(responseData);
  } else {
    throw new NotAuthorizedError("Account not authorized to change password");
  }
});
