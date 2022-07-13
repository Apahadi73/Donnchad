import asyncHandler from "express-async-handler";

import {
	deleteUserService,
	getUsersService,
	updateUserService,
	getUserByIdService,
} from "../services/UserServices.js";
import { BadRequestError, NotAuthorizedError } from "../types/Errors.js";
import {
	authUserService,
	forgotPasswordService,
	registerUserService,
	resetPasswordService,
} from "../services/AutheticationServices.js";
import ReqBodyPolisher from "../utilities/ReqBodyPolisher.js";

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
export const registerUserController = asyncHandler(
	async (req, res, next, userRepo) => {
		try {
			const userInfo = ReqBodyPolisher.polishUser(req.body);
			if (!userInfo.email) {
				throw new BadRequestError("Email Missing");
			}

			const responseData = await registerUserService(userInfo, userRepo);

			res.status(201).json(responseData);
		} catch (e) {
			next(e);
		}
	}
);

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUserController = asyncHandler(
	async (req, res, next, userRepo) => {
		try {
			const { email, password } = ReqBodyPolisher.polishUser(req.body);
			if (!email) {
				throw new BadRequestError("Email Missing");
			}

			const responseData = await authUserService(
				email,
				password,
				userRepo
			);
			res.status(201).json(responseData);
		} catch (e) {
			next(e);
		}
	}
);

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

// @desc    handles forgot password operation
// @route   POST /api/users/:uid/forgot-password
// @access  Public
export const forgotPasswordController = asyncHandler(
	async (req, res, next, userRepo, tokenRedisRepo) => {
		const { email } = req.body;
		try {
			if (!email) {
				throw new BadRequestError("Email Missing.");
			}
			const response = await forgotPasswordService(
				email,
				userRepo,
				tokenRedisRepo
			);
			res.status(200).json(response);
		} catch (e) {
			next(e);
		}
	}
);

// @desc    reset password for the current user
// @route   POST /api/users/reset-password/:"token
// @access  Public
export const resetPasswordController = asyncHandler(
	async (req, res, next, userRepo, tokenRedisRepo) => {
		const token = req.params.token;

		try {
			const { password } = req.body;
			// reset password for the current user
			const responseData = await resetPasswordService(
				token,
				password,
				userRepo,
				tokenRedisRepo
			);

			// response handling
			res.status(200).json(responseData);
		} catch (e) {
			next(e);
		}
	}
);
