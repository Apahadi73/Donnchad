import {
	BadRequestError,
	NotFoundError,
	InternalServerError,
} from "../types/Errors.js";
import brcypt from "bcrypt";
import { Constants } from "../utilities/Constants.js";
import generateToken from "../utilities/generateToken.js";
import { checkCollegeEmail } from "../utilities/emailValidators.js";
// import redisClient from "../Configs/redisConfig.js";

// @description: register new user
// @input: firstName, lastName, email,  phoneNumber,  password,
// @access  public
// @return: uid, email, token
export const registerUserService = async (userInfo, userRepo) => {
	if (!userInfo.email) {
		throw new BadRequestError("Email Missing");
	}

	const isValidCollegeEmail = checkCollegeEmail(userInfo.email);
	if (!isValidCollegeEmail) {
		throw new BadRequestError("Invalid College Email Address!");
	}
	// checks whether the user exists in the db or not
	const userExists = await userRepo.checkEmailInDB(userInfo.email);

	// if userExists exists in the db
	if (userExists) {
		throw new BadRequestError(
			"Account with this email already exists. Please try to login instead!"
		);
	}

	userInfo.password = await brcypt.hash(
		userInfo.password,
		Constants.saltRounds
	);

	// registers new user in the database
	const responseData = await userRepo.registerUser(userInfo);

	if (responseData) {
		const { uid, email } = responseData[0];
		const token = generateToken(uid, email);
		return { uid, email, token };
	} else {
		throw InternalServerError(
			"Something went wrong while registering the user account from the db"
		);
	}
};

// @description: authenticates the user
// @input: email and password
// @access  public
// @return: uid, email, token
export const authUserService = async (email, password, userRepo) => {
	if (!email) {
		throw new BadRequestError("Email Missing");
	}

	const isValidCollegeEmail = checkCollegeEmail(email);
	if (!isValidCollegeEmail) {
		throw new BadRequestError("Invalid College Email Address!");
	}

	// checks for the user in db using its email
	// checks whether the user exists in the db or not
	const userInfo = await userRepo.authUser(email);

	// if we find valid user info
	if (userInfo) {
		const uid = userInfo.uid;
		const hashedPassword = userInfo.password;
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
			throw new BadRequestError("Invalid Password. Please try again.");
		}
	} else {
		throw new NotFoundError("Authentication Failed. Please try again.");
	}
};

// @description: handles forgot password operation
// @input: email
// @access  public
// @return: uid, email, token
export const forgotPasswordService = async (email, userRepo) => {
	if (!email) {
		throw new BadRequestError("Email Missing.");
	}
	const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
	return "Password reset complete";
};
