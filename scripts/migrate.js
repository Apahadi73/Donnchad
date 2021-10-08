import db from "../db/db.js";
export const migrate = async () => {
  try {
    await db.schema.dropTableIfExists("users");
    console.log("Table users dropped if it existed before");
  } catch (err) {
    console.log(err);
  }
};
