import { tables } from "../types/Tables.js";
import db from "./db.js";

export const DBMessage = {
  // create chat object in the chats relation
  addMessage: async (eid, senderid, text) => {
    const newChat = await db(tables.MESSAGE)
      .insert({ eid, senderid, text })
      .returning("*");
    const { text: mText } = newChat[0];
    return mText;
  },
};
