import db from "../db/db.js";
import { tables } from "../types/Tables.js";
export const migrate = async () => {
  try {
    console.log(
      "------------------------------------------------------------------------------"
    );
    console.log(
      "------------------------Bootstrapping Database--------------------------------"
    );
    console.log(
      "------------------------------------------------------------------------------"
    );
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
        table.timestamps(true, true);
      });
    console.log("Created users relation.");

    await db.raw(`DROP TABLE IF EXISTS ${tables.EVENTS} CASCADE;`);
    console.log("Table events dropped if it existed before");
    await db.schema
      .withSchema("public")
      .createTable(`${tables.EVENTS}`, (table) => {
        table.increments("eid").primary();
        table.string("name", 100).notNullable();
        table.string("hostname", 100).notNullable();
        table.string("eventtype", 100);
        table.string("location", 100);
        table.string("starttime", 100);
        table.string("endtime", 100);
        table.string("description", 10000);
        table.string("contactnumber", 100);
        table.string("imageurl", 200);
        table.integer("cid");
        table.timestamps(true, true);
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

    await db.raw(`DROP TABLE IF EXISTS ${tables.MESSAGE} CASCADE`);
    console.log(`Table ${tables.MESSAGE} dropped if existed`);
    await db.schema
      .withSchema("public")
      .createTable(`${tables.MESSAGE}`, (table) => {
        table.increments("mid").primary();
        table
          .integer("eid")
          .references("eid")
          .inTable(tables.EVENTS)
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("senderid", 100);
        table.string("text", 100);
        table.timestamp("createdAt").defaultTo(db.fn.now());
      });
    console.log(`Created ${tables.MESSAGE} relation.`);

    await db.raw(`CREATE UNIQUE INDEX cmi ON ${tables.MESSAGE} (eid,mid DESC)`);
    console.log(`index eid created for ${tables.MESSAGE}`);
  } catch (err) {
    console.log(err);
  }
};
