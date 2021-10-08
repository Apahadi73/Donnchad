import db from "../db/db.js";

export const seed = async () => {
  try {
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
    console.log("Added dummy users!");
  } catch (err) {
    console.log(err);
  }
}
