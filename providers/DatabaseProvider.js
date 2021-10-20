import Database from "../db/Database";

export default function (container) {
  // creates database service which provides database connection
  container.service("Database", () => new Database().getConnection());
}
