import pool from "../Configs/dbConfig.js";

const DBAuthentication = {
  // register new user
  registerUser: async (
    firstName,
    lastName,
    email,
    hashedPassword,
    phoneNumber
  ) => {
    const responseData = await pool.query(
      "INSERT INTO users (firstName, lastName, email, password, phoneNumber) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, hashedPassword, phoneNumber]
    );
    return responseData.rows[0];
  },
  //  authenticates the user
  authUserService: async ({ email, password }) => {
    const dbres = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return dbres.rows[0];
  },
};

export default DBAuthentication;
