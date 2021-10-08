import db from "../db/db.js";

export const seed = async () => {
  try {
    // Inserting dummy on Users
    await db("users").insert({
      firstname: "John",
      lastname: "Doe",
      email: "jdoe1@patriots.uttyler.edu",
      password: "password",
    });
    await db("users").insert({
      firstname: "John",
      lastname: "Doe",
      email: "jdoe2@patriots.uttyler.edu",
      password: "password",
    });
    // Inserting dummy on Events
    await db("events").insert({
      eventname: "Takla Party",
      eventtype: "universal",
      location: "everywhere",
      startdate: "immediately",
      enddate: "never",
      description: "Everyone has to be takla",
      contactnumber: "ek-char-chha-dui-char-chhaina",
      host:"1"
    });
    console.log("Added dummy events!");

  } catch (err) {
    console.log(err);
  }
}
