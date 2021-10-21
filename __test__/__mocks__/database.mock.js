import { newDb } from "pg-mem";

class DatabaseMock {
  constructor() {
    this.dbConnection = newDb();
  }
  // returns database connection
  getConnection() {
    return this.dbConnection;
  }
}
export default DatabaseMock;
