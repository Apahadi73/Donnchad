import { tables } from "../types/Tables.js";
import db from "./db.js";

const DBAuthentication = {
  // register new user
  registerUser: async (firstname, lastname, email, password, phonenumber) => {
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
  authUser: async (email) => {
    const foundUser = await db(tables.USERS).where({ email: email }).first();
    return foundUser;
  },
};

export default DBAuthentication;
