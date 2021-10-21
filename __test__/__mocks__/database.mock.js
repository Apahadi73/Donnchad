import { newDb } from "pg-mem";

class DatabaseMock {
  constructor() {
    this.dbConnection = newDb();
    console.log("reached here");
  }
  // returns database connection
  getConnection() {
    return this.dbConnection;
  }
}
export default DatabaseMock;
