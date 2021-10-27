import chalk from "chalk";
import { EventAccessRoles } from "../types/EventAccessRoles.js";
import { tables } from "../types/Tables.js";

export const Seed = async (dbConnection) => {
	try {
		await dbConnection(tables.USERS).insert({
			firstname: "John",
			lastname: "Doe",
			email: "jdoe1@patriots.uttyler.edu",
			password: "password",
		});
		await dbConnection(tables.USERS).insert({
			firstname: "John",
			lastname: "Doe",
			email: "jdoe2@patriots.uttyler.edu",
			password: "password",
		});
		await dbConnection(tables.USERS).insert({
			firstname: "John Jr.",
			lastname: "Doe",
			email: "jdoe2@patriots.uttyler.edu",
			password: "password",
		});

		await dbConnection(tables.USERS).insert({
			firstname: "John Jr.",
			lastname: "Doe",
			email: "sidoho3089@d3bb.com",
			password: "password",
		});

		await dbConnection(tables.EVENTS).insert({
			name: "asdgasd",
			hostname: "amir",
		});

		await dbConnection(tables.PARTICIPANTS).insert({
			uid: "1",
			eid: "1",
			accessrole: "READ",
		});

		await dbConnection(tables.PARTICIPANTS).insert({
			uid: "2",
			eid: "1",
			accessrole: "READ",
		});

		console.log(
			chalk.green.bold(
				"------------------------Dummy Seeder Data Added-------------------------------"
			)
		);
	} catch (err) {
		console.log(err);
	}
};
