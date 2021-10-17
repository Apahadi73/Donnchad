import db from "../db/db.js";
import { tables } from "../types/Tables.js";
export const migrate = async () => {
  try {
    // User Table
    await db.raw(`DROP TABLE IF EXISTS ${tables.USERS} CASCADE;`);
    console.log("Table users dropped if it existed before");
    await db.schema
      .withSchema("public")
      .createTable(`${tables.USERS}`, (table) => {
        table.increments("uid").primary();
        table.string("firstname", 100);
        table.string("lastname", 100);
        table.string("email", 100).notNullable();
        table.string("password", 100).notNullable();
        table.string("phonenumber", 100);
      });
    console.log("Created users relation.");

    await db.raw(`DROP TABLE IF EXISTS ${tables.EVENTS} CASCADE;`);
    console.log("Table events dropped if it existed before");
    await db.schema
      .withSchema("public")
      .createTable(`${tables.EVENTS}`, (table) => {
        table.increments("eid").primary();
        table.string("eventname", 100).notNullable();
        table.string("eventtype", 100);
        table.string("location", 100);
        table.string("startdate", 100);
        table.string("enddate", 100);
        table.string("description", 100);
        table.string("contactnumber", 100);
        table.string("host", 100).notNullable();
      });
    console.log("Created events relation.");

    await db.raw(`DROP TABLE IF EXISTS ${tables.PARTICIPANTS}`);
    console.log(`Table ${tables.PARTICIPANTS} dropped if existed`);
    await db.schema
      .withSchema("public")
      .createTable(`${tables.PARTICIPANTS}`, (table) => {
        table
          .integer("uid")
          .references("uid")
          .inTable(`${tables.USERS}`)
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("eid")
          .references("eid")
          .inTable(`${tables.EVENTS}`)
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("accessrole", 100);
        table.primary(["uid", "eid"]);
      });
    console.log(`Created ${tables.PARTICIPANTS} relation.`);
  } catch (err) {
    console.log(err);
  }
};
