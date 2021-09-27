import asyncHandler from "express-async-handler";

import { checkCollegeEmail } from "../utilities/emailValidators.js";
import {
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "../services/user_services/UserServices.js";
import { BadRequestError } from "../types/Errors.js";
import {
  authUserService,
  registerUserService,
} from "../services/authentication_services/AutheticationServices.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (!email) {
    throw new BadRequestError("Email Missing");
  }

  const isValidCollegeEmail = checkCollegeEmail(email);
  if (!isValidCollegeEmail) {
    throw new BadRequestError("Invalid College Email Address!");
  }

  const responseData = await registerUserService({
    firstName,
    lastName,
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
  res.status(201).json({ responseData });
});

// @desc    Get a list of user
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res) => {
  const responseData = await getUsersService();
  res.status(200).json({ responseData });
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
  const { firstname, lastname, email, password, phonenumber } = req.body;

  // updates user information in the db
  const responseData = await updateUserService(
    firstname,
    lastname,
    email,
    password,
    phonenumber
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
