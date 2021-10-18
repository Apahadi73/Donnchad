import asyncHandler from "express-async-handler";

import { checkCollegeEmail } from "../utilities/emailValidators.js";
import {
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
  resetPasswordService,
} from "../services/UserServices.js";
import { BadRequestError, NotAuthorizedError } from "../types/Errors.js";
import {
  authUserService,
  registerUserService,
} from "../services/AutheticationServices.js";

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
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
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const responseData = await authUserService({ email, password });
  res.status(201).json(responseData);
});

// @desc    Get a list of user
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res) => {
  const responseData = await getUsersService();
  res.status(200).json({ responseData });
});

// @desc    Get an user by id
// @route   GET /api/users/:uid
// @access  Public
export const getUserById = asyncHandler(async (req, res) => {
  const uid = parseInt(req.params.uid);
  const responseData = await getUserService(uid);
  res.status(200).json({ responseData });
});

// @desc    Update user account
// @route   PUT /api/users/:uid
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const uid = parseInt(req.params.uid);
  const { firstname, lastname, email, password, phonenumber } = req.body;

  // updates user information in the db
  const responseData = await updateUserService(
    firstname,
    lastname,
    email,
    password,
    phonenumber,
    uid
  );

  // response handling
  res.status(200).json({ responseData });
});

// @desc    Delete user account
// @route   DELETE /api/users/:uid
// @access  Public
export const deleteUser = asyncHandler(async (req, res) => {
  const uid = parseInt(req.params.uid);

  // deletes user from the db
  const responseData = await deleteUserService(uid);

  // response handling
  res.status(200).json({ responseData });
});

// @desc    reset password for the current user
// @route   POST /api/users/:uid/forgot-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const paramId = parseInt(req.params.uid);

  const { uid, email } = req.userInfo;

  if (paramId == uid) {
    const { newpassword } = req.body;

    // reset password for the current user
    const responseData = await resetPasswordService(uid, newpassword);

    // response handling
    res.status(200).json({ responseData });
  } else {
    throw new NotAuthorizedError("Account not authorized to change password");
  }
});
