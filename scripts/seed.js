import db from "../db/db.js";
import { EventAccessRoles } from "../types/EventAccessRoles.js";
import { tables } from "../types/Tables.js";

export const seed = async () => {
  try {
    await db(tables.USERS).insert({
      firstname: "John",
      lastname: "Doe",
      email: "jdoe1@patriots.uttyler.edu",
      password: "password",
    });
    await db(tables.USERS).insert({
      firstname: "John",
      lastname: "Doe",
      email: "jdoe2@patriots.uttyler.edu",
      password: "password",
    });
    await db(tables.USERS).insert({
      firstname: "John Jr.",
      lastname: "Doe",
      email: "jdoe2@patriots.uttyler.edu",
      password: "password",
    });

    console.log("Added dummy users");

    // await db(tables.PARTICIPANTS).insert({
    //   accessrole: EventAccessRoles.HOST,
    //   eid: "1",
    //   uid: "1",
    // });
    // await db(tables.PARTICIPANTS).insert({
    //   accessrole: EventAccessRoles.READ,
    //   eid: "1",
    //   uid: "2",
    // });

    // console.log("Added dummy participants for event!");

    await db(tables.CHATS).insert({});

    console.log("Added dummy chats!");
  } catch (err) {
    console.log(err);
  }
};
