class DatabaseMock {
	constructor() {
		this.dbConnection = {};
	}
	// returns database connection
	getConnection() {
		return this.dbConnection;
	}
}
export default DatabaseMock;
