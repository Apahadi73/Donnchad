import pool from "../Configs/dbConfig.js";

const DBUser = {
  // check whether email already exists in the database or not
  checkEmailInDB: async (email) => {
    const responseData = await pool.query(
      "SELECT FROM users WHERE email = $1",
      [email]
    );
    return responseData.rowCount >= 1;
  },

  // check whether user already exists in the database or not
  checkUserInDB: async (uid) => {
    const responseData = await pool.query("SELECT FROM users WHERE uid = $1", [
      uid,
    ]);
    return responseData.rowCount >= 1;
  },

  // gets all the users from the db
  getUsers: async () => {
    const responseData = await pool.query("SELECT * from users;");
    return responseData.rows;
  },

  // gets required user from the db
  getUser: async (uid) => {
    const responseData = await pool.query(
      "SELECT * FROM users WHERE uid = $1;",
      [uid]
    );
    return responseData.rows;
  },

  // updates required user from the db
  updateUser: async ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    uid,
  }) => {
    await pool.query(
      "UPDATE users SET firstName = $1, lastName = $2,email = $3, password = $4,phoneNumber = $5 WHERE uid = $6",
      [firstName, lastName, email, password, phoneNumber, uid]
    );
    return {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      uid,
    };
  },

  // deletes the user from the db
  deleteUser: async (uid) => {
    const responseData = await pool.query("DELETE FROM users WHERE uid = $1", [
      uid,
    ]);
    return responseData.rowCount > 0;
  },
};
export default DBUser;
