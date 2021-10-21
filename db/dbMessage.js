import { tables } from "../types/Tables.js";
import db from "./db.js";

export const DBMessage = {
  // create chat object in the chats relation
  addMessage: async (eid, senderid, text) => {
    const newChat = await db(tables.MESSAGE)
      .insert({ eid, senderid, text })
      .returning("*");
    return newChat[0];
  },

  // fetches recent 20 messages by event id
  getChatMessages: async (eid) => {
    const chats = await db(tables.MESSAGE).where({ eid }).limit(10);
    return chats;
  },
};
