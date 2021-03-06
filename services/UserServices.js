import {
	BadRequestError,
	InternalServerError,
	NotFoundError,
} from "../types/Errors.js";

// @desc    Get a list of user from the db
// @input: nothing
// @return: list of users in the db
export const getUsersService = async (userRepo) => {
	const responseData = await userRepo.getUsers();
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
export const getUserByIdService = async (uid, userRepo) => {
	const responseData = await userRepo.getUserById(uid);
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
export const updateUserService = async (userInfo, uid, userRepo) => {
	// checks whether the user exists in the db or not
	const userExists = await userRepo.checkUserInDB(uid);

	// if user does not exists in the db
	if (!userExists) {
		throw new NotFoundError("Account does not exist.");
	}

	if (userInfo == null) {
		throw new BadRequestError("No information submitted to update.");
	}

	const responseData = await userRepo.updateUser(userInfo, uid);
	if (responseData) {
		return responseData;
	} else {
		throw new InternalServerError(
			"Something went wrong while updating the users from the db"
		);
	}
};

// @description: delete the user from the user table
// @input: uid - user id
// @return: response object
export const deleteUserService = async (uid, userRepo) => {
	// checks whether the user exists in the db or not
	const userExists = await userRepo.checkUserInDB(uid);

	// if user does not exists in the db
	if (!userExists) {
		throw new BadRequestError("Account does not exist.");
	}
	console.log(userExists);

	// deletes user from the db
	const responseData = await userRepo.deleteUser(uid);

	if (responseData) {
		return `Successfully deleted user ${uid}.`;
	} else {
		throw new InternalServerError(
			"Something went wrong while deleting the user from the db"
		);
	}
};
