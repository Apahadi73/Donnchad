import { tables } from "../types/Tables.js";
import db from "./db.js";

export const DBChats = {
  // create chat object in the chats relation
  createChat: async () => {
    const newChat = await db(tables.CHATS).insert({}).returning("*");
    const { cid } = newChat[0];
    return cid;
  },

  deleteChat: async () => {
    const user = await db(tables.CHATS).where({ cid: cid }).del();
    return user;
  },
};
