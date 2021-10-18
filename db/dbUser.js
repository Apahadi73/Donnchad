import db from "../db/db.js";

const DBUser = {
  // check whether email already exists in the database or not
  checkEmailInDB: async (email) => {
    // const responseData = await pool.query(
    //   "SELECT FROM users WHERE email = $1",
    //   [email]
    // );
    // return responseData.rowCount >= 1;
    const user = await db("users").where({ email: email }).select();
    return user;
  },

  // check whether user already exists in the database or not
  checkUserInDB: async (uid) => {
    // const responseData = await pool.query("SELECT FROM users WHERE uid = $1", [
    //   uid,
    // ]);
    // return responseData.rowCount >= 1;
    const user = await db("users").where({ uid: uid }).select();
    return user;
  },

  // gets all the users from the db
  getUsers: async () => {
    const users = await db("users").select();
    return users;
  },

  // gets required user from the db
  getUser: async (uid) => {
    const user = await db("users").where({ uid: uid }).select();
    return user;
  },

  // updates required user from the db
  updateUser: async ({
    firstname,
    lastname,
    email,
    password,
    phonenumber,
    uid,
  }) => {
    // await pool.query(
    //   "UPDATE users SET firstName = $1, lastName = $2,email = $3, password = $4,phoneNumber = $5 WHERE uid = $6",
    //   [firstName, lastName, email, password, phoneNumber, uid]
    // );
    // return {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   phoneNumber,
    //   uid,
    // };
    const user = await db("users").where({ uid: uid }).update({
      firstname,
      lastname,
      email,
      password,
      phonenumber,
    });
    return user;
  },

  // deletes the user from the db
  deleteUser: async (uid) => {
    // const responseData = await pool.query("DELETE FROM users WHERE uid = $1", [
    //   uid,
    // ]);
    // return responseData.rowCount > 0;
    const user = await db("users").where({ uid: uid }).del();
    return user;
  },

  // reset current user's password from db
  resetPassword: async (uid, newpassword) => {
    const user = await db("users").where({ uid: uid }).update({
      password: newpassword,
    });
    return user;
  },
};
export default DBUser;
