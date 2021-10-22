import { tables } from "../types/Tables.js";

// Manages all the user related database operations
class UserRepo {
	constructor(dbConnection) {
		this.dbConnection = dbConnection;
	}
	// check whether email already exists in the database or not using email
	async checkEmailInDB(email) {
		const user = await this.dbConnection(tables.USERS)
			.where({ email: email })
			.select();
		return user.length > 0;
	}

	// check whether user already exists in the database or not using uid
	async checkUserInDB(uid) {
		const user = await this.dbConnection(tables.USERS)
			.where({ uid: uid })
			.select();
		return user.length > 0;
	}

	// register new user in the db
	async registerUser(userInfo) {
		const user = await this.dbConnection(tables.USERS)
			.insert(userInfo)
			.returning("*");
		return user;
	}

	//  authenticates the user
	async authUser(email) {
		const foundUser = await this.dbConnection(tables.USERS)
			.where({ email: email })
			.first();
		return foundUser;
	}

	// gets all the users from the db
	async getUsers() {
		const users = await this.dbConnection(tables.USERS).select();
		return users;
	}

	// gets user matching the unique uid from the db
	async getUserById(uid) {
		const user = await this.dbConnection(tables.USERS)
			.where({ uid: uid })
			.select();
		return user;
	}

	// updates the user info in the db
	async updateUser(userInfo, uid) {
		const user = await this.dbConnection(tables.USERS)
			.where({ uid: uid })
			.update(userInfo)
			.returning("*");
		return user[0];
	}

	// deletes the user in the db
	async deleteUser(uid) {
		const user = await this.dbConnection(tables.USERS)
			.where({ uid: uid })
			.del();
		return user;
	}

	// reset current user's password int the db
	async resetPassword(uid, newpassword) {
		const user = await this.dbConnection(tables.USERS)
			.where({ uid: uid })
			.update({
				password: newpassword,
			})
			.returning("*");
		return user;
	}
}
export default UserRepo;
