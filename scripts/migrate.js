import db from "../db/db.js";
export const migrate = async () => {
  try {
    // User Table
    await db.schema.dropTableIfExists("users");
    console.log("Table users dropped if it existed before");
    await db.schema.withSchema("public").createTable("users", (table) => {
      table.increments("uid").primary();
      table.string("firstname", 100);
      table.string("lastname", 100);
      table.string("email", 100).notNullable();
      table.string("password", 100).notNullable();
      table.string("phonenumber", 100);
    });
    console.log("Created users table!");

    await db.schema.dropTableIfExists("events");
    console.log("Table events dropped if it existed before");
    await db.schema.withSchema("public").createTable("events", (table) => {
      table.increments("eid").primary();
      table.string("eventname", 100).notNullable();
      table.string("eventtype", 100);
      table.string("location", 100);
      table.string("startdate", 100);
      table.string("enddate", 100);
      table.string("description", 100);
      table.string("contactnumber", 100).notNullable();

    });
    console.log("Created events table!");

    // await db.schema.dropTableIfExists("participates");
    // console.log("Table participates dropped if existed");
    // await db.schema.withSchema("public").createTable("participates", (table) =>{
    //   table.integer('uid').references('uid').inTable('users');
    //   table.integer('eid').references('eid').inTable('events');
    //   table.primary(['uid', 'eid'])
    // })

  } catch (err) {
    console.log(err);
  }
};
