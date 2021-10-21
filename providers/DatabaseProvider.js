import Database from "../db/Database.js";
import { Migrate } from "../scripts/migrate.js";
import { Seed } from "../scripts/seed.js";

export default function (container) {
  // creates database service which provides database connection
  container.service("Database", () => new Database().getConnection());
  container.service("Migrate", () => Migrate(container.Database));
  container.service("Seed", () => Seed(container.Database));
}
