import { tables } from "../types/Tables.js";
import db from "./db.js";

export const DBMessage = {
  // create chat object in the chats relation
  addMessage: async (message) => {
    const newChat = await db(tables.CHATS).insert({}).returning("*");
    const { cid } = newChat[0];
    return cid;
  },
};
