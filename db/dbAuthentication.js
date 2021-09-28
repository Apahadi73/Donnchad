import db from "../db/db.js";

const DBAuthentication = {
  // register new user
  registerUser: async (firstname, lastname, email, password, phonenumber) => {
    // const responseData = await pool.query(
    //   "INSERT INTO users (firstName, lastName, email, password, phoneNumber) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    //   [firstName, lastName, email, hashedPassword, phoneNumber]
    // );
    // return responseData.rows[0];
    await db("users").insert({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      phonenumber: phonenumber,
    });

    const user = db("users").where({ email: email }).select();
    return user;
  },
  //  authenticates the user
  authUser: async ({ email, password }) => {
    // const dbres = await pool.query("SELECT * FROM users WHERE email = $1", [
    //   email,
    // ]);
    // return dbres.rows[0];
  },
};

export default DBAuthentication;
