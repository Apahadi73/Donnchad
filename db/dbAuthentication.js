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

  // // register new event
  // createEvent: async (
  //   name,
  //   description,
  //   location,
  //   phone,
  //   startDate,
  //   endDate,
  //   host,
  //   type
  // ) => {
  //   await db("events").insert({
  //     name: name,
  //     description: description,
  //     location: location,
  //     phone: phone,
  //     startDate: startDate,
  //     endDate: endDate,
  //     host: host,
  //     type: type,
  //   });

  //   const event = db("events").where({ name: name }).select();
  //   return event;
  // },
  //  authenticates the user
  authUser: async (email) => {
    const foundUser = await db(tables.USERS).where({ email: email }).first();
    return foundUser;
  },
};

export default DBAuthentication;
