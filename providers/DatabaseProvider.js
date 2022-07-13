import Database from "../database/Database.js";
import { Migrate } from "../scripts/migrate.js";
import { Seed } from "../scripts/seed.js";
import DatabaseMock from "../__test__/__mocks__/database.mock.js";

export default function (container) {
	// creates database service which provides database connection
	container.service("Database", () => {
		const environment = process.env.NODE_ENV;
		if (environment == "test") {
			return new DatabaseMock().getConnection();
		} else {
			return new Database().getConnection();
		}
	});
	container.service("Migrate", () => Migrate(container.Database));
	container.service("Seed", () => Seed(container.Database));
}
