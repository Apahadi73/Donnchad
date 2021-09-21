import asyncHandler from "express-async-handler";
import pool from "../db/dbConfig.js";

// @description: delete the user from the user table
// @input: uid - user id
// @return: True or False
export const deleteUserService = async (uid) => {
  const response = await pool.query("DELETE FROM users WHERE uid = $1", [uid]);
  return response.rowCount === 1;
};
