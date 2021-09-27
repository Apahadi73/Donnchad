import db from "../db/db.js";
(async () => {
  try {
    await db.schema.dropTableIfExists("users");
    await db.schema.withSchema("public").createTable("users", (table) => {
      table.increments("uid").primary();
      table.string("firstname", 100);
      table.string("lastname", 100);
      table.string("email", 100).notNullable();
      table.string("password", 100).notNullable();
      table.string("phonenumber", 100);
    });
    console.log("Created users table!");
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
