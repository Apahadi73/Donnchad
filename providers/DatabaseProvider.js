import Database from "../db/Database.js";

export default function (container) {
  // creates database service which provides database connection
  container.service("Database", () => new Database().getConnection());
}
