import db from "../db/db.js";

(async () => {
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
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
